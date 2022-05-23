import Header from './header'
import Footer from './footer'
import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Blockchain Bulletin</title>
                <meta name="description" content="A simple decentralized message board" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='grid grid-rows-[min-content_1fr_min-content] h-screen'>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}