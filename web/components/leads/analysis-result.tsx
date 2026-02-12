"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, ArrowRight, TrendingUp, DollarSign, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface AnalysisData {
    score: number
    leadType: "Strategic Partner" | "Standard Project" | "Transactional" | "Low Fit"
    summary: string
    dealSize: "Small" | "Medium" | "Large" | "Unknown"
    timeline: "Urgent" | "Standard" | "Long-term" | "Unknown"
    risks: string[]
    nextSteps: string[]
}

interface AnalysisResultProps {
    data: AnalysisData | null
    isLoading: boolean
}

export function AnalysisResult({ data, isLoading }: AnalysisResultProps) {
    if (isLoading) {
        return (
            <Card className="h-full border-dashed flex items-center justify-center p-12">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div className="h-4 w-48 bg-muted rounded"></div>
                    <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
            </Card>
        )
    }

    if (!data) {
        return (
            <Card className="h-full border-dashed flex items-center justify-center p-12 bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p>Submit a lead on the left to see the AI assessment.</p>
                </div>
            </Card>
        )
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 dark:text-green-400"
        if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
        return "text-red-600 dark:text-red-400"
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Card */}
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Qualification Score</CardTitle>
                        <Badge variant={data.score >= 70 ? "default" : "secondary"}>
                            {data.leadType}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4 mb-2">
                        <span className={cn("text-5xl font-bold", getScoreColor(data.score))}>
                            {data.score}
                        </span>
                        <span className="text-muted-foreground mb-1">/ 100</span>
                    </div>
                    <Progress value={data.score} className="h-2" />
                </CardContent>
            </Card>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="pt-6 flex items-center gap-3">
                        <DollarSign className="h-8 w-8 text-muted-foreground opacity-50" />
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Est. Value</p>
                            <p className="text-lg font-bold">{data.dealSize}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex items-center gap-3">
                        <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Timeline</p>
                            <p className="text-lg font-bold">{data.timeline}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {data.summary}
                    </p>
                </CardContent>
            </Card>

            {/* Risks & Steps */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-4 w-4" /> Potential Risks
                    </h3>
                    <ul className="space-y-2">
                        {data.risks.map((risk, i) => (
                            <li key={i} className="text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded text-red-900 dark:text-red-200 border border-red-100 dark:border-red-900/20">
                                • {risk}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <ArrowRight className="h-4 w-4" /> Recommended Next Steps
                    </h3>
                    <ul className="space-y-2">
                        {data.nextSteps.map((step, i) => (
                            <li key={i} className="text-sm bg-blue-50 dark:bg-blue-900/10 p-2 rounded text-blue-900 dark:text-blue-200 border border-blue-100 dark:border-blue-900/20">
                                {i + 1}. {step}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
