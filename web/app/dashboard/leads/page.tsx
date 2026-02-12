"use client"

import { useState } from "react"
import { LeadsAnalyzer } from "@/components/leads/leads-analyzer"
import { AnalysisResult, AnalysisData } from "@/components/leads/analysis-result"

export default function LeadsPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<AnalysisData | null>(null)

    const handleAnalyze = async (data: { source: string; content: string; files: File[] }) => {
        setIsAnalyzing(true)
        setResult(null)

        try {
            // In a real app, we'd upload files first and send URLs or content
            // For MVP, we're just sending metadata about files
            const payload = {
                source: data.source,
                content: data.content,
                files: data.files.map(f => f.name)
            }

            const response = await fetch("/api/leads/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!response.ok) throw new Error("Analysis failed")

            const json = await response.json()
            setResult(json) // generateObject returns the object directly in toJsonResponse? 
            // Wait, toJsonResponse wraps it. Let's verify standard behavior.
            // usually it returns { object, ... } or just the object if custom response?
            // generateObject's toJsonResponse returns the result object directly usually? 
            // Checking docs: it returns the result object.
        } catch (error) {
            console.error("Analysis error:", error)
            // Handle error state if needed
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                <p className="text-muted-foreground">
                    Qualify and prioritize inbound opportunities with AI.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                <div className="h-full">
                    <LeadsAnalyzer onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                </div>

                <div className="h-full overflow-y-auto pr-2">
                    <AnalysisResult data={result} isLoading={isAnalyzing} />
                </div>
            </div>
        </div>
    )
}
