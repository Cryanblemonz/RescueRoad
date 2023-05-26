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
        uploadedPets: [petSchema]
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
                pet.findOne({_id: newPet._id})
                .then((uploadedPet) => {
                    req.session.uploadedPet = uploadedPet;
                    console.log(req.session.uploadedPet)
                    res.send();
                })
            })
            .catch((err) => {
                console.error("Error", err);
            });
    });

    app.post("/api/upload", async (req, res) => {
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
    
        try {
            await newPet.save();
            console.log("Success");
    
            const uploadedPet = await pet.findOne({_id: newPet._id});
            req.session.uploadedPet = uploadedPet;
            console.log(req.session.uploadedPet);
            res.send("yes")
        } catch (err) {
            console.error("Error", err);
        }
    });
    

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


    app.post("/api/imageUpload", upload.single('file'), (req, res) => {
        const blob = bucket.file(Date.now() + path.extname(req.file.originalname))
        const blobStream = blob.createWriteStream();
        
        blobStream.on('error', (err) => {
            res.status(500).send(err);
        });

        blobStream.on('finish', () => {
            res.status(200).send("Image uploaded successfully");
        }); 

        blobStream.end(req.file.buffer);
    })

    app.post("/api/test", (req, res) => {
        console.log(req.session.uploadedPet);
        console.log(req.session.username);
        res.send(req.session.userName);
    })

    app.get("/api/checkLogin", function(req, res){
        if (req.session.isLoggedIn) {
            res.json({isLoggedIn: true})
        } else{
            res.json({isLoggedIn: false})
        }
        console.log(req.session.isLoggedIn);
    });

    //----------Listener-------------

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
