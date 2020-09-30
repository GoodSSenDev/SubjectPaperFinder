const mongoose = require("mongoose");

const url =
  "mongodb+srv://Dan:qwer1234@cluster0.ceddt.mongodb.net/PaperDB?retryWrites=true&w=majority";

//setup connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//get default connection and get error notification (if there is an error)
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

function close() {
  mongoose.connection.close();
}

exports.close = close;
