const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://rashikachoudhary:Rashika367@ac-cuzknqv-shard-00-00.xoh9lg8.mongodb.net:27017,ac-cuzknqv-shard-00-01.xoh9lg8.mongodb.net:27017,ac-cuzknqv-shard-00-02.xoh9lg8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jty03k-shard-0&authSource=admin&appName=Cluster1/fsdstudentDB")
.then(()=> console.log("DB Connected"));

app.use("/api", require("./routes"));

app.listen(5000, ()=> console.log("Server running"));