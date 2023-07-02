import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { AuthProvider } from '@/context/AuthContext';
import { OCRProvider } from '@/context/OCRContext';
import { Poppins } from "next/font/google"
import { Global } from '@emotion/react';
import { Notifications } from '@mantine/notifications';

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Detectix</title>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          // fontFamily: 'Poppins, Trebuchet MS, sans-serif',
          colors: {
            "primary": ["rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)", "rgb(22 163 74)"],
          },
          primaryColor: "primary",
          globalStyles: theme => ({
            body: {
              ...theme.fn.fontStyles(),
              ...poppins.style,
            }
          })
        }}
      >
        <Notifications />
        <OCRProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </OCRProvider>
      </MantineProvider>
    </>
  )
}
