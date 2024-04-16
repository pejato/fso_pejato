const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log("if name or number are provided, BOTH must be provided");
  process.exit(1);
}

const password = process.argv[2];
const maybeName = process.argv[3];
const maybeNumber = process.argv[4];
const mode = maybeName ? "saveArgument" : "fetch";

const url = `mongodb+srv://pejato:${password}@cluster0.gdawhkm.mongodb.net/fsoPhonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (mode === "fetch") {
  Person.find({}).then((result) => {
    console.log("phonebook");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (mode === "saveArgument") {
  const person = new Person({
    name: maybeName,
    number: maybeNumber,
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to the database`);
    mongoose.connection.close();
  });
} else {
  mongoose.connection.close();
  console.log(`Unknown mode ${mode}`);
  exit(1);
}
