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
    goodWithKids: String,
    goodWithCats: String,
    goodWithDogs: String,
    description: String,
    img: String,
    contactName: String,
    zipCode: String,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
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

app.get("/api/randomPet", (req, res) => {
    const userEmail = req.session.email;

    user.findOne({ email: userEmail })
        .then((user) => {
            let lastSeenPetDate = user.lastSeenPetDate;
            if (lastSeenPetDate === undefined) {
                lastSeenPetDate = new Date(0);
            }

            pet.find({ createdAt: { $gt: lastSeenPetDate } })
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
    req.session.species = req.body.species;
    req.session.sex = req.body.sex;
    req.session.name = req.body.name;
    req.session.breed = req.body.breed;
    req.session.age = req.body.age;
    req.session.goodWithKids = req.body.goodWithKids;
    req.session.goodWithCats = req.body.goodWithCats;
    req.session.goodWithDogs = req.body.goodWithDogs;
    req.session.description = req.body.description;
    req.session.contactName = req.body.contactName;
    req.session.zipCode = req.body.zipCode;
    req.session.contactPhone = req.body.contactPhone;
    req.session.contactEmail = req.body.contactEmail;
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

app.post("/api/imageUpload", upload.single("file"), (req, res) => {
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
        res.status(500).send(err);
    });

    blobStream.on("finish", async () => {
        try {
            const imageURL = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            const petCoordinates = await getCoordinates(req.session.zipCode);
            console.log(petCoordinates);
            const newPet = new pet({
                species: req.session.species,
                name: req.session.name,
                sex: req.session.sex,
                breed: req.session.breed,
                age: req.session.age,
                goodWithKids: req.session.goodWithKids,
                goodWithCats: req.session.goodWithCats,
                goodWithDogs: req.session.goodWithDogs,
                description: req.session.description,
                zipCode: req.session.zipCode,
                contactName: req.session.contactName,
                contactPhone: req.session.contactPhone,
                contactEmail: req.session.contactEmail,
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
