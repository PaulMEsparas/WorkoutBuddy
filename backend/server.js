require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

//express app
const app = express();

//variables
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the app" });
// });
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to database (async)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen
    app.listen(port, () =>
      console.log(`Connected to DB and Listening to port ${port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
