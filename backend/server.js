require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const url = `mongodb+srv://wansenziroz:${process.env.MONGODB_PASSWORD}@yktv.jau4ars.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

app.get("/", (req, res) => {
  res.send("Welcome to YKTV");
});

app.post("/signup", async (req, res) => {
  const { email, birthDate, password } = req.body;
  console.log("[Data received from frontend]");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  try {
    await client.connect();
    console.log("[Connected to the database]");

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email: email,
      birthDate: birthDate,
      dateJoined: `${day}-${month}-${year}`,
      password: hasPassword,
    };

    const db = client.db("YKTV_db");
    const usersCollection = db.collection("users");

    await usersCollection.insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: newUser.email,
        birthDate: newUser.birthDate,
        dateJoined: newUser.dateJoined,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred" });
  } finally {
    await client.close();
    console.log("[Connection closed]");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);
  console.log("[Login request received from frontend]");

  try {
    await client.connect();
    console.log("[Connected to the database]");

    const db = client.db("YKTV_db");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (user) {
      console.log("found user");
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        console.log("right password");
        res.status(200).json({
          message: "Login successful",
          user: {
            email: user.email,
            birthDate: user.birthDate,
            dateJoined: user.dateJoined,
          },
        });
        console.log("Successful login");
      } else {
        console.log("wrong password");
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      console.log("No user");
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred" });
  } finally {
    await client.close();
    console.log("[Connection closed]");
  }
});

const port = process.env.PORT || 5030;
app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
