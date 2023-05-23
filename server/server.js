const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");

const MONGODB_URI = process.env.mongoose_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(
    session({
        secret: "test",
        resave: false,
        saveUninitialized: false,
    })
);

// -----------SCHEMAS------------

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

const image = mongoose.model("image", imageSchema);

const petSchema = mongoose.Schema({
    species: String,
    name: String,
    breed: String,
    age: String,
    goodWithKids: String,
    goodWithCats: String,
    goodWithDogs: String,
    description: String,
    img: [imageSchema],
});

const pet = mongoose.model("pet", petSchema);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    likedPets: [petSchema],
});

const user = mongoose.model("user", userSchema);

//-----------------Post Requests--------------

app.post("/api/signup", (req, res) => {
    let username = req.body.username;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    console.log(username, password1, password2);

    bcrypt.hash(password1, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            let hashedPassword = hash;
            const newUser = new user({
                username: username,
                password: hashedPassword,
            });
            newUser.save();
        }
    });
});

app.post("/api/signin", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({ username: username })
        .then((foundUser) => {
            let foundPassword = foundUser.password;
            bcrypt.compare(
                password,
                foundPassword,
                async function (err, result) {
                    if (err) {
                        console.error(err);
                    } else if (result) {
                        req.session.userName = foundUser.username;
                        res.status(200).json({ message: "success" });
                        console.log(req.session.userName);
                    } else {
                        res.status(401).json({ message: "Login failed" });
                    }
                }
            );
        })
        .catch((err) => console.error(err));
});

app.post("/api/upload", (req, res) => {
    const newPet = new pet({
        species: req.body.species,
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        goodWithKids: req.body.goodWithKids,
        goodWithCats: req.body.goodWithCats,
        goodWithDogs: req.body.goodWithDogs,
        description: req.body.description,
    });
    newPet
        .save()
        .then(() => {
            console.log("Success");
        })
        .catch((err) => {
            console.error("Error", err);
        });
});

//---------------Storage--------------

const storage = new Storage({
    keyFilename: "./coral-shift-387422-d5938a535769.json",
});

const bucketName = "rescue-road";
const bucket = storage.bucket(bucketName);






//----------Listener-------------

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
