import 'styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import HeaderNav from 'components/Navigation/HeaderNav'
import links from 'components/Navigation/Links'
import Layout from 'components/Layout'
import Meta from 'components/Meta'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme={true ? 'dark' : 'system'} disableTransitionOnChange>
      <Meta />
      <HeaderNav links={links} />
      <Layout>
        <AnimatePresence mode='wait'>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  )
}

export default App
