const express = require('express');
const path = require('path');
const db = require('../env/db.js');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, '../views'));

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Landing page route
app.get('/:title?', (req, res) => {
    const random_link = db.direct_links[Math.floor(Math.random() * db.direct_links.length)];

    const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
    let image_url_encoded, dest_url_encoded;

    if (req.query.i) {
        if (!base64Regex.test(req.query.i)) {
            image_url_encoded = req.query.i;
        } else {
            image_url_encoded = atob(decodeURIComponent(req.query.i));
        }
    }

    if (req.query.d) {
        if (!base64Regex.test(req.query.d)) {
            dest_url_encoded = req.query.d;
        } else {
            dest_url_encoded = atob(decodeURIComponent(req.query.d));
        }
    }

    const data = {
        direct_link: random_link,
        title: req.params.title,
        img_url: req.query.i && image_url_encoded,
        dest: req.query.d && dest_url_encoded,
    };

    res.render('index', { data });
});

// Export the handler for Vercel serverless function
module.exports = app;
