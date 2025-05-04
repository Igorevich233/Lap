import Head from 'next/head';
import dynamic from 'next/dynamic';

const LaptopStore = dynamic(() => import('../components/LaptopStore'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Магазин БУ ноутбуков</title>
        <meta name="description" content="Продажа БУ ноутбуков с автообновлением из XML" />
      </Head>
      <main className="min-h-screen p-4">
        <LaptopStore />
      </main>
    </div>
  );
}
