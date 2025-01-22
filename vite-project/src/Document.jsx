import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const DocumentEditor = () => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io('http://localhost:4000', {
      withCredentials: true,
    });
    
    setSocket(socketInstance);

    socketInstance.on('connect', () => setConnected(true));
    socketInstance.on('disconnect', () => setConnected(false));
    
    socketInstance.on('document-updated', (document) => {
      setContent(document.content);
    });

    socketInstance.emit('join-document', 'doc1');

    return () => socketInstance.disconnect();
  }, []);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket?.emit('edit-document', 'doc1', { content: newContent });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff5a05] via-[#6c1f93] to-[#360498] p-8">
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
          
          <textarea
            value={content}
            onChange={handleChange}
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
  );
};

export default DocumentEditor;