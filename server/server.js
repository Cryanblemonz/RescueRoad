const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI =
  "mongodb+srv://gbc466:%23Bounce466@cluster0.vcjxf7t.mongodb.net/?retryWrites=true&w=majority"

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

app.get("/api", (req, res) => {
  res.send('Cats amirite')
}); 

app.post("/api", (req, res) => {
  const newCat = new cat({
    id: 0,
    name: "Tank",
    breed: "Siamese",
    age: "Adult",
    kids: "Good",
    cats: "Good",
    dogs: "Not great",
    description: "A nice boi",
    img: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcS7doMt2tKaUzd8YdXlqTvGrFQOv4OVjtY0DRD12KLdbPTxGuBHxiyZC38iNkIKn8psrwWdSUPlwdroJkw"
  })
    newCat.save()
    .then(() => {
      console.log("Cat saved successfully");
    })
    .catch((err) => {
      console.log(err);
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

