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
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    if (!isValidEmail(enteredEmail)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
  };

  const startQuizButton = isValidEmail(email) ? (
    <Link href='/quiz'>
      <button className='button'>Start Quiz</button>
    </Link>
  ) : (
    <button className='btn-disabled' disabled>Start Quiz</button>
  );

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
        {startQuizButton}
      </div>
    </main>
  )
}
