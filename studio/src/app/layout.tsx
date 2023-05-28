"use client";
import './globals.css'
import React from "react";
import Providers from "@/utils/provider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { baselightTheme } from "../theme/DefaultColors";
import { FullLayout } from '@/components/fullLayout/FullLayout';
// export const metadata = {
//   title: 'QuetzalRealty',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  )
}





