require("dotenv").config();
const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (_req, res) => {
  const p = path.resolve(__dirname, "./docker/fail.txt");
  exec(
    "cd docker && sudo docker build --rm . -t first-docker:1 && timeout 30 sudo docker run --rm first-docker:1 > fail.txt && sudo docker image prune -f",
    (error, stdout, stderr) => {
      if (error) {
        res.sendFile(p);

        console.log(`error: ${error}`);
        return;
      }
      if (stderr) {
        res.sendFile(p);

        console.log(`stderr: ${stderr}`);
        return;
      }
      // console.log(`stdout: ${stdout}`);

      const data = fs.readFileSync(p, "utf8");
      res.sendFile(p);
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
