const keys = require('./keys');

// Express App Setup 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));
});

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express route handlers
app.get('/', (req, res) => {
  res.send('Hello')
});

app.get('/values', async (req, res) => {
  console.log('call get all values');
  const values = await pgClient.query('SELECT * FROM values');
  
  
  // res.send(values.rows);
  
  // blocking process 
  for (let i = 0; i < 1000; i++) {
    await pgClient.query('SELECT * FROM values');
  }
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  console.log('get current value');
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

const findFib = number => {
  if (number < 2) {
    return 1;
  }
  return findFib(number - 1) + findFib(number - 2);
}

app.post('/values', async (req, res) => {
  console.log('create new values index');
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }
  const valueCal = findFib(index);
  redisClient.hset('values', index, valueCal);
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});


app.listen(5000, (err) => {
  if (err) {
    console.log('Occ!!! something went wrong! ', err);
    process.exit(1);
  }
  console.log('Server is listening on port 5000');
});