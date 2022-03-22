const express = require('express');
const fs = require('fs');
const path = require('path');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
}); 