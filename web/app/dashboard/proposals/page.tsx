"use client"

import { useCallback } from "react"
import { useCompletion } from "@ai-sdk/react"
import { ProposalWizard } from "@/components/proposals/proposal-wizard"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ProposalsPage() {
    const { complete, completion, isLoading } = useCompletion({
        api: "/api/proposals/generate",
    })

    // We wrap complete in a handler to match the signature expected by ProposalWizard
    const handleGenerate = useCallback((content: string) => {
        complete(content)
    }, [complete])

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
                <p className="text-muted-foreground">
                    Generate high-quality research proposals from RFPs and notes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
                <div className="h-full">
                    <ProposalWizard onContentReady={handleGenerate} isGenerating={isLoading} />
                </div>

                {/* Output Area */}
                <div className="h-full overflow-hidden flex flex-col">
                    {completion || isLoading ? (
                        <div className="rounded-lg border bg-card shadow-sm h-full flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b shrink-0">
                                <h2 className="text-xl font-semibold">Draft Proposal</h2>
                                {isLoading && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Generating...</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 overflow-y-auto flex-1 prose dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {completion}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground h-full flex items-center justify-center bg-muted/20">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">No Proposal Generated</h3>
                                <p>Complete the wizard on the left to generate your first draft.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
