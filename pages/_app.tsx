import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DataProvider from '../providers/DataProvider'
import AuthProvider from '../providers/AuthProvider'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Header />
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>

  )
}
