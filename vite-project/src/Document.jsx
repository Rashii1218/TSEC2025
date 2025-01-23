// import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { useEditor, EditorContent } from '@tiptap/react';
// import Document from '@tiptap/extension-document';
// import Paragraph from '@tiptap/extension-paragraph';
// import Text from '@tiptap/extension-text';
// import Bold from '@tiptap/extension-bold';
// import Italic from '@tiptap/extension-italic';
// import Underline from '@tiptap/extension-underline';
// import BulletList from '@tiptap/extension-bullet-list';
// import ListItem from '@tiptap/extension-list-item';
// import TextAlign from '@tiptap/extension-text-align';
// import { Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, List as ListIcon, AlignLeft, AlignCenter, AlignRight, ExternalLink } from 'lucide-react';


// const DocumentEditor = () => {
//   const [socket, setSocket] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [fontSize, setFontSize] = useState('16px');

//   const editor = useEditor({
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//       Bold,
//       Italic,
//       Underline,
//       BulletList,
//       ListItem,
//       TextAlign.configure({
//         types: ['paragraph'],
//       }),
//     ],
//     content: '<p>Start typing...</p>',
//     onUpdate: ({ editor }) => {
//       // Emit changes to socket
//       socket?.emit('edit-document', 'doc1', { content: editor.getHTML() });
//     },
//   });
//   const tools = [
//     { 
//       name: 'Canva', 
//       url: 'https://www.canva.com', 
//       color: 'bg-[#00C4CC]',
//       description: 'Design beautiful graphics, presentations & social media content'
//     },
//     { 
//       name: 'Figma', 
//       url: 'https://www.figma.com', 
//       color: 'bg-[#A259FF]',
//       description: 'Collaborative interface design tool for teams'
//     },
//     { 
//       name: 'Jamboard', 
//       url: 'https://jamboard.google.com', 
//       color: 'bg-[#F37C20]',
//       description: 'Digital whiteboard for real-time collaboration'
//     },
//     { 
//       name: 'Miro', 
//       url: 'https://miro.com', 
//       color: 'bg-[#FFD02F]',
//       description: 'Online whiteboard platform for visual collaboration'
//     },
//     { 
//       name: 'Notion', 
//       url: 'https://notion.so', 
//       color: 'bg-black',
//       description: 'All-in-one workspace for notes, docs & projects'
//     }
//   ];

//   useEffect(() => {
//     const socketInstance = io('http://localhost:4000', { withCredentials: true });
//     setSocket(socketInstance);
//     socketInstance.on('connect', () => setConnected(true));
//     socketInstance.on('disconnect', () => setConnected(false));
//     socketInstance.on('document-updated', (document) => {
//       editor?.commands.setContent(document.content);
//     });
//     socketInstance.emit('join-document', 'doc1');
//     return () => socketInstance.disconnect();
//   }, [editor]);

//   // const tools = [
//   //   { name: 'Canva', url: 'https://www.canva.com', color: 'bg-[#00C4CC]', description: 'Design beautiful graphics, presentations & social media content' },
//   //   { name: 'Figma', url: 'https://www.figma.com', color: 'bg-[#A259FF]', description: 'Collaborative interface design tool for teams' },
//   //   { name: 'Jamboard', url: 'https://jamboard.google.com', color: 'bg-[#F37C20]', description: 'Digital whiteboard for real-time collaboration' },
//   //   { name: 'Miro', url: 'https://miro.com', color: 'bg-[#FFD02F]', description: 'Online whiteboard platform for visual collaboration' },
//   //   { name: 'Notion', url: 'https://notion.so', color: 'bg-black', description: 'All-in-one workspace for notes, docs & projects' },
//   // ];

//   if (!editor) {
//     return <div>Loading editor...</div>;
//   }

//   return (
//     <div className="flex min-h-screen">
//       <div className="w-80 bg-gray-100 p-6 space-y-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Creative Tools</h2>
//         {tools.map((tool) => (
//           <div key={tool.name} className="space-y-2">
//             <a
//               href={tool.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`block p-4 rounded-lg text-white ${tool.color} hover:opacity-90 transition-opacity flex justify-between items-center group`}
//             >
//               {tool.name}
//               <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//             </a>
//             <p className="text-sm text-gray-600 px-2">{tool.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex-1 bg-gradient-to-br from-[#ff5a05] via-[#6c1f93] to-[#360498] p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-lg shadow-xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff5a05] to-[#360498] text-transparent bg-clip-text">
//                 Real-Time Document Collaboration
//               </h1>
//               <div className="flex items-center gap-2">
//                 <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
//                 <span className="text-sm text-gray-600">
//                   {connected ? 'Connected' : 'Disconnected'}
//                 </span>
//               </div>
//             </div>

//             <div className="bg-gray-100 p-2 rounded-lg mb-4 flex items-center gap-2">
//               <select 
//                 onChange={(e) => setFontSize(e.target.value)}
//                 className="p-2 rounded border"
//               >
//                 <option value="14px">14px</option>
//                 <option value="16px">16px</option>
//                 <option value="18px">18px</option>
//                 <option value="20px">20px</option>
//               </select>

//               <div className="flex flex-wrap gap-2">
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     disabled={!editor.can().chain().focus().toggleBold().run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
//                   >
//                     <BoldIcon size={18} />
//                   </button>
//                   <button
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     disabled={!editor.can().chain().focus().toggleItalic().run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
//                   >
//                     <ItalicIcon size={18} />
//                   </button>
//                   <button
//                     onClick={() => editor.chain().focus().toggleUnderline().run()}
//                     disabled={!editor.can().chain().focus().toggleUnderline().run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
//                   >
//                     <UnderlineIcon size={18} />
//                   </button>
//                 </div>

//                 <div className="w-px h-8 bg-gray-300 mx-2" />

//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => editor.chain().focus().toggleBulletList().run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
//                   >
//                     <ListIcon size={18} />
//                   </button>
//                 </div>

//                 <div className="w-px h-8 bg-gray-300 mx-2" />

//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => editor.chain().focus().setTextAlign('left').run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
//                   >
//                     <AlignLeft size={18} />
//                   </button>
//                   <button
//                     onClick={() => editor.chain().focus().setTextAlign('center').run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
//                   >
//                     <AlignCenter size={18} />
//                   </button>
//                   <button
//                     onClick={() => editor.chain().focus().setTextAlign('right').run()}
//                     className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
//                   >
//                     <AlignRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full p-4 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#6c1f93] focus-within:border-transparent outline-none transition-all duration-200 shadow-inner bg-gray-50 hover:bg-white min-h-[300px]">
//               <EditorContent editor={editor} />
//             </div>

//             <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
//               <span>{editor.storage.characterCount?.characters() || 0} characters</span>
//               <span className="text-[#ff5a05]">Changes save automatically</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentEditor;


import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ExternalLink,
} from 'lucide-react';

const DocumentEditor = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [fontSize, setFontSize] = useState('16px');

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: '<p>Start typing...</p>',
    onUpdate: ({ editor }) => {
      // Emit changes to socket
      socket?.emit('edit-document', 'doc1', { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    const socketInstance = io('http://localhost:4000', { withCredentials: true });
    setSocket(socketInstance);
    socketInstance.on('connect', () => setConnected(true));
    socketInstance.on('disconnect', () => setConnected(false));
    socketInstance.on('document-updated', (document) => {
      editor?.commands.setContent(document.content);
    });
    socketInstance.emit('join-document', 'doc1');

    return () => socketInstance.disconnect();
  }, [editor]);

  const tools = [
    { name: 'Canva', url: 'https://www.canva.com', color: 'bg-[#00C4CC]', description: 'Design beautiful graphics, presentations & social media content' },
    { name: 'Figma', url: 'https://www.figma.com', color: 'bg-[#A259FF]', description: 'Collaborative interface design tool for teams' },
    { name: 'Jamboard', url: 'https://jamboard.google.com', color: 'bg-[#F37C20]', description: 'Digital whiteboard for real-time collaboration' },
    { name: 'Miro', url: 'https://miro.com', color: 'bg-[#FFD02F]', description: 'Online whiteboard platform for visual collaboration' },
    { name: 'Notion', url: 'https://notion.so', color: 'bg-black', description: 'All-in-one workspace for notes, docs & projects' },
  ];

  if (!editor) {
    return <div>Loading editor...</div>;
  }

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
                <div
                  className={`w-3 h-3 rounded-full ${
                    connected ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2 rounded-lg mb-4 flex items-center gap-2">
              <select
                onChange={(e) => {
                  setFontSize(e.target.value);
                  // Apply font size to editor content
                  const element = editor.view.dom;
                  element.style.fontSize = e.target.value;
                }}
                value={fontSize}
                className="p-2 rounded border"
              >
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>

              <div className="flex flex-wrap gap-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
                  >
                    <BoldIcon size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
                  >
                    <ItalicIcon size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('underline') ? 'bg-gray-200' : ''
                    }`}
                  >
                    <UnderlineIcon size={18} />
                  </button>
                </div>

                <div className="w-px h-8 bg-gray-300 mx-2" />

                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bulletList') ? 'bg-gray-200' : ''
                    }`}
                  >
                    <ListIcon size={18} />
                  </button>
                </div>

                <div className="w-px h-8 bg-gray-300 mx-2" />

                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                    }`}
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                    }`}
                  >
                    <AlignCenter size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                    }`}
                  >
                    <AlignRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full p-4 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#6c1f93] focus-within:border-transparent outline-none transition-all duration-200 shadow-inner bg-gray-50 hover:bg-white min-h-[300px]">
              <EditorContent editor={editor} />
            </div>

            <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
              <span>{editor.storage.characterCount?.characters() || 0} characters</span>
              <span className="text-[#ff5a05]">Changes save automatically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
