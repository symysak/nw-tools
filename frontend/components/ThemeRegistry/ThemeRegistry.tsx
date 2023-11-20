'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { useState } from 'react';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    if(localStorage.getItem("darkMode") === undefined){
        localStorage.setItem("darkMode", preferDarkMode ? "true" : "false");
    }
    if((preferDarkMode ? "true" : "false") != localStorage.getItem("darkMode")){
        localStorage.setItem("darkMode", preferDarkMode ? "true" : "false");
    }

    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                ...(preferDarkMode
                    ? {
                        mode: 'dark',
                        navBar: "rgba(0, 0, 0, 0.6)",
                        primary: {
                            main: "#18181b",
                        },
                        secondary: {
                            main: "#27272a",
                        },
                        background: {
                            default: "#000000",
                            paper: "#18181b",
                        },

                    }
                    : {
                        mode: 'light',
                        navBar: "rgba(255, 255, 255, 0.6)",
                        background: {
                            default: "#ffffff",
                            paper: "#ffffff",
                        },
                    })
            },
            typography: {
                h1: {
                    fontSize: "2rem",
                },
                h2: {
                    fontSize: "1.65rem",
                },
                h3: {
                    fontSize: "1.5rem",
                },
                h4: {
                    fontSize: "1.25rem",
                },
                body1: {
                },
                caption: {
                    fontSize: "0.85rem",
                },
                button: {
                    fontSize: "0.85rem",
                    textTransform: "none",
                },
                fontFamily: roboto.style.fontFamily,
            },
            components: {
                MuiAlert: {
                    styleOverrides: {
                        root: ({ ownerState }) => ({
                            ...(ownerState.severity === 'info' && {
                                backgroundColor: '#60a5fa',
                            }),
                        }),
                    },
                },
                MuiTextField: {
                    defaultProps: {
                        variant: "outlined"
                    }
                },
                MuiTableContainer: {
                    defaultProps: {
                        sx: {
                            borderRadius: "14px",
                            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, .02), 0px 2px 10px 0px rgba(0, 0, 0, .06), 0px 0px 1px 0px rgba(0, 0, 0, .3)",
                        },
                    },
                },
                MuiTableHead: {
                    defaultProps: {
                        sx: {
                        },
                    }
                }
            },
        }), [preferDarkMode],
    );

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}