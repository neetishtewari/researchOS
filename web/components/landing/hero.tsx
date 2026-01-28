import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32 bg-black text-white">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                        </span>
                        Accepting Early Access
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        The AI Operating System for{" "}
                        <span className="block text-brand-accent">
                            Modern Research Teams
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg text-gray-400 sm:text-xl">
                        Accelerate proposals, design, and synthesis by 50%—keeping you in the driver's seat.
                        ResearchOS augments your expertise, it doesn't replace it.
                    </p>
                    <div className="flex flex-col gap-3 min-[400px]:flex-row">
                        <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white h-12 px-8">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                Start for Free <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white">
                            <Link href="/dashboard">
                                View Demo
                            </Link>
                        </Button>
                    </div>

                    {/* Abstract visual element */}
                    <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/20 opacity-20 blur-[100px]" />
                </div>
            </div>
        </section>
    );
}
