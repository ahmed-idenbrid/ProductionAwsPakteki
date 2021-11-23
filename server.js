require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  routes = require("./routes/routes");
const path = require("path");
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRoutes");

// MiddleWares
// UserDataSchema = require("./models/user");
// MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// const corsOpts = {
//   origin: '*',
//   methods: [
//     'GET',
//     'POST',
//   ],
//   allowedHeaders: [
//     'Content-Type',
//   ],
// };
// app.use(cors(corsOpts))

// app.use(cors(corsOpts));
app.use("/api", routes);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname, "./client/build")));

if (process.env.NODE_ENV === "PRODUCTION") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.use(express.static(path.join(__dirname, "./uploads")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connected");
  });
// var ip = process.env.IP;
app.listen(PORT, () =>
  console.log(
    `server is running on port ${process.env.NODE_ENV}:${PORT} Environment`
  )
);
