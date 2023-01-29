import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DataProvider from '../providers/DataProvider'
import AuthProvider from '../providers/AuthProvider'
import Header from '../components/Header'
import PopUpProvider from '../providers/PopUpProvider'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <DataProvider>
          <PopUpProvider>
            <Header />
            <Component {...pageProps} />
          </PopUpProvider>
        </DataProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}
