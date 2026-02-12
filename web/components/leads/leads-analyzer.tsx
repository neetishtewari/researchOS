"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X, Search, Mail, Linkedin, FileIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface LeadsAnalyzerProps {
    onAnalyze: (data: { source: string; content: string; files: File[] }) => void
    isAnalyzing: boolean
}

export function LeadsAnalyzer({ onAnalyze, isAnalyzing }: LeadsAnalyzerProps) {
    const [source, setSource] = useState("email")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [activeTab, setActiveTab] = useState("text")

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleAnalyze = () => {
        onAnalyze({ source, content, files })
    }

    const isValid = content.trim().length > 0 || files.length > 0

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Lead Analyzer
                </CardTitle>
                <CardDescription>
                    Paste an email, message, or upload an RFP to qualify the opportunity.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="space-y-2">
                    <Label htmlFor="source">Lead Source</Label>
                    <Select value={source} onValueChange={setSource}>
                        <SelectTrigger id="source">
                            <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="email">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Inbound Email
                                </div>
                            </SelectItem>
                            <SelectItem value="linkedin">
                                <div className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4" /> LinkedIn Message
                                </div>
                            </SelectItem>
                            <SelectItem value="rfp">
                                <div className="flex items-center gap-2">
                                    <FileIcon className="h-4 w-4" /> RFP Document
                                </div>
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="text">Paste Text</TabsTrigger>
                        <TabsTrigger value="files">Upload Files</TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="flex-1 mt-4">
                        <Textarea
                            placeholder={
                                source === "email" ? "Paste the email subject and body here..." :
                                    source === "linkedin" ? "Paste the message thread here..." :
                                        "Paste relevant details here..."
                            }
                            className="h-full min-h-[200px] resize-none p-4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </TabsContent>

                    <TabsContent value="files" className="flex-1 mt-4">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors h-full flex flex-col items-center justify-center",
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
                            <div className="mt-4 space-y-2 max-h-[150px] overflow-y-auto">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
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
                </Tabs>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={!isValid || isAnalyzing}
                >
                    {isAnalyzing ? "Analyzing Opportunity..." : "Analyze Lead"}
                </Button>
            </CardFooter>
        </Card>
    )
}
