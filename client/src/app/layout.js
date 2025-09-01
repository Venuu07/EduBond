import './globals.css';
import Header from '../components/Header.js';

export const metadata = {
  title: 'EduBond',
  description: 'A student network for collaborative growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
       <main>
         {children}
        </main>
        </body>
    </html>
  );
}
