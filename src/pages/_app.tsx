import { Dashboard } from '@/components/layouts/dashboard';
import '@/styles/globals.css'
import { Layout } from '@/types/layout';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const render = () => {
    let Comp: any = Component
    switch (Comp.layout) {
      case Layout.DASHBOARD:
        return <Dashboard><Comp {...pageProps} /></Dashboard>
      default:
        return <Component {...pageProps} />
    }
  }
  return render()
}
