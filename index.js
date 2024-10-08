const express = require('express');
const path = require('path');
const db = require('./env/db.js');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, images, etc.)
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });
  
  // Landing page route
app.get('/:title?', (req, res) => {

    const random_link = db.direct_links[Math.floor(Math.random() * db.direct_links.length)];

    const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;

    if (req.query.i){
        if (!base64Regex.test(req.query.i)) {
            image_url_encoded = req.query.i;
       } else {
            image_url_encoded = atob(decodeURIComponent(req.query.i));
       }
    }

    if (req.query.d){
        if (!base64Regex.test(req.query.d)) {
            dest_url_encoded = req.query.d;
       } else {
            dest_url_encoded = atob(decodeURIComponent(req.query.d));
       }
    }

    const data = {
        direct_link: random_link, // Random link from db.js
        title: req.params.title && req.params.title, // Title from route param: /:title
        img_url: req.query.i && image_url_encoded, // Image URL from query string: ?i=
        dest: req.query.d && dest_url_encoded, // Destination URL from query string: ?d=
    }

    // console.log(data)
    res.render('index', { data });
});


app.use((req, res) => {
    res.status(404).send('404 - Route not found');
  });
  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
