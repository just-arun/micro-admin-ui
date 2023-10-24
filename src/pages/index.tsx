import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Layout } from '@/types/layout'
import Link from 'next/link'
import { GlobalStore } from '@/stores/global'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const globalStore = GlobalStore.useContainer()


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <div className="relative flex place-items-center ">
        <h1 className='text-5xl'>Application Settings</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">

        {globalStore.links.map((e, i) => (
          i != 0 && <Link
            key={i}
            href={e.path}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {e.label}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {e.description}
            </p>
          </Link>
        ))}




      </div>
    </main>
  )
}

Home.layout = Layout.DASHBOARD
