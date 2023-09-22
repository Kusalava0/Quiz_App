import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quiz App',
  description: 'Simple Quiz App created with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load Font Awesome asynchronously */}
        <script
          src="https://kit.fontawesome.com/87250e21ec.js"
          crossorigin="anonymous"
          async  // Add the async attribute to load the script asynchronously
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
