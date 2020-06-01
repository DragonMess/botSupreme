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
  let url = "https://www.supremenewyork.com/shop/all/";

  request(`${url}${category}`, (error, response, body) => {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body ok"); // Print the HTML for the webpage.

    //   fs.unlink('index.html', (err) => {
    //     if (err) throw err;
    //     console.log('path/file.txt was deleted');
    //   });
    var fs = require('fs')
    // create a file html from url
    fs.writeFile(`index-${category}.html`, body, function (err) {
      if (!err) {
        console.log("Saved!");
        // reaplace tag </body> to <script> find id </script> </body>
        fs.readFile(`index-${category}.html`, "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          let search = `window.onload = function() {
                        alert('Page loaded');
                        let aTags = document.getElementsByTagName("a");
                        let searchName = '${name}';
                        let searchColor = '${color}';
                        let found;
                        let productName = [];
                        let productColor = [];

                        for (let i = 0; i < aTags.length; i++) {
                        if (aTags[i].textContent == searchName) {
                         productName.push(aTags[i].getAttribute("href"));
                         }

                        }
                        for (let j = 0; j < aTags.length; j++) {
                        if (aTags[j].textContent == searchColor) {
                         productColor.push(aTags[j].getAttribute("href"));
                         }
                        }

                        productNameColory = productColor.filter(function(item) {
                          return productName.includes(item); 
                        })
                        console.log("aqui esta",productNameColory);
                        };`;
          let replacement = `<script>${search}</script></body>`;
          let toReplace = 'body';
          var result = data.replace("</body>", replacement);
          var regex = /(<([^>]+)>)/ig;

          fs.writeFile(`index-${category}.html`, result, "utf8", function (
            err
          ) {
            if (err) return console.log(err);
          });
        });
      }
      if (err) throw err;
      //   console.log("Saved!");
    });
  });

  res.send("hello: " + category);
});

app.listen(port, () => {
  console.log("Server on port" + port);
});
