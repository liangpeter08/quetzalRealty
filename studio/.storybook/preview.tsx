import type { Preview, Story } from "@storybook/react";

import '../src/app/globals.css';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import { baselightTheme } from '../src/theme/DefaultColors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={baselightTheme} >
        <CssBaseline />
        < QueryClientProvider client={queryClient} > <Story /></QueryClientProvider >
      </ThemeProvider>
    )
  ]
};

export default preview;
