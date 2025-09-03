'use client';

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

interface ThemeProviderProps extends Omit<NextThemeProviderProps, "children"> {
  children: React.ReactNode;
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
