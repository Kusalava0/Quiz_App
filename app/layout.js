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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/87250e21ec.js" crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
