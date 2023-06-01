    const express = require("express");
    const cors = require("cors");
    const PORT = process.env.PORT || 3001;
    const session = require("express-session");
    const MongoDBStore = require('connect-mongodb-session')(session);
    const mongoose = require("mongoose");
    const app = express();
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); 
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    require("dotenv").config();
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const multer = require("multer");
    const { v4: uuidv4 } = require("uuid");
    const { Storage } = require("@google-cloud/storage");
    const path = require('path');

    const MONGODB_URI = process.env.mongoose_URI;


    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const store = new MongoDBStore({
      uri: process.env.mongoose_URI,
      collection: 'mySessions'
    });     
    
    app.use(session({
        secret: 'test',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: false,
            sameSite: 'lax', // use 'none' for secure production
            // add more cookie options here if needed
        },
    }));
    
    
    // -----------SCHEMAS------------


    const petSchema = mongoose.Schema({
        species: String,
        name: String,
        breed: String,
        age: String,
        goodWithKids: String,
        goodWithCats: String,
        goodWithDogs: String,
        description: String,
        img: String,
        contactName: String,
        zipCode: String,
        contactPhone: String,
        contactEmail: String
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
        uploadedPets: [petSchema],
        zipCode: String
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
                            req.session.username = foundUser.username;
                            res.status(200).json({ message: "success" });
                            req.session.isLoggedIn = true;
                            req.session.save();
                        } else {
                            res.status(401).json({ message: "Login failed" });
                        }
                    }
                );
            })
            .catch((err) => console.error(err));
    });

    app.post("/api/signout", (req, res) => {
        req.session.isLoggedIn = false;
        req.session.save();
    })



    app.post("/api/upload", async (req, res) => {
            req.session.species = req.body.species;
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

    app.get("/api/randomPet", (req, res) => {
        pet.aggregate([{$sample: { size: 1}}])
            .then(foundPet => {
                res.json(foundPet[0]);
            })
    })
    

    //---------------Storage--------------

    const storage = new Storage({
        keyFilename: path.join(__dirname, process.env.gcKey),
        projectId: process.env.gcID
    });

    const bucketName = "rescue-road";
    const bucket = storage.bucket(bucketName);  

    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
        fileSize: 5 * 1024 * 1024, 
        },
    });

    app.post("/api/updateMany", (req, res) => {
        pet.updateMany({}, { $set: {contactName: "Bryan"}})
        .then(res.send("Good"))
    })

    app.post("/api/imageUpload", upload.single('file'), (req, res) => {
        const blob = bucket.file(Date.now() + path.extname(req.file.originalname))
        const blobStream = blob.createWriteStream();
        
        blobStream.on('error', (err) => {
            res.status(500).send(err);
        });

        blobStream.on('finish', () => {
            res.status(200).send("Image uploaded successfully");
            const imageURL = `https://storage.googleapis.com/${bucketName}/${blob.name}`
            const newPet = new pet({
                species: req.session.species,
                name: req.session.name,
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
                img: imageURL
            })
            newPet.save()
            .then(() =>{
                user.findOne({username: req.session.username})
                .then(foundUser => {
                    foundUser.uploadedPets.push(newPet)
                    foundUser.save();
                })
            })
        })


        blobStream.end(req.file.buffer);
    })

    app.get("/api/checkLogin", function(req, res){
        if (req.session.isLoggedIn) {
            res.json({isLoggedIn: true})
        } else{
            res.json({isLoggedIn: false})
        }
    });

    //----------Listener-------------

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
