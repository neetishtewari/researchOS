import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 text-white">
            <div className="container flex flex-col items-center justify-between gap-6 px-4 md:px-6 md:flex-row">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <span className="text-lg font-bold text-foreground">ResearchOS</span>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} ResearchOS. All rights reserved.
                    </p>
                </div>
                <nav className="flex gap-6">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
