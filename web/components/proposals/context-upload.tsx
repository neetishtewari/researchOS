"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ContextUploadProps {
    onContentReady: (content: string) => void
    isGenerating: boolean
}

export function ContextUpload({ onContentReady, isGenerating }: ContextUploadProps) {
    const [activeTab, setActiveTab] = useState("files")
    const [textInput, setTextInput] = useState("")
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleGenerate = () => {
        // For MVP, we combine text input and file names (mock content for files)
        // Real implementation needs file parsing
        const fileSummary = files.map(f => `File: ${f.name} (Content pending parsing)`).join("\n")
        const fullContent = `${textInput}\n\n${fileSummary}`
        onContentReady(fullContent)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Context Upload</CardTitle>
                <CardDescription>
                    Upload RFPs, client emails, or paste notes to generate a proposal.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="text">Text / Notes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="files" className="space-y-4">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                            )}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    {isDragActive ? "Drop files here" : "Drag & drop files here, or click to select"}
                                </p>
                                <p className="text-xs text-muted-foreground/75">
                                    PDF, DOCX, TXT supported
                                </p>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded bg-slate-50">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                                            <span className="text-sm truncate">{file.name}</span>
                                            <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="text">
                        <Textarea
                            placeholder="Paste RFP content, client email chain, or internal meeting notes here..."
                            className="min-h-[200px]"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                    <Button onClick={handleGenerate} disabled={isGenerating || (files.length === 0 && !textInput.trim())}>
                        {isGenerating ? "Generating Proposal..." : "Generate Proposal Draft"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
