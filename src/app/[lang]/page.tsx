import Header from "@/components/Header";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}


export default async function Home() {

  return (
    <main className="min-h-screen bg-background">
     <Header />
    </main>
  );
}
