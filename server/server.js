const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const https = require("https");


const MONGODB_URI = process.env.mongoose_URI;
const mapKey = process.env.mapKey;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const store = new MongoDBStore({
    uri: process.env.mongoose_URI,
    collection: "mySessions",
});

app.use(
    session({
        secret: "test",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: false,
            sameSite: "lax",
        },
    })
);

// -----------SCHEMAS------------

const petSchema = mongoose.Schema({
    species: String,
    name: String,
    sex: String,
    breed: String,
    age: String,
    goodWithKids: Boolean,
    goodWithCats: Boolean,
    goodWithDogs: Boolean,
    description: String,
    img: String,
    contactName: String,
    zipCode: String,
    location: {
        type: {
            type: String, 
            enum: ["Point"], 
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    contactPhone: String,
    contactEmail: String,
    createdAt: { type: Date, default: Date.now },
});

petSchema.index({ location: "2dsphere" });

const pet = mongoose.model("pet", petSchema);

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    likedPets: [petSchema],
    dislikedPets: [petSchema],
    uploadedPets: [petSchema],
    zipCode: String,
    lastSeenPetDate: Date,
});

const user = mongoose.model("user", userSchema);

//-----------------Post Requests-----------------------------------------------------

function getCoordinates(zipCode) {
    return new Promise((resolve, reject) => {
        let url =
            "https://maps.googleapis.com/maps/api/geocode/json?key=" +
            mapKey +
            "&components=postal_code:" +
            zipCode;
        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                const locationData = JSON.parse(data);
                let coordinates = [
                    locationData.results[0].geometry.location.lng,
                    locationData.results[0].geometry.location.lat,
                ];
                resolve(coordinates);
            });
            response.on("error", (err) => {
                reject(err);
            });
        });
    });
}

app.post("/api/signup", (req, res) => {
    let username = req.body.username;
    let password1 = req.body.password1;
    let email = req.body.email;
    let zipCode = req.body.zipCode;

    user.findOne({ email: email }).then((foundUser) => {
        if (foundUser) {
            res.status(409).json({
                error: "Account already exists with this email",
            });
            return;
        }

        user.findOne({ username: username }).then((foundUsername) => {
            if (foundUsername) {
                res.status(409).json({ error: "Username unavailable" });
                return;
            }

            bcrypt.hash(password1, saltRounds, function (err, hash) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "Server error" });
                    return;
                }

                const newUser = new user({
                    email: email,
                    username: username,
                    password: hash,
                    zipCode: zipCode,
                });
                newUser.save();
                res.sendStatus(200);
            });
        });
    });
});

app.post("/api/signin", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({ username: username })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ error: "Username not found" });
            } else {
                let foundPassword = foundUser.password;
                bcrypt.compare(
                    password,
                    foundPassword,
                    async function (err, result) {
                        if (err) {
                            console.error(err);
                        } else if (result) {
                            req.session.username = foundUser.username;
                            req.session.email = foundUser.email;
                            req.session.zipCode = foundUser.zipCode;
                            res.status(200).json({ message: "success" });
                            req.session.isLoggedIn = true;
                            req.session.save();
                        } else {
                            res.status(401).json({
                                error: "Username and password do not match",
                            });
                        }
                    }
                );
            }
        })
        .catch((err) => console.error(err));
});

app.post("/api/signout", (req, res) => {
    req.session.isLoggedIn = false;
    req.session.save();
});

app.post("/api/like", (req, res) => {
    if (req.session.username) {
        let id = req.body.id;
        pet.findById(id).then((foundPet) => {
            user.findOne({ username: req.session.username }).then(
                (foundUser) => {
                    foundUser.likedPets.push(foundPet);
                    foundUser.lastSeenPetDate = foundPet.createdAt;
                    foundUser
                        .save()
                        .catch((error) =>
                            console.log("error updating user", error)
                        );
                    res.sendStatus(200);
                }
            );
        });
    } else {
        res.sendStatus(200);
    }
});

app.post("/api/dislike", (req, res) => {
    if (req.session.username) {
        let id = req.body.id;
        pet.findById(id).then((foundPet) => {
            user.findOne({ username: req.session.username })
                .then((foundUser) => {
                    foundUser.dislikedPets.push(foundPet);
                    foundUser.lastSeenPetDate = foundPet.createdAt;
                    foundUser
                        .save()
                        .catch((error) =>
                            console.log("error updating user", error)
                        );
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    } else {
        res.sendStatus(200);
    }
});

app.put("/api/changeFilter", (req,res) => {

})

let petRadiusFilter = 25;

app.get("/api/randomPet", async (req, res) => {
    const userEmail = req.session.email;
    const userZipCode = req.session.zipCode;
    const userLocation = await getCoordinates(userZipCode);
    const radiusInRadians = petRadiusFilter / 3963.2;

    user.findOne({ email: userEmail })
        .then((user) => {
            let lastSeenPetDate = user.lastSeenPetDate;
            if (lastSeenPetDate === undefined) {
                lastSeenPetDate = new Date(0);
            }

            pet.find({
                createdAt: { $gt: lastSeenPetDate },
                location: {
                    $geoWithin: {
                        $centerSphere: [userLocation, radiusInRadians],
                    },
                },
            })
                .sort("createdAt")
                .limit(1)
                .then((foundPet) => {
                    if (foundPet.length > 0) {
                        res.json(foundPet[0]);
                    } else {
                        res.json({
                            name: "You've seen all of our pets! Check back later",
                        });
                    }
                })
                .catch((error) => {
                    console.log("error sending pet", error);
                });
        })
        .catch((error) => {
            console.log("error finding user", error);
        });
});

app.get("/api/getLikedPets", (req, res) => {
    user.findOne({ username: req.session.username })
        .then((foundUser) => {
            res.json(foundUser.likedPets);
        })
        .catch((error) => {
            console.log("Error getting liked pets", error);
        });
});

//---------------Storage--------------

app.post("/api/upload", async (req, res) => {
    req.session.petSpecies = req.body.species;
    req.session.petSex = req.body.sex;
    req.session.petName = req.body.name;
    req.session.petBreed = req.body.breed;
    req.session.petAge = req.body.age;
    req.session.petGoodWithKids = req.body.goodWithKids;
    req.session.petGoodWithCats = req.body.goodWithCats;
    req.session.petGoodWithDogs = req.body.goodWithDogs;
    req.session.petDescription = req.body.description;
    req.session.petContactName = req.body.contactName;
    req.session.petZipCode = req.body.zipCode;
    req.session.petContactPhone = req.body.contactPhone;
    req.session.petContactEmail = req.body.contactEmail;
    res.send();
});

const storage = new Storage({
    keyFilename: path.join(__dirname, process.env.gcKey),
    projectId: process.env.gcID,
});

const bucketName = "rescue-road";
const bucket = storage.bucket(bucketName);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app.post("/api/imageUpload", upload.single("file"), (req, res) => {
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
        res.status(500).send(err);
    });

    blobStream.on("finish", async () => {
        try {
            const imageURL = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            const petCoordinates = await getCoordinates(req.session.petZipCode);
            console.log(petCoordinates);
            const newPet = new pet({
                species: req.session.petSpecies,
                name: req.session.petName,
                sex: req.session.petSex,
                breed: req.session.petBreed,
                age: req.session.petAge,
                goodWithKids: req.session.petGoodWithKids,
                goodWithCats: req.session.petGoodWithCats,
                goodWithDogs: req.session.petGoodWithDogs,
                description: req.session.petDescription,
                zipCode: req.session.petZipCode,
                contactName: req.session.petContactName,
                contactPhone: req.session.petContactPhone,
                contactEmail: req.session.petContactEmail,
                img: imageURL,
                location: {
                    type: "Point",
                    coordinates: petCoordinates,
                },
            });

            newPet.save().then(() => {
                user.findOne({ username: req.session.username }).then(
                    (foundUser) => {
                        foundUser.uploadedPets.push(newPet);
                        foundUser.save();
                        res.sendStatus(200);
                    }
                );
            });
        } catch (error) {
            console.error(error);
            res.send(500).send("Error occurred");
        }
    });
    blobStream.end(req.file.buffer);
});

app.get("/api/checkLogin", function (req, res) {
    if (req.session.isLoggedIn) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

//----------Listener-------------

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
