'use client';
import { FullLayout } from '@/components/fullLayout/FullLayout';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <FullLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link to="/api/auth/login">Login</Link>
      </main>
    </FullLayout>
  )
}
