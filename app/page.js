'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col '>
        {error && <h6 style={{ color: 'red' }}>{error}</h6>}
        <input
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {error ? (
          <Link href='/'>
            <button className='btn-disabled'>Start Quiz</button>
          </Link>
        ) : (
          <Link href='/quiz'>
            <button className='button'>Start Quiz</button>
          </Link>)}
      </div>
    </main>
  )
}
