'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./routes/auth');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`hactivoverflow server is listening on port ${port}`));