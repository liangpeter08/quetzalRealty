"use client";
import './globals.css'
import React from "react";
import Providers from "@/utils/provider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { baselightTheme } from "../theme/DefaultColors";
import { UserProvider } from '@auth0/nextjs-auth0/client';

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
          <UserProvider>
            <Providers>
              {children}
            </Providers>
          </UserProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}





