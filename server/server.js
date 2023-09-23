const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./connection/connection');
//const userRoutes = require('./routes/userRoute');
const child_process = require("child_process");
const { spawn } = require('child_process');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')


dotenv.config({path: 'config.env'});
const app = express();
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;

app.use('/api/users', require('./routes/userRoute'));

// app.post("/generate-image", (req, res) => {

//   const pythonProcess = child_process.spawn("python", ["audio_to_image.py", "../audio.wav"]);

//     pythonProcess.stderr.on('data', (data) => {
//       console.error(Error from Python script: ${data});
//     });

//     // Handle Python script exit
//     pythonProcess.on('close', (code) => {
//       if (code === 0) {
//         console.log('Python script exited successfully.');

//         res.status(200).json({ message: 'Image generated successfully' });

//       } else {
//         console.error(Python script exited with code ${code}.);
//         res.status(500).send('Internal Server Error');
//       }
//     });
// });



app.use(errorHandler);
app.listen(PORT, () => {
  console.log(Server running on port http://localhost:${PORT});
});