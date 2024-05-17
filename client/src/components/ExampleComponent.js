// client/src/components/ExampleComponent.js
import React, { useState, useEffect } from 'react';
// Import the CSS file
import './ExampleComponent.css';
const ExampleComponent = () => {
	// State to manage form inputs
	const [emergencyNumbers, setEmergencyNumbers] = useState('');
	const [location, setLocation] = useState('');
	const [emergencyType, setEmergencyType] = useState('');

	// State to store existing emergencies
	const [emergencies, setEmergencies] = useState([]);

	// Function to fetch existing emergencies
	const fetchEmergencies = async () => {
		try {
			const response =
				await
					fetch('http://localhost:5000/emergencies');
			const data = await response.json();
			setEmergencies(data);
		} catch (error) {
			console.error('Error fetching emergencies:', error);
		}
	};

	// Fetch existing emergencies on component mount
	useEffect(() => {
		fetchEmergencies();
	}, []);

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Send data to the server
			const response =
				await
					fetch('http://localhost:5000/emergencies', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body:
							JSON.stringify(
								{
									emergencyNumbers,
									location, emergencyType
								}),
					});

			const data =
				await response.json();
			console.log('Data submitted:', data);

			// Reset form inputs after submission
			setEmergencyNumbers('');
			setLocation('');
			setEmergencyType('');

			// Fetch updated emergencies after submission
			fetchEmergencies();
		} catch (error) {
			console.error('Error submitting data:', error);
		}
	};

	return (
		<div className="emergency-form">
			<h2>Report an Emergency</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="emergencyNumbers">
						Emergency Numbers:
					</label>
					<input
						type="text"
						id="emergencyNumbers"
						placeholder="Enter emergency numbers"
						value={emergencyNumbers}
						onChange={
							(e) =>
								setEmergencyNumbers(e.target.value)
						}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="location">
						Location:
					</label>
					<input
						type="text"
						id="location"
						placeholder="Enter location"
						value={location}
						onChange={
							(e) =>
								setLocation(e.target.value)
						}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="emergencyType">
						Type of Emergency:
					</label>
					<input
						type="text"
						id="emergencyType"
						placeholder="Enter type of emergency"
						value={emergencyType}
						onChange={
							(e) =>
								setEmergencyType(e.target.value)
						}
						required
					/>
				</div>

				<button type="submit">
					Submit
				</button>
			</form>

			{/* Display existing emergencies */}
			<div className="existing-emergencies">
				<h2>Existing Emergencies</h2>
				<ul>
					{emergencies.map((emergency, index) => (
						<li key={index}>
							<strong>
								Emergency Numbers:
							</strong>
							{emergency.emergencyNumbers},{' '}
							<strong>
								Location:
							</strong>
							{emergency.location},{' '}
							<strong>
								Emergency Type:
							</strong>
							{emergency.emergencyType}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ExampleComponent;
