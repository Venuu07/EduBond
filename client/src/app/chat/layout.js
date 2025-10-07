import ChatRoomPage from './[roomName]/page.js';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Community Chat</h1>
      <ChatRoomPage />
    </div>
  );
}