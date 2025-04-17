import Header from "@/components/Header";
import {getDictionary} from "@/app/i18n/get-dictionary";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}


export default async function Home({params}:{params:{lang:'en' | 'ru'}}) {
    const dict = await getDictionary(params.lang);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Header />
        <main className="p-4">
            <h1 className="text-2xl font-bold">{dict.home.title}</h1>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                {dict.home.button}
            </button>
        </main>
    </div>
  );
}
