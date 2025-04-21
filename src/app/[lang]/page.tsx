import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default async function Home() {

  return (
    <main className="min-h-screen bg-background">
        <Header />
        <Hero/>
    </main>
  );
}
