import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold text-white">
                        ResearchOS
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pricing
                    </Link>
                    <Button asChild className="bg-brand-accent hover:bg-brand-accent/90 text-white">
                        <Link href="/dashboard">Launch Workspace</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
