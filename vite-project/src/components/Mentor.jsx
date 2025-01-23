import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Send, Users, MessageCircle, Video, Clock, Calendar, FileText, HelpCircle } from 'lucide-react';

const LiveForum = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Mentor Support & Q&A Forum
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ChatRoom />
            <ScheduledMeetings />
            <PDFQuestionAnswer />
          </div>
          <div>
            <FAQs />
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const faqs = [
    { question: "How do I schedule a session?", answer: "Navigate to the schedule section and select an available time slot." },
    { question: "What topics can I discuss?", answer: "We cover a wide range of professional topics including career development, technical skills, and industry insights." },
    { question: "Session interruption policy?", answer: "While you can leave a session, we recommend communicating with your mentor beforehand." },
    { question: "Are sessions confidential?", answer: "Yes, all sessions are private and not recorded without explicit consent." },
    { question: "Mentor communication methods?", answer: "Use our live chatroom or schedule a dedicated meeting." },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-red-700 p-4">
        <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
          <HelpCircle className="mr-3" /> Frequently Asked Questions
        </h2>
      </div>
      <div className="p-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="mb-4 pb-4 border-b border-blue-100 last:border-b-0 hover:bg-blue-50 transition duration-300 rounded-lg p-3"
          >
            <p className="font-semibold text-blue-800 mb-2">{faq.question}</p>
            <p className="text-blue-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PDFQuestionAnswer = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-red-700 p-4">
        <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
          <FileText className="mr-3" /> PDF Document Q&A
        </h2>
      </div>
      <div className="p-6">
        <iframe 
          src="http://localhost:8502" 
          width="100%" 
          height="600px" 
          className="border border-blue-200 rounded-xl"
        >
        </iframe>
      </div>
    </div>
  );
};

const ScheduledMeetings = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      mentor: "John Smith",
      topic: "Advanced React Development",
      date: "2024-02-15",
      time: "14:30",
      meetLink: "https://meet.google.com/def-nvfy-exc"
    },
    {
      id: 2,
      mentor: "Emily Chen",
      topic: "Strategic Tech Career Growth",
      date: "2024-02-20",
      time: "16:00",
      meetLink: "https://meet.google.com/abc-xyz-123"
    }
  ]);

  const joinMeeting = (meetLink) => {
    window.location.href = meetLink;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-red-700 p-4">
        <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
          <Calendar className="mr-3" /> Upcoming Meetings
        </h2>
      </div>
      <div className="p-6 space-y-4">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className="bg-blue-50 p-4 rounded-xl flex items-center justify-between hover:bg-blue-100 transition duration-300 border border-blue-100"
          >
            <div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2 text-blue-700" size={20} />
                <span className="font-semibold text-blue-800">{meeting.mentor}</span>
              </div>
              <p className="text-blue-700 text-sm">{meeting.topic}</p>
              <p className="text-blue-600 text-xs mt-1">
                {meeting.date} at {meeting.time}
              </p>
            </div>
            <button
              onClick={() => joinMeeting(meeting.meetLink)}
              className="bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-300 flex items-center"
            >
              <Video className="mr-2" /> Join Meeting
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = { username, message };
      socket.emit("message", msgData);
      setMessage("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-red-700 p-4">
        <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
          <Users className="mr-3" /> Professional Chat Room
        </h2>
      </div>
      <div className="p-6">
        {!isJoined ? (
          <form onSubmit={joinChat} className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
              placeholder="Enter your professional username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-xl hover:bg-red-600 transition duration-300"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto border border-blue-100 rounded-xl p-4 mb-4 space-y-3">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                >
                  <strong className="text-blue-800 mr-2">{msg.username}:</strong>
                  <span className="text-blue-700">{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                className="flex-grow px-4 py-3 border border-blue-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                placeholder="Type a professional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-700 text-white p-3 rounded-xl hover:bg-red-600 transition duration-300"
              >
                <Send />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveForum;