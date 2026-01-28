import { Zap, Brain, PenTool, BarChart } from "lucide-react";

const features = [
    {
        name: "Accelerated Proposals",
        description: "Transform RFPs into structured proposal drafts in minutes, not hours. Get a 50% head start on every pitch.",
        icon: Zap,
    },
    {
        name: "Intelligent Synthesis",
        description: "Upload transcripts and let ResearchOS identify key themes and supporting evidence, ready for your expert review.",
        icon: Brain,
    },
    {
        name: "Methodology Design",
        description: "Translate business problems into robust research designs with AI-assisted sampling logic and methodology rationale.",
        icon: PenTool,
    },
    {
        name: "Lead Qualification",
        description: "Instantly assess inbound leads for fit and complexity, focusing your BD efforts on the highest-value opportunities.",
        icon: BarChart,
    },
];

export function Features() {
    return (
        <section className="py-24 bg-black text-white">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Built for Speed, Designed for Control
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Powerful modules that handle the grunt work so you can focus on the insights.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-brand-accent/50 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-white">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-white">{feature.name}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
