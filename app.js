const { exec } = require("child_process");
const yaml = require("js-yaml");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 2020;

app.get("/run", function (req, res) {
  try {
    var doc = yaml.safeLoad(fs.readFileSync("test.yaml", "utf8"));
    console.log(doc);

    if (doc.scripts) {
      doc.scripts.forEach((v) => {
        exec(v, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
  res.send("done");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
