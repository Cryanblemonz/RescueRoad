const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const app = express();
app.use(
    cors({
        credentials: true,
        origin: [
            "https://rescue-road.onrender.com",
            "https://www.rescueroadpets.com",
        ],
        methods: ["POST", "GET"],
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const https = require("https");
let signedOutPetCount = 0;
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGODB_URI = process.env.mongoose_URI;
const mapKey = process.env.mapKey;

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connected Successfully");
    })
    .catch((error) => {
        console.error("DB Connection Error", error);
    });

const store = new MongoDBStore({
    uri: process.env.mongoose_URI,
    collection: "mySessions",
});

app.use(
    session({
        secret: "supersecretcookiename4664566",
        resave: false,
        saveUninitialized: false,
        name: "rescueRoadCookie",
        store: store,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 48,
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
                try {
                    const locationData = JSON.parse(data);
                    let coordinates = [
                        locationData.results[0].geometry.location.lng,
                        locationData.results[0].geometry.location.lat,
                    ];
                    resolve(coordinates);
                } catch (err) {
                    reject(err);
                }
            });
            response.on("error", (error) => {
                reject(error);
            });
        });
    });
}

app.post("/api/signup", (req, res) => {
    let username = req.body.username;
    let password1 = req.body.password1;
    let email = req.body.email;
    let zipCode = req.body.zipCode;

    user.findOne({ $or: [{ email: email }, { username: username }] }).then(
        (foundUser) => {
            if (foundUser) {
                if (foundUser.email === email) {
                    res.status(409).json({
                        error: "Account already exists with this email",
                    });
                } else {
                    res.status(409).json({ error: "Username unavailable" });
                }
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
        }
    );
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
        .catch((error) => console.error(error));
});

app.post("/api/signout", (req, res) => {
    req.session.destroy(function (error) {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        } else {
            res.status(200).json({ message: "Successfully signed out" });
        }
    });
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
        signedOutPetCount++;
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
        signedOutPetCount++;
        res.sendStatus(200);
    }
});

let petRadiusFilter = 25;

app.get("/api/randomPet", async (req, res) => {
    const userEmail = req.session.email;
    const userZipCode = req.session.zipCode || "65202";
    const userLocation = await getCoordinates(userZipCode);
    const radiusInRadians = petRadiusFilter / 3963.2;

    let mongoQuery = req.session.filters || {};

    if (req.session.isLoggedIn) {
        user.findOne({ email: userEmail })
            .then((user) => {
                let lastSeenPetDate = user.lastSeenPetDate;
                if (lastSeenPetDate === undefined) {
                    lastSeenPetDate = new Date(0);
                }

                pet.find({
                    ...mongoQuery,
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
    } else {
        pet.find({})
            .sort("createdAt")
            .then((foundPet) => {
                if (foundPet.length > 0) {
                    res.json(foundPet[signedOutPetCount]);
                } else {
                    res.json({
                        name: "You've seen all of our pets! Check back later",
                    });
                }
            });
    }
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
    res.sendStatus(200);
});

const storage = new Storage({
    keyFilename: path.join(__dirname, "./", process.env.gcKey),
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

const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, "./", process.env.gcKey),
    projectId: process.env.gcID,
});

app.post("/api/imageUpload", upload.single("file"), (req, res) => {
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (error) => {
        res.status(500).json({ error: error });
    });

    blobStream.on("finish", async () => {
        try {
            const imageURL = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            const [result] = await client.labelDetection(imageURL);
            const labels = result.labelAnnotations;
            let animalDetected = false;

            labels.forEach((label) => {
                if (
                    label.description.toLowerCase() === "cat" ||
                    label.description.toLowerCase() === "dog"
                ) {
                    animalDetected = true;
                }
            });

            if (!animalDetected) {
                return res.status(406).json({
                    error: "No cat or dog detected",
                });
            } else {
                const petCoordinates = await getCoordinates(
                    req.session.petZipCode
                );
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
                    req.session.petSpecies = "";
                    req.session.petName = "";
                    req.session.petSex = "";
                    req.session.petBreed = "";
                    req.session.petGoodWithKids = null;
                    req.session.petGoodWithCats = null;
                    req.session.petGoodWithDogs = null;
                    req.session.petDescription = "";
                    req.session.petZipCode = "";
                    req.session.petContactName = "";
                    req.session.petContactPhone = "";
                    req.session.petContactEmail = "";
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error occurred" });
        }
    });
    blobStream.end(req.file.buffer);
});

app.post("/api/sendFilters", (req, res) => {
    let filters = req.body.filters || {};
    let mongoQuery = {};

    if (filters.zipCode) {
        req.session.zipCode = filters.zipCode;
    }

    if (filters.species) {
        mongoQuery.species = filters.species;
    }

    if (filters.sex) {
        mongoQuery.sex = filters.sex;
    }

    if (filters.age && filters.age.length > 0) {
        mongoQuery.age = { $in: filters.age };
    }

    if (filters.goodWith && filters.goodWith.length > 0) {
        filters.goodWith.forEach((item) => {
            switch (item) {
                case "Cats":
                    mongoQuery.goodWithCats = true;
                    break;
                case "Dogs":
                    mongoQuery.goodWithDogs = true;
                    break;
                case "Kids":
                    mongoQuery.goodWithKids = true;
                    break;
            }
        });
    }
    req.session.filters = mongoQuery;
    console.log(mongoQuery, req.session.zipCode);
    res.sendStatus(200);
});

app.get("/api/checkLogin", function (req, res) {
    if (req.session.isLoggedIn) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

//----------Listener-------------
if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on ${process.env.PORT}`);
    });
}

module.exports = app;
