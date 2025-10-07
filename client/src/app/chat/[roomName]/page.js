'use client';

import { useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../../context/AuthContext.js';
import { useParams } from 'next/navigation.js';

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export default function ChatRoomPage() {
    const { user } = useAuth();
    const params=useParams();
    const room=params.roomName;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

       if(room){
        socket.emit('joinRoom', room);
    }
         const handleReceiveMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
       
},[room]);
    const handleSendMessage = (e)=>{
        e.preventDefault();
        if(message.trim() && user && room){
            const messageData = {
                room: room,
                author: user.name,
                text: message,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit('sendMessage',messageData);
            setMessage('');
        }
    };

    return (
        <div className='flex flex-col h-[70vh] max-w-2xl mx-auto bg-white rounded-lg shadow-lg'>
            <div className='p-4 border-b'>
                <h2 className='text-xl font-bold capitalize'>{room} Chat</h2>
            </div>
            {/* Message Display Area */}
            <div className='flex-grow p-4 overflow-y-auto'>
                {messages.map((msg, index) => (
                    <div key={index} className='mb-4'>
                        <p className='font-bold'>{msg.author} <span className='text-xs text-gray-500'>{msg.time}</span></p>
                        <p>{msg.text}</p>
                        </div>
              )  )}
            </div>

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className='p-4 border-t'>
        <div className='flex'>
            <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-grow px-3 py-2 border rounded-l-md'
                placeholder={user ? "Type your message..." : "please login to chat"}
                disabled={!user}
                />
            <button
            type="submit"
            className='px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 disabled:bg-gray-400'
            disabled={!user}
            >
                Send
            </button>
        </div>
      </form>
        </div>
    );

}