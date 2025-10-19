// client/src/app/layout.js
import './globals.css';
import Header from '../components/Header.js'; // Ensure .js extension
import { AuthProvider } from '../context/AuthContext.js'; // Ensure .js extension

export const metadata = {
  title: 'EduBond',
  description: 'A student network for collaborative growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Use Flexbox to structure the page */}
          <div className="flex flex-col min-h-screen bg-gray-50"> {/* Added bg-gray-50 for subtle background */}
            <Header />
            {/* Make the main content area grow to fill available space */}
            <main className="flex-grow">{children}</main>
            {/* We can add a Footer component here later */}
            {/* <Footer /> */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}