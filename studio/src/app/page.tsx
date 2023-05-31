'use client';
import { FullLayout } from '@/components/fullLayout/FullLayout';
export default function Home() {
  return (
    <FullLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <a href="/api/auth/login">Login</a>
      </main>
    </FullLayout>
  )
}
