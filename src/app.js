const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000;
////////////////////////////////////////////////////////:
//! Static html (html files in public)
//* getting accessed by /index.html
app.use(express.static(publicDirectoryPath));
//////////////////////////////////////////////////////////
//! Dynamic html (hbs) // using routes // Handlebars
//* Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Khouini Yacine',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Khouini Yacine',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'These is some helpful text',
    title: 'Help',
    name: 'Khouini Yacine',
  });
});

app.get('/weather', (req, res) => {
  //! Setting up the query string
  if (!req.query.search) {
    return res.send({
      error: 'Unable to find location. Try another search.',
    });
  }
  const adress = req.query.search;
  geocode(adress, (error, { longitude, latitude, placename } = {}) => {
    if (error)
      return res.send({
        error: error.message,
      });
    forecast(longitude, latitude, (error, dataForecast) => {
      if (error)
        return res.send({
          error: error.message,
        });
      res.send({
        Placename: placename,
        forecast: dataForecast,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404 error',
    name: 'Khouini Yacine',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: "Can't load the page",
    title: '404 error',
    name: 'Khouini Yacine',
  });
});

app.listen(port, () => {
  console.log('We are listening on port', port);
});
