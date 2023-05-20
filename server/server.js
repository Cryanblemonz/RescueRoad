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

const catSchema = mongoose.Schema({
    name: String,
    breed: String,
    age: String,
    kids: String,
    cats: String,
    dogs: String,
    description: String,
    img: String,
});

const cat = mongoose.model("cat", catSchema);

const dogSchema = mongoose.Schema({
    name: String,
    breed: String,
    age: String,
    kids: String,
    cats: String,
    dogs: String,
    description: String,
    img: String,
});

const dog = mongoose.model("dog", dogSchema);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedCats: [catSchema],
    likedDogs: [dogSchema]
});

const user = mongoose.model("user", userSchema);

//-----------------Post Requests--------------

app.post("/api/signup", (req, res) => {
    let username = req.body.username;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    console.log(username, password1, password2);

    bcrypt.hash(password1, saltRounds, function(err, hash){
      if(err){
        console.log(err)
      } else {
        let hashedPassword = hash;
        const newUser = new user({
          username: username,
          password: hashedPassword
        })
        newUser.save();
      } 

    })
});

app.post("/api/signin", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  user.findOne({username: username})
    .then(foundUser => {
      let foundPassword = foundUser.password;
      bcrypt.compare(password, foundPassword, async function (err, result){
        if (err){
          console.error(err)
        } else if (result){
          req.session.userName = foundUser.username;
          res.status(200).json({ message: 'success' });
          console.log(req.session.userName);
        } else {
          res.status(401).json({ message: 'Login failed' });
        }
      })
    })
    .catch(err => console.error(err));
});

app.post("/newDog", (req, res) => {
    const newDog = new dog({
        id: 0,
        name: "Pearl",
        breed: "Labrador",
        age: "Young",
        kids: "Good",
        cats: "Good",
        dogs: "Good",
        description: "Sweet girl",
        img: "https://chocolatelabradorretriever.ca/wp-content/uploads/2023/03/gracie-female-4-scaled.jpg",
    });
    newDog
        .save()
        .then(() => {
            console.log("Saved successfully");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
