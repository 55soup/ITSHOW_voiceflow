const express = require("express");
const app = express();
const path = require("path");
let port = process.env.PORT || 8081;
//  bodyparser 혹은 express.json을 설정해야 기본값 undefined가 바뀜
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

MongoClient.connect(
  `mongodb+srv://emirim:${process.env.MONGO_PASSWORD}@cluster0.ixtjj8v.mongodb.net/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  function (에러, client) {
    if (에러) return console.log(에러);
    db = client.db("voiceflow");
    //서버띄우는 코드 여기로 옮기기
    app.listen(port, function () {
      console.log(`listening on ${process.env.PORT}`);
    });
  }
);

// 점수 제출
app.post("/submit", (req, res) => {
  db.collection("scores").insertOne(
    { name: req.body.name, phone: req.body.phone, score: req.body.score },
    (error, result) => {
      res.redirect("/");
      console.log("저장완료");
      res.end();
    }
  );
});

// react router 연결
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
