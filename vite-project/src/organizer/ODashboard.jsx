import React, { useState,useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    PieChart, 
    Pie, 
    Cell, 
    LineChart, 
    Line,
    RadarChart,
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    Radar
  } from 'recharts';
  import { 
    Trophy, 
    Users, 
    Calendar, 
    BarChart3,
    LayoutDashboard,
    CalendarPlus,Award
  } from 'lucide-react';

const ODashboard = () => {
  const [activeSection, setActiveSection] = useState('events');

  const handleLogout = () => {
    console.log("User logged out");
    // Add your actual logout functionality here, e.g., clearing session or redirecting
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'events':
        return <PastEventsSection />;
      case 'create':
        return <CreateEventSection />;
      case 'certificates':
        return <CertificatesSection />;
      case 'analysis':
        return <AnalysisSection />;
      default:
        return <PastEventsSection />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">HackCentral</h1>
          {/* Logout button */}
          <button 
            onClick={handleLogout} 
            className="text-red-500 hover:text-red-700"
          >
            Log Out
          </button>
        </div>
        <nav>
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Past Events" 
            active={activeSection === 'events'}
            onClick={() => setActiveSection('events')}
          />
          <NavItem 
            icon={<CalendarPlus />} 
            label="Create Event" 
            active={activeSection === 'create'}
            onClick={() => setActiveSection('create')}
          />
          <NavItem 
            icon={<Award />}  
            label="Generate Certificates" 
            active={activeSection === 'certificates'}
            onClick={() => setActiveSection('certificates')}
          />
          <NavItem 
            icon={<BarChart />} 
            label="View Analysis" 
            active={activeSection === 'analysis'}
            onClick={() => setActiveSection('analysis')}
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`flex items-center p-3 mb-2 rounded cursor-pointer 
      ${active ? 'bg-blue-600' : 'hover:bg-gray-700'}`} 
    onClick={onClick}
  >
    {React.cloneElement(icon, { className: 'mr-3' })}
    <span>{label}</span>
  </div>
);

const PastEventsSection = () => {
    const [events, setEvents] = useState([]);
  
    // Fetch events when component mounts
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/hackathons');
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents();
    }, []);
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Past Created Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          )}
        </div>
      </div>
    );
  };
  
  
  

  const EventCard = ({ event }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Participants: {event.participants}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        View Details
      </button>
    </div>
  );

const CreateEventSection = () => {
    const [eventData, setEventData] = useState({
      title: '',
      date: '',
      participants: '',
      prize: '',
      difficulty: '',
      skills: [],
      status: '',
      winners: []
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEventData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:3000/api/hackathons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
  
        if (response.ok) {
          alert('Event created successfully');
        } else {
          alert('Error creating event');
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error creating event");
      }
    };
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Create a New Event</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2">Event Name</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter event name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Participants</label>
            <input
              type="number"
              name="participants"
              value={eventData.participants}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Number of participants"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Prize</label>
            <input
              type="text"
              name="prize"
              value={eventData.prize}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Prize for the winners"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Difficulty</label>
            <input
              type="text"
              name="difficulty"
              value={eventData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Event difficulty (e.g., Easy, Medium, Hard)"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={eventData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Comma separated list of required skills"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              name="status"
              value={eventData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="Open">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Winners</label>
            <input
              type="text"
              name="winners"
              value={eventData.winners}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Comma separated list of winners"
            />
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded">Create Event</button>
        </form>
      </div>
    );
  };
  

const CertificatesSection = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Generate Certificates</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <select className="w-full p-2 border rounded mb-4">
        <option>Select Event</option>
        {/* Dynamic event options */}
      </select>
      <button 
        className="w-full bg-blue-500 text-white px-6 py-2 rounded"
      >
        Generate Certificates
      </button>
    </div>
  </div>
);

const AnalysisSection = () => {
    const monthlyEventsData = [
      { month: 'Jan', count: 5 },
      { month: 'Feb', count: 7 },
      { month: 'Mar', count: 6 },
      { month: 'Apr', count: 8 },
      { month: 'May', count: 4 },
      { month: 'Jun', count: 9 }
    ];
  
    const participantDistributionData = [
      { name: 'Web Dev', value: 400 },
      { name: 'AI/ML', value: 300 },
      { name: 'Mobile', value: 200 },
      { name: 'Blockchain', value: 100 }
    ];
  
    const monthlyParticipantsData = [
      { month: 'Jan', participants: 150 },
      { month: 'Feb', participants: 200 },
      { month: 'Mar', participants: 180 },
      { month: 'Apr', participants: 250 },
      { month: 'May', participants: 220 },
      { month: 'Jun', participants: 300 }
    ];
  
    const skillCompetencyData = [
      { skill: 'Web Dev', competency: 90 },
      { skill: 'AI/ML', competency: 75 },
      { skill: 'Mobile', competency: 60 },
      { skill: 'Blockchain', competency: 45 },
      { skill: 'Cloud', competency: 30 }
    ];
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Monthly Hackathons Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Hackathons</h3>
              <BarChart width={400} height={250} data={monthlyEventsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis dataKey="month" stroke="#8884d8"/>
                <YAxis stroke="#8884d8"/>
                <Tooltip cursor={{fill: 'transparent'}}/>
                <Bar dataKey="count" fill="#3B82F6" radius={[10, 10, 0, 0]}/>
              </BarChart>
            </div>
  
            {/* Participant Distribution Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Participant Distribution</h3>
              <PieChart width={400} height={250}>
                <Pie
                  data={participantDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {participantDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="space-y-6">
            {/* Monthly Participants Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Participants</h3>
              <LineChart width={400} height={250} data={monthlyParticipantsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis dataKey="month" stroke="#8884d8"/>
                <YAxis stroke="#8884d8"/>
                <Tooltip cursor={{stroke: '#3B82F6', strokeWidth: 2}}/>
                <Line 
                  type="monotone" 
                  dataKey="participants" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{r: 6, fill: '#3B82F6'}}
                />
              </LineChart>
            </div>
  
            {/* Skill Competency Radar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Skill Competency</h3>
              <RadarChart width={400} height={250} data={skillCompetencyData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  dataKey="competency" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </div>
          </div>
        </div>
  
        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center">
            <Trophy className="text-blue-600 mb-2" size={32} />
            <h4 className="text-gray-500 text-sm">Total Hackathons</h4>
            <p className="text-2xl font-bold text-blue-600">32</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center">
            <Users className="text-blue-600 mb-2" size={32} />
            <h4 className="text-gray-500 text-sm">Total Participants</h4>
            <p className="text-2xl font-bold text-blue-600">1,200</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center">
            <Calendar className="text-blue-600 mb-2" size={32} />
            <h4 className="text-gray-500 text-sm">Avg. Participants</h4>
            <p className="text-2xl font-bold text-blue-600">38</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center">
            <BarChart3 className="text-blue-600 mb-2" size={32} />
            <h4 className="text-gray-500 text-sm">Active Domains</h4>
            <p className="text-2xl font-bold text-blue-600">4</p>
          </div>
        </div>
      </div>
    );
  };

export default ODashboard;