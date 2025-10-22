'use client';

import { useState, useEffect,useRef} from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../../context/AuthContext.js';
import { useParams } from 'next/navigation.js';
import Spinner from '../../../components/Spinner.js';
import axios from 'axios'; // Import axios for API calls

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export default function ChatRoomPage() {
    const { user } = useAuth();
    const params=useParams();
    const room=params.roomName;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true); // State for loading history
    const messagesEndRef = useRef(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchHistoryAndConnect = async () => {
            if (room && user) { // Ensure room and user are available
                setLoadingHistory(true);
                try {
                    // 1. Fetch existing messages for the room
                    const { data } = await axios.get(`${API_URL}/api/messages/${room}`);
                    setMessages(data.data); // Load history
                } catch (error) {
                    console.error("Failed to fetch message history:", error);
                    // Handle error (e.g., show a toast)
                } finally {
                    setLoadingHistory(false);
                }

                // 2. Join the Socket.IO room
                socket.emit('joinRoom', room);
            }
        };

        fetchHistoryAndConnect();

        // 3. Listener for receiving new messages
        const handleReceiveMessage = (data) => {
            // Check if message is already displayed (to avoid duplicates from history + broadcast)
             setMessages((prevMessages) => {
                if (!prevMessages.some(msg => msg._id === data._id)) {
                    return [...prevMessages, data];
                }
                return prevMessages;
             });
        };
        socket.on('receiveMessage', handleReceiveMessage);

        // 4. Clean up listeners and potentially leave room on unmount
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            // Optional: socket.emit('leaveRoom', room);
        };
    }, [room, user, API_URL]); // Dependencies: room, user, API_URL

    // --- useEffect to scroll down when new messages arrive ---
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Run whenever the messages array changes

    // --- Updated function to send messages ---
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && user && room) {
            const messageData = {
                room: room,
                authorId: user._id, // Include user ID
                authorName: user.name, // Include user name
                text: message,
                // Time is added by backend now via createdAt
            };
            socket.emit('sendMessage', messageData);
            setMessage('');
        }
    };

return (
    // Main chat container
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

      {/* Room Header */}
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold capitalize text-[var(--colors-edu-neutral)]">{room} Chat</h2>
      </div>

      {/* Message Display Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50"> {/* Added subtle bg */}
        {loadingHistory ? (
          <Spinner /> // Show spinner while loading history
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 pt-10 italic">No messages yet. Start the conversation!</div>
        ) : (
          // Map over messages and apply bubble styling
          messages.map((msg, index) => {
            // Determine if the message is from the current logged-in user
            // Use optional chaining for safety in case msg.author or msg.author.id is missing
            const isCurrentUser = user && msg.author?.id === user._id;

            return (
              // Outer div for alignment
              <div
                key={msg._id || index} // Use _id if available, fallback to index
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`} // Align bubble
              >
                {/* Inner div for the bubble itself */}
                <div
                  className={`max-w-[70%] sm:max-w-[65%] p-3 rounded-xl shadow-sm ${ // Adjusted max-width & rounded-xl
                    isCurrentUser
                      ? 'bg-[var(--colors-edu-primary)] text-white' // Coral bubble for current user
                      : 'bg-white text-[var(--colors-edu-base-content)] border border-gray-100' // White bubble for others
                  }`}
                >
                  {/* Show author name only for messages from others */}
                  {!isCurrentUser && (
                    <p className="text-xs font-semibold text-[var(--colors-edu-secondary)] mb-1"> {/* Lavender name */}
                      {msg.author?.name || 'Unknown User'}
                    </p>
                  )}
                  {/* Message Text */}
                  <p className="text-sm break-words">{msg.text}</p> {/* Allow long words to break */}
                  {/* Timestamp */}
                  <p className={`text-xs mt-1 ${isCurrentUser ? 'text-gray-200 opacity-80' : 'text-gray-400'} text-right`}> {/* Timestamp styling */}
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-100"> {/* Slightly darker bg */}
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input flex-grow rounded-r-none focus:ring-1" // Use form-input style
            placeholder={user ? "Type a message..." : "Please login to chat"}
            disabled={!user}
            // Optional: Send message on Enter key press
            onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) { // Check for Enter without Shift
                     handleSendMessage(e);
                 }
            }}
          />
          <button
            type="submit"
            // Use Primary color, adjust padding/focus
            className="px-5 py-2 text-white bg-[var(--colors-edu-primary)] rounded-r-md hover:opacity-90 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--colors-edu-primary)] focus:ring-offset-1 transition duration-150 ease-in-out"
            disabled={!user || !message.trim()} // Disable if no user or message is empty
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}