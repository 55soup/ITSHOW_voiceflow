const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

app.use("/", (req, res) => {
  res.send("hi");
});

MongoClient.connect(
  `mongodb+srv://emirim:${process.env.MONGO_PASSWORD}@cluster0.ixtjj8v.mongodb.net/?retryWrites=true&w=majority`,
  function (에러, client) {
    if (에러) return console.log(에러);
    db = client.db("voiceflow");

    db.collection("score").insertOne(
      { name: "John", phone: "01012341234", score: 538 },
      (error, result) => {
        console.log("저장완료");
      }
    );
    //서버띄우는 코드 여기로 옮기기
    app.listen(process.env.PORT, function () {
      console.log(`listening on ${process.env.PORT}`);
    });
  }
);
