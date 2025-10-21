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
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Room Header */}
            <div className="p-4 border-b bg-gray-50">
                <h2 className="text-xl font-bold capitalize text-gray-700">{room} Chat</h2>
            </div>

            {/* Message Display Area */}
            <div className="flex-grow p-4 overflow-y-auto">
                {loadingHistory ? (
                    <Spinner /> // Show spinner while loading history
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 pt-10">No messages yet. Start the conversation!</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id || Math.random()} className="mb-4"> {/* Use _id from DB */}
                            <p className="font-semibold text-sm text-gray-800">
                                {msg.author?.name || 'Unknown User'} {/* Access nested author name */}
                                <span className="text-xs text-gray-500 font-normal ml-2">
                                    {/* Format createdAt timestamp */}
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </p>
                            <p className="text-gray-700">{msg.text}</p>
                        </div>
                    ))
                )}
                {/* Empty div to act as scroll target */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-input flex-grow rounded-r-none" // Use form-input style
                        placeholder={user ? "Type a message..." : "Please login to chat"}
                        disabled={!user}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1" // Enhanced button style
                        disabled={!user || !message.trim()} // Disable if no user or message is empty
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}