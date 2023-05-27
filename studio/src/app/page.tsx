'use client';
import Image from 'next/image'
import { CssBaseline, ThemeProvider } from '@mui/material';


import { baselightTheme } from "./theme/DefaultColors";
import { FullLayout } from '@/components/FullLayout/FullLayout';
export default function Home() {
  return (
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      <FullLayout>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          asdfasdf
        </main>
      </FullLayout>
    </ThemeProvider>
  )
}
