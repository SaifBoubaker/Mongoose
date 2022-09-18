const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("DB connected"))
);

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: {
    type: [String],
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Saif",
  age: 25,
  favoriteFoods: ["pizza", "strawberry"],
});

const personA = new Person({
  name: "Bahri",
  age: 32,
  favoriteFoods: ["street food", "coca"],
});

const personB = new Person({
  name: "Chaker",
  age: 25,
  favoriteFoods: ["homemade food ", "express"],
});

const personC = new Person({
  name: "Syrine",
  age: 25,
  favoriteFoods: ["Apple", "Healthy food"],
});

// person.save();
// personA.save();
// personB.save();
// personC.save();

Person.find((err, el) => (err ? console.log(err) : console.log(el)));

Person.findOne({ favoriteFoods: "street food" }, (err, el) =>
  err ? console.log(err) : console.log(el)
);

Person.findById("630a6c4e75362b18a57e97ba", (err, el) =>
  err ? console.log(err) : console.log(el)
);

Person.findById("630a696e56e8d903dc37d2cd", function (err, data) {
  data.favoriteFoods.push("hamburger");
  data.save();
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

Person.findOneAndUpdate(
  { name: "Bahri" },
  { age: 20 },
  { new: true },
  (err, el) => (err ? console.log(err) : console.log(el))
);

Person.findOneAndRemove("630a6bf647923a49ce49d7b3", (err) =>
  err ? console.log(err) : console.log("deleted")
);

Person.remove({ name: "syrine" }, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

Person.find({ favoriteFoods: "homemade food " })
  .sort({ name: "desc" })
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if (err) console.log(err);
    console.log(data);
  });

const port = process.env.PORT;

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`this server is running on ${port}`)
);
