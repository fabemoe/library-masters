import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useAuth } from '../providers/AuthProvider'
import HomeElement from '../components/HomeElement'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  

  return (
      <main
      className='centered'
      style={{
        height: "calc(100vh - 50px)"
      }}
      >
        <HomeElement />
      </main>
  )
}
