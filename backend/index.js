const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');



const xlsx = require('xlsx'); // For reading Excel files if needed
const User = require('./models/User'); // MongoDB User model
const Hackathon = require('./models/Hackathons');
const bodyParser = require('body-parser');
const Feedback = require('./models/Teams');
const Team = require('./models/RTeam');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const kmeans = require('node-kmeans');
// Middleware configurations
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use(express.json());


app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://maureenmiranda22:PqxEHalWziPVqy7n@cluster0.ive9g.mongodb.net/hack_04d?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Failed to connect to MongoDB:', err));

// Helper function to map skills and interests to numerical values
const skillMapping = { 'Python': 0, 'Java': 1, 'C++': 2, 'JavaScript': 3, 'HTML/CSS': 4, 'Data Science': 5, 'Machine Learning': 6, 'AI': 7, 'Cloud Computing': 8, 'Cybersecurity': 9 };
const interestMapping = { 'AI': 0, 'Machine Learning': 1, 'Data Science': 2, 'Web Development': 3, 'Cloud Computing': 4, 'Blockchain': 5, 'Cybersecurity': 6, 'Game Development': 7, 'Software Engineering': 8, 'Automation': 9 };


 // Import K-Means library

 

app.post("/api/recommendStudents", async (req, res) => {
  const { skill, interest, participation } = req.body;

  if (!skill || !interest || typeof participation !== "number") {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    // Load the data from the Excel file
    const workbook = xlsx.readFile("./data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Preprocess Excel data
    const combinedData = excelData.map(row => ({
      skills: row.skills || "",
      interests: row.interests || "",
      participation: parseInt(row.participation || 0, 10),
      name: row.name || "Unknown",
    }));

    // Convert data for clustering
    const skillMapping = {};
    const interestMapping = {};
    let skillIndex = 0;
    let interestIndex = 0;

    const transformedData = combinedData.map(user => {
      if (!(user.skills in skillMapping)) {
        skillMapping[user.skills] = skillIndex++;
      }
      if (!(user.interests in interestMapping)) {
        interestMapping[user.interests] = interestIndex++;
      }
      return [
        skillMapping[user.skills],
        interestMapping[user.interests],
        user.participation,
      ];
    });

    // Add input data to the dataset
    if (!(skill in skillMapping)) {
      skillMapping[skill] = skillIndex++;
    }
    if (!(interest in interestMapping)) {
      interestMapping[interest] = interestIndex++;
    }
    const inputData = [
      skillMapping[skill],
      interestMapping[interest],
      participation,
    ];
    transformedData.push(inputData);

    // Perform K-Means clustering
    kmeans.clusterize(transformedData, { k: 5 }, (err, result) => {
      if (err) {
        console.error("Error during clustering:", err);
        return res.status(500).json({ message: "Clustering failed" });
      }

      const clusters = result.map(cluster => cluster.cluster);
      const centroids = result.map(cluster => cluster.centroid);

      // Find the closest cluster to the input data
      let closestClusterIndex = -1;
      let minDistance = Infinity;
      centroids.forEach((centroid, index) => {
        const distance = Math.sqrt(
          centroid.reduce((sum, value, i) => sum + (value - inputData[i]) ** 2, 0)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestClusterIndex = index;
        }
      });

      // Get students from the closest cluster
      const similarStudents = clusters[closestClusterIndex].map(index => ({
        Name: combinedData[index] ? combinedData[index].name : "Unknown",
        SimilarityScore: Math.sqrt(
          transformedData[index].reduce(
            (sum, value, i) => sum + (value - inputData[i]) ** 2,
            0
          )
        ),
      }));

      // Sort by similarity score
      similarStudents.sort((a, b) => a.SimilarityScore - b.SimilarityScore);

      // Return the top 10 similar students
      res.status(200).json(similarStudents.slice(0, 10));
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/hackathons/upcoming', async (req, res) => {
  try {
    const upcomingHackathons = await Hackathon.find({ status: 'Open' });
    res.json(upcomingHackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get past hackathons
app.get('/api/hackathons/past', async (req, res) => {
  try {
    const pastHackathons = await Hackathon.find({ status: { $ne: 'Open' } });
    res.json(pastHackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to save feedback
app.post('/api/teams/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving feedback');
  }
});
app.post('/api/teams', async (req, res) => {
  const { teamName, teamMembers, userId, hackathonId } = req.body;

  // Check if all required data is provided
  if (!teamName || !teamMembers || !userId || !hackathonId) {
    return res.status(400).json({ message: 'Missing required fields: teamName, teamMembers, userId, hackathonId' });
  }

  try {
    // Create new team with userId and hackathonId
    const newTeam = new Team({
      teamName,
      teamMembers,
      userId, // Include the userId of the person registering the team
      hackathonId // Store the hackathonId to link the team with a specific event
    });

    // Save the new team to the database
    await newTeam.save();

    // Respond with success message
    res.status(201).json({
      message: 'Team created successfully',
      team: newTeam
    });
  } catch (error) {
    // Handle any errors that occur during team creation
    res.status(400).json({
      message: 'Error creating team',
      error: error.message
    });
  }
});
app.get('/api/teams/:hackathonTitle', async (req, res) => {
  try {
    const hackathonTitle = req.params.hackathonTitle;
    // Find teams by hackathonTitle
    const teams = await Team.find({ hackathonId: hackathonTitle });
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching teams' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

