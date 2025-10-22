// client/src/app/layout.js
import './globals.css';
import Header from '../components/Header.js'; // Ensure .js extension
import { AuthProvider } from '../context/AuthContext.js'; // Ensure .js extension
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../context/ThemeContext.js';

export const metadata = {
  title: 'EduBond',
  description: 'A student network for collaborative growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
          {/* Use Flexbox to structure the page */}
          <div className="flex flex-col min-h-screen bg-gray-50">
             {/* Added bg-gray-50 for subtle background */}
             <Toaster // 2. Add the Toaster component here
              position="top-right" // You can change the position
              toastOptions={{
                duration: 2000, // How long toasts stay visible (milliseconds)
              }}
              containerStyle={{
                top: 80, // Adjust this value based on your header height + desired spacing
              }}
            />
            <Header />
            {/* Make the main content area grow to fill available space */}
            <main className="flex-grow">{children}</main>
            {/* We can add a Footer component here later */}
            {/* <Footer /> */}
          </div>
        </AuthProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}