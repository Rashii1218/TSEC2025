import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Bold, Italic, FileText, Type, ExternalLink } from 'lucide-react';

const DocumentEditor = () => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [fontSize, setFontSize] = useState('16px');

  const tools = [
    { 
      name: 'Canva', 
      url: 'https://www.canva.com', 
      color: 'bg-[#00C4CC]',
      description: 'Design beautiful graphics, presentations & social media content'
    },
    { 
      name: 'Figma', 
      url: 'https://www.figma.com', 
      color: 'bg-[#A259FF]',
      description: 'Collaborative interface design tool for teams'
    },
    { 
      name: 'Jamboard', 
      url: 'https://jamboard.google.com', 
      color: 'bg-[#F37C20]',
      description: 'Digital whiteboard for real-time collaboration'
    },
    { 
      name: 'Miro', 
      url: 'https://miro.com', 
      color: 'bg-[#FFD02F]',
      description: 'Online whiteboard platform for visual collaboration'
    },
    { 
      name: 'Notion', 
      url: 'https://notion.so', 
      color: 'bg-black',
      description: 'All-in-one workspace for notes, docs & projects'
    }
  ];

  useEffect(() => {
    const socketInstance = io('http://localhost:4000', { withCredentials: true });
    setSocket(socketInstance);
    socketInstance.on('connect', () => setConnected(true));
    socketInstance.on('disconnect', () => setConnected(false));
    socketInstance.on('document-updated', (document) => setContent(document.content));
    socketInstance.emit('join-document', 'doc1');
    return () => socketInstance.disconnect();
  }, []);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket?.emit('edit-document', 'doc1', { content: newContent });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-80 bg-gray-100 p-6 space-y-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Creative Tools</h2>
        {tools.map((tool) => (
          <div key={tool.name} className="space-y-2">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg text-white ${tool.color} hover:opacity-90 transition-opacity flex justify-between items-center group`}
            >
              {tool.name}
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-gray-600 px-2">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-gradient-to-br from-[#ff5a05] via-[#6c1f93] to-[#360498] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff5a05] to-[#360498] text-transparent bg-clip-text">
                Real-Time Document Collaboration
              </h1>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2 rounded-lg mb-4 flex items-center gap-2">
              <select 
                onChange={(e) => setFontSize(e.target.value)}
                className="p-2 rounded border"
              >
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>

              <div className="flex gap-2 ml-4">
                {['bold', 'italic'].map((style) => (
                  <button
                    key={style}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    {style === 'bold' ? <Bold size={20} /> : <Italic size={20} />}
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={content}
              onChange={handleChange}
              style={{ fontSize }}
              rows="15"
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6c1f93] focus:border-transparent outline-none resize-none transition-all duration-200 shadow-inner bg-gray-50 hover:bg-white"
              placeholder="Start typing..."
            />
            
            <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
              <span>{content.length} characters</span>
              <span className="text-[#ff5a05]">Changes save automatically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;