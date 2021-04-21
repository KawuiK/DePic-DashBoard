const app = require("./server/express");
require("./server/bot");
const mongoose = require("mongoose");
const { mongodb } = require("./config/config")
const con = mongodb
const db = mongoose.connection;
mongoose
  .connect(con, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));
db.once("open", (_) => {
  console.log("Connected to MongoDB ✔️");
});
db.on("error", (e) => {
  console.log("Ups!: " + e);
});

app.listen(app.get("port"), () => {
  console.log("Pagina prendido");
});