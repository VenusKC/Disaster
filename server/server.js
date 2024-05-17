// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Emergency schema
const emergencySchema = new mongoose.Schema({
emergencyNumbers: String,
location: String,
emergencyType: String,
});

const Emergency = mongoose.model('Emergency', emergencySchema);

// API routes
app.get('/emergencies', async (req, res) => {
try {
	const emergencies = await Emergency.find();
	res.json(emergencies);
} catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
}
});

app.post('/emergencies', async (req, res) => {
const { emergencyNumbers, location, emergencyType } = req.body;

try {
	const newEmergency = new Emergency({ emergencyNumbers, location, emergencyType });
	await newEmergency.save();
	res.json(newEmergency);
} catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
}
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
