const express = require("express"); // importing express class
const fs = require("fs"); // import file module to read json file
const app = express(); // creating instance of express
const bodyParser = require("body-parser"); // import body parser;
const { exit } = require("process");

let rawData = fs.readFileSync(__dirname + "/headphones.json"); // read json file
let data = JSON.parse(rawData); //parse

/* send the whole list of headphones */
app.get("/", (req, res) => {
  res.json(data);
});

/* send the whole list based on categories */

app.get("/category/:type", (req, res) => {
  let categoryProduct = data.products.filter((item) => {
    return item.category == req.params.type;
  });
  res.json(categoryProduct);
});

/* send the whole list based on company */

app.get("/company/:brand", (req, res) => {
  let companyProduct = data.products.filter((item) => {
    return item.name == req.params.brand;
  });
  res.json(companyProduct);
});

/* top 4 companies */
app.get("/topfour", (req, res) => {
  let topFourCompany = data.products.filter((item, index) => {
    return index < 4;
  });
  res.json(topFourCompany);
});

app.listen(3000, () => {
  console.log("Listening to 3000");
});
