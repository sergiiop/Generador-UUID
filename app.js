const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');

let compression = require('compression');
require('dotenv').config();

const {v4: uuidv4} = require('uuid')

const app = express();


app.use(helmet());
app.use(compression());
app.use(express.json());


const serverHttp = http.createServer(app);

const whitelist = ['http://localhost/', 'localhost'];

const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

serverHttp.listen(process.env.HTTP_PORT, process.env.IP)

app.use(express.static('./public'))

app.get('/api/get-uuid', (req,res) => {
  res.json({uuid: uuidv4()})
})

app.get('*', (req,res) => {
  res.send('resorced not found')
})
