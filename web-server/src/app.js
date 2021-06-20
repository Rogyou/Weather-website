//download express and hbs
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//console.log(__dirname);
//console.log(__filename);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

//As we added About.html and help.html to the public directory we don't need the follwing get commands

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send(
//     {
//       name: "Andrew",
//       age: 27,
//     },
//     {
//       name: "Sarah",
//     }
//   );
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Heba Riaz",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Heba Riaz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext:
      "Using WeatherStack and MapBox API. Written with HTML, CSS, JavaScript and Node.js.",
    title: "Help",
    name: "Heba Riaz",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  console.log(req.query.address);

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search time",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Heba Riaz",
  });
});

// app.get("*", (req, res) => {
//   res.send("Error 404 not found - Heba");
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
