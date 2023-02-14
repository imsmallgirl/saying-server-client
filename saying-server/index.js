const express = require("express");
const fs = require("fs");
const cors = require("cors");
const schedule = require("node-schedule");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const { author, message } = req.query;
  if (!author && !message) {
    res.json(data);
  }

  if (author === "" && message === "") {
    return;
  }

  if (
    data.filter((value) => value.author.includes(author)).length <= 0 ||
    data.filter((value) => value.message.includes(message)).length <= 0
  ) {
    res.status(404).json({
      status: "error",
      error: "결과가 없습니다.",
    });
  }

  res.json(
    data
      .filter((value) => (author ? value.author.includes(author) : true))
      .filter((value) => (message ? value.message.includes(message) : true))
  );
});

let obj = null;

app.get("/todaySaying", (req, res) => {
  const set = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
      const randomNumber = Math.floor(Math.random() * data.length);

      res.json(data[randomNumber]);
    });

    obj = job;
  };

  const cancel = () => {
    if (obj != null) {
      obj.cancel();
    }
  };

  const setScheduler = () => {
    cancel();
    set();
  };

  setScheduler();
});

app.get("/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * data.length);

  res.json(data[randomNumber]);
});

app.get("/:num", (req, res) => {
  const { num } = req.params;
  const dataNum = parseInt(num);
  const numData = [];
  for (let i = 0; i < dataNum; i++) {
    const randomNumber = data.splice(
      Math.floor(Math.random() * data.length),
      1
    )[0];
    numData.push(randomNumber);
  }

  res.json(numData);
});

app.post("/", (req, res) => {
  const { author, message, id } = req.body;

  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.json({
      result: false,
      errorMsg: "author or message is not wrong",
    });
    return;
  }

  data.push({
    author: req.body.author,
    message: req.body.message,
    id: req.body.id,
  });

  res.json({
    result: true,
    successMsg: "성공적으로 완료했습니다.",
    author: req.body.author,
    message: req.body.message,
    id: req.body.id,
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const dataIndex = data.indexOf(data.find((data) => data.id === id));

  data.splice(dataIndex, 1);

  res.json({
    result: true,
    successMsg: "성공적으로 완료했습니다.",
  });
});

app.put("/:id", (req, res) => {
  const { author, message } = req.body;
  const { id } = req.params;

  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.json({
      result: false,
      errorMsg: "author or message is not wrong",
    });
    return;
  }

  const dataIndex = data.indexOf(data.find((data) => data.id === id));

  if (dataIndex < 0) {
    res.json({
      result: false,
      errorMsg: "값을 찾을 수 없습니다. 아이디 값을 확인해주세요.",
    });
    return;
  }

  data[dataIndex] = {
    author: req.body.author,
    message: req.body.message,
    id: req.params.id,
  };

  res.json({
    result: true,
    successMsg: "성공적으로 완료했습니다.",
  });
});

app.listen(4000, () => {
  console.log("start saying server");
});
