import Header from "@/components/Header";
import Hero from "@/components/Hero";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}


export default async function Home() {

  return (
    <main className="min-h-screen bg-background">
        <Header />
        <Hero/>
    </main>
  );
}
