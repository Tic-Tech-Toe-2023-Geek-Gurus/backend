const fs = require('fs');
const WaveformData = require('waveform-data');
const { createCanvas, loadImage } = require('canvas');

// Input .wav audio file path
const audioFilePath = path;

// Output image file path
const imageFilePath = "C:\Users\himan\OneDrive\Desktop\react\images";

// Create a new waveform data object
const waveform = new WaveformData();

// Read the audio file and parse it
const audioData = fs.readFileSync(audioFilePath);
const audioArray = new Int16Array(audioData.buffer);

// Add the audio data to the waveform object
waveform.data = audioArray;

// Define image dimensions and options
const width = 800;
const height = 200;
const backgroundColor = '#FFFFFF';
const waveformColor = '#000000';

// Create a canvas and context
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Set background color
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);

// Set waveform color
ctx.strokeStyle = waveformColor;
ctx.lineWidth = 2;

// Draw the waveform on the canvas
waveform.setContext(ctx);
waveform.draw();

// Save the canvas as an image file
const stream = canvas.createPNGStream();
const out = fs.createWriteStream(imageFilePath);

stream.pipe(out);
out.on('finish', () => {
  console.log('Image generated successfully:', imageFilePath);
});
