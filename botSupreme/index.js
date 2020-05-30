const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 3000;

// settings
app.set("view engine", "ejs");

// middelwares
app.use(express.static(__dirname + "/public"));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));

// get
app.get("/", (req, res) => {
  // res.send('hello')
  res.render("/home/camillo/botSupreme/botSupreme/public/views/index.ejs");
});

// post
app.post("/search", (req, res) => {
  let category = req.body.category;
  let name = req.body.name;
  let color = req.body.color;
  let size = req.body.size;

  let fs = require("fs");
  let url = "https://www.supremenewyork.com/shop/";

  request(`${url}${category}`, (error, response, body) => {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body ok"); // Print the HTML for the webpage.

    //   fs.unlink('index.html', (err) => {
    //     if (err) throw err;
    //     console.log('path/file.txt was deleted');
    //   });

    // create a file html from url
    fs.writeFile("indexto.html", body, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });

  // reaplace tag </body> to <script> find id </script> </body>
  fs.readFile(someFile, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/string to be replaced/g, "replacement");

    fs.writeFile(someFile, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });

  res.send("hello: " + category);
});

app.listen(port, () => {
  console.log("Server on port" + port);
});
