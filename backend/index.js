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
const axios = require('axios');
const Version = require('./models/Version');

// Middleware configurations
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173',
// }));
// In your existing index.js, add:

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Add this if credentials are being used
}));


// Add these headers explicitly for preflight requests
app.options('*', cors());
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

app.patch("/api/teams/:teamId/schedule", async (req, res) => {
  const { teamId } = req.params;
  const { scheduleTime } = req.body;

  try {
    const team = await Team.findByIdAndUpdate(
      teamId,
      { scheduleTime },
      { new: true } // Return updated document
    );

    if (!team) return res.status(404).send("Team not found");
    res.send(team);
  } catch (err) {
    res.status(500).send("Error updating schedule");
  }
});
app.post('/api/hackathons', async (req, res) => {
  const {
    title,
    date,
    participants,
    prize,
    difficulty,
    skills,
    status,
    winners
  } = req.body;

  try {
    const newHackathon = new Hackathon({
      title,
      date,
      participants,
      prize,
      difficulty,
      skills: skills.split(','), // Convert skills into an array of strings
      status,
      winners: winners.split(','), // Convert winners into an array of strings
    });

    await newHackathon.save();
    res.status(201).json({ message: 'Event created successfully', data: newHackathon });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

app.get('/api/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hackathons', error });
  }
});
app.get('/api/event/:hackname', async (req, res) => {
  try {
    const { hackname } = req.params;
    console.log(hackname);
    const event = await Hackathon.findOne({ title: hackname });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
app.get('/api/leaderboards', async (req, res) => {
  try {
    const leaderboard = await Feedback.aggregate([
      {
        $project: {
          teamName: 1,
          totalScore: {
            $sum: ['$innovation', '$creativity', '$ux', '$businessPotential']
          }
        }
      },
      { $sort: { totalScore: -1 } }, // Sort by totalScore in descending order
      { $limit: 3 }                 // Limit to top 3
    ]);
console.log(leaderboard);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

app.get('/api/leaderboard/:hackathonTitle', async (req, res) => {
  try {
    const hackathonTitle = req.params.hackathonTitle;
    console.log(`Received request for leaderboard of hackathon: ${hackathonTitle}`);

    // Fetch teams for the specific hackathon
    const teams = await Team.find({ hackathonId: hackathonTitle });
    console.log(`Fetched teams for hackathon "${hackathonTitle}":`, teams);

    // Fetch feedback for the specific hackathon
    const teamNames = teams.map(team => team.teamName)
    const feedbacks = await Feedback.find({ teamName: { $in: teamNames } });
    console.log(`Fetched feedbacks for hackathon "${hackathonTitle}":`, feedbacks);

    // Create a map of team feedback
    const feedbackMap = new Map(
      feedbacks.map(feedback => [
        feedback.teamName.toLowerCase(),
        {
          innovation: feedback.innovation,
          creativity: feedback.creativity,
          ux: feedback.ux,
          businessPotential: feedback.businessPotential,
          feedback: feedback.feedback,
          members: feedback.members
        }
      ])
    );
    console.log(`Constructed feedback map:`, feedbackMap);

    // Combine team and feedback data
    const leaderboardData = teams.map(team => {
      const feedback = feedbackMap.get(team.teamName.toLowerCase()) || {};
      const totalScore =
        (feedback.innovation || 0) +
        (feedback.creativity || 0) +
        (feedback.ux || 0) +
        (feedback.businessPotential || 0);

      console.log(`Calculating total score for team "${team.teamName}":`, {
        innovation: feedback.innovation || 0,
        creativity: feedback.creativity || 0,
        ux: feedback.ux || 0,
        businessPotential: feedback.businessPotential || 0,
        totalScore
      });

      return {
        teamName: team.teamName,
        teamMembers: team.teamMembers,
        innovation: feedback.innovation || 0,
        creativity: feedback.creativity || 0,
        ux: feedback.ux || 0,
        businessPotential: feedback.businessPotential || 0,
        feedback: feedback.feedback || "No feedback",
        totalScore: totalScore,
        averageScore: totalScore / 4
      };
    });

    // Sort and rank teams
    const rankedLeaderboard = leaderboardData
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
    console.log(`Ranked leaderboard data:`, rankedLeaderboard);

    res.json(rankedLeaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Error generating leaderboard' });
  }
});
const GITHUB_TOKEN = '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'; // Optional for private repos

app.get('/api/commits', async (req, res) => {
  const { owner, repo } = req.query; // Extract owner and repo from the query params

  // Check if both owner and repo are provided
  if (!owner || !repo) {
    return res.status(400).send('Owner and repo parameters are required');
  }

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
    res.json(response.data); // Send back the commit data
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    res.status(500).send('Error fetching commit data');
  }
});

app.get('/api/project-data', async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).send('Owner and repo parameters are required');
  }

  try {
    // Fetch commits
    const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);

    // Fetch branches
    const branchesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`);

    // Fetch pull requests
    const pullsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`);

    // Fetch issues
    const issuesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`);

    // Fetch repository details (stars, forks, etc.)
    const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);

    // Send all data in a single response
    res.json({
      commits: commitsResponse.data,
      branches: branchesResponse.data,
      pulls: pullsResponse.data,
      issues: issuesResponse.data,
      repo: repoResponse.data,
    });
  } catch (error) {
    console.error('Error fetching project data:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching project data');
  }
});

app.post('/api/ver', async (req, res) => {
  const { hackname, teamName, gitUrl } = req.body;

  if (!hackname || !teamName || !gitUrl) {
    return res.status(400).json({ message: 'All fields (hackname, teamName, gitUrl) are required.' });
  }

  try {
    // Create a new Team instance and save it to the database
    const newTeam = new Version({ hackname, teamName, gitUrl });
    await newTeam.save();

    res.status(201).json({ message: 'Form submitted successfully!', team: newTeam });
  } catch (error) {
    console.error('Error saving team data:', error);
    res.status(500).json({ message: 'Error submitting form. Please try again.' });
  }
});
app.get('/sub', async (req, res) => {
  const { hackname } = req.query;  // Extract hackname from query params
console.log(hackname);
  if (!hackname) {
    return res.status(400).json({ message: 'Hackathon title (hackname) is required' });
  }

  try {
    // Find all teams for the given hackname
    const teams = await Version.find({ hackname });

    if (teams.length === 0) {
      return res.status(404).json({ message: 'No teams found for this hackathon' });
    }

    // Map the results to include teamName, gitUrl, and a button for "Track Progress"
    const teamData = teams.map((team) => ({
      teamName: team.teamName,
      gitUrl: team.gitUrl,
    }));

    // Send the team data in the response
    res.json({ teams: teamData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/events/addMentor', async (req, res) => {
  const { eventId, mentor } = req.body;

  try {
    // Find the hackathon and update its mentors array
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      eventId,
      { $push: { mentors: mentor } },
      { new: true } // Return the updated document
    );

    if (!updatedHackathon) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ 
      message: 'Mentor added successfully', 
      mentor: mentor 
    });
  } catch (error) {
    console.error('Error adding mentor:', error);
    res.status(500).json({ message: 'Error adding mentor', error: error.message });
  }
});

app.patch('/api/teams/:teamName/mentor', async (req, res) => {
  const { teamName } = req.params;  // Using teamName instead of teamId
  const { mentorName, mentorEmail, scheduleTime } = req.body;

  console.log('Received teamName:', teamName);

  try {
    // Find team by teamName instead of teamId
    const team = await Team.findOne({ teamName: teamName });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Proceed with your mentor assignment logic
    team.assignedMentor = {
      name: mentorName,
      email: mentorEmail
    };
    team.scheduleTime = scheduleTime;

    await team.save();
    res.status(200).json(team);
  } catch (err) {
    console.error('Error in mentor assignment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/api/teams', async (req, res) => {
  const hackathonId = req.query.hackathonId;  // Retrieve hackathonId from query params

  if (!hackathonId) {
    return res.status(400).json({ message: 'Hackathon ID is required' });
  }

  try {
    // Find teams based on the hackathonId
    const teams = await Team.find({ hackathonId });
    
    if (!teams.length) {
      return res.status(404).json({ message: 'No teams found for this hackathon' });
    }

    const teamsData = teams.map((team) => ({
      teamName: team.teamName,
      assignedMentor: team.assignedMentor,
      meetLink: team.meetLink,
    }));

    res.json(teamsData);
  } catch (error) {
    console.error('Error fetching team data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

