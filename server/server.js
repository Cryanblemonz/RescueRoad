const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()

const MONGODB_URI = process.env.mongoose_URI
  
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const catSchema = mongoose.Schema({
  id: Number,
  name: String,
  breed: String,
  age: String,
  kids: String,
  cats: String,
  dogs: String,
  description: String,
  img: String
})

const cat = mongoose.model("cat", catSchema);

const dogSchema = mongoose.Schema({
  id: Number,
  name: String,
  breed: String,
  age: String,
  kids: String,
  cats: String,
  dogs: String,
  description: String,
  img: String
})

const dog = mongoose.model("dog", dogSchema);

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  likedCats: [catSchema],
  likedDogs: [dogSchema]
})

const user = mongoose.model("user", userSchema);

app.post("/api", (req, res) => {
  const newDog = new dog({
    id: 0,
    name: "Pearl",
    breed: "Labrador",
    age: "Young",
    kids: "Good",
    cats: "Good",
    dogs: "Good",
    description: "Sweet girl",
    img: "https://chocolatelabradorretriever.ca/wp-content/uploads/2023/03/gracie-female-4-scaled.jpg"
  })
    newDog.save()
    .then(() => {
      console.log("Saved successfully");
    })
    .catch((err) => {
      console.log(err);
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

