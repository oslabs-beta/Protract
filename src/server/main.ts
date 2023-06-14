//--NPM Packages
import express from "express";
import ViteExpress from "vite-express";
// const path = require('')


//--Import Routes & Controllers
const app = express();

//--Connect to Port
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
//--connect to DB
// const MONGO_URI =
//mongoose
//.connect(MONGO_URI, { dbName: 'practice' })
//.then(()=>console.log('connection to database successful'))
//.catch((err) =>
//console.log(`database connection not successful. Received this ${err}`)
//);

//Parse incoming request
// app.use('/client', express.static(path.join(__dirname, '../client')))
// app.use(express.json());
// app.use(express.urlencoded());


//Route Handlers
//-- general Routes

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

//Authentication routes
// app.get('/login', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../client/login.html'));
// });

// app.get('/signup', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../client/signup.html'));
// });