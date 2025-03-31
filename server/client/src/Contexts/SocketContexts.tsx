import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Type for our Socket context (null if not connected)
type SocketContextType = Socket | null;

// Create the context with a default value of null
const SocketContext = createContext<SocketContextType>(null);

// Custom hook to consume the context
export const useSocket = () => useContext(SocketContext);

// Props for our SocketProvider
interface SocketProviderProps {
  children: React.ReactNode;
}

// The provider component that manages the socket connection
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    // Connect to your backend's Socket.IO server (adjust URL/port if needed)
    const newSocket = io('http://localhost:5005');
    setSocket(newSocket);

    // Cleanup on unmount - disconnect the socket
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
