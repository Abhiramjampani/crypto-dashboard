const Express = require(`express`);
require("dotenv").config();
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const mongoose = require(`mongoose`);
const routes = require(`./routes/routes`)
const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user",routes)

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is Running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
