import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    );
}
