import './globals.css';
import Header from '../components/Header.js';
import { AuthProvider } from '../context/AuthContext.js';

export const metadata = {
  title: 'EduBond',
  description: 'A student network for collaborative growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Header/>
        <main>
         {children}
        </main>
        </AuthProvider>               
        </body>
    </html>
  );
}
