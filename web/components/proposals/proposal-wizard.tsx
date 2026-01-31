"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProposalWizardProps {
    onContentReady: (content: string) => void
    isGenerating: boolean
}

type Step = 1 | 2 | 3

interface FormData {
    clientName: string
    projectTitle: string
    files: File[]
    contextText: string
    instructions: string
}

export function ProposalWizard({ onContentReady, isGenerating }: ProposalWizardProps) {
    const [step, setStep] = useState<Step>(1)
    const [formData, setFormData] = useState<FormData>({
        clientName: "",
        projectTitle: "",
        files: [],
        contextText: "",
        instructions: ""
    })
    const [activeContextTab, setActiveContextTab] = useState("files")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFormData(prev => ({ ...prev, files: [...prev.files, ...acceptedFiles] }))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (index: number) => {
        setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))
    }

    const handleNext = () => {
        if (step < 3) setStep((prev) => (prev + 1) as Step)
    }

    const handleBack = () => {
        if (step > 1) setStep((prev) => (prev - 1) as Step)
    }

    const handleGenerate = () => {
        // Construct the prompt content from the wizard data
        const filesContent = formData.files.length > 0
            ? `\n\nAttachments:\n${formData.files.map(f => `- ${f.name} (Content pending parsing)`).join("\n")}`
            : ""

        const prompt = `Client: ${formData.clientName}
Project: ${formData.projectTitle}

Context:
${formData.contextText}
${filesContent}

Instructions:
${formData.instructions}`

        onContentReady(prompt)
    }

    const isStep1Valid = formData.clientName.trim() !== "" && formData.projectTitle.trim() !== ""
    const isStep2Valid = formData.files.length > 0 || formData.contextText.trim() !== ""

    if (!mounted) return null

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <CardTitle>New Proposal</CardTitle>
                    <span className="text-sm text-muted-foreground font-medium">Step {step} of 3</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
                <CardDescription className="mt-2">
                    {step === 1 && "Start with the project essentials."}
                    {step === 2 && "Provide context from RFPs, emails, or notes."}
                    {step === 3 && "Add specific instructions to refine the output."}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <Label htmlFor="clientName">Client Name</Label>
                            <Input
                                id="clientName"
                                placeholder="e.g. Acme Corp"
                                value={formData.clientName}
                                onChange={(e) => updateFormData("clientName", e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="projectTitle">Project Title</Label>
                            <Input
                                id="projectTitle"
                                placeholder="e.g. Q3 Consumer Insights Study"
                                value={formData.projectTitle}
                                onChange={(e) => updateFormData("projectTitle", e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <Tabs value={activeContextTab} onValueChange={setActiveContextTab} className="space-y-4">
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

                                {formData.files.length > 0 && (
                                    <div className="space-y-2 max-h-[150px] overflow-y-auto">
                                        {formData.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 border rounded bg-slate-50 dark:bg-slate-900">
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

                            <TabsContent value="text">
                                <Textarea
                                    placeholder="Paste RFP content, client email chain, or internal meeting notes here..."
                                    className="min-h-[250px]"
                                    value={formData.contextText}
                                    onChange={(e) => updateFormData("contextText", e.target.value)}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                            <Textarea
                                id="instructions"
                                placeholder="e.g. Focus on quantitative methodology, keep the tone formal, exclude social media analysis..."
                                className="min-h-[150px]"
                                value={formData.instructions}
                                onChange={(e) => updateFormData("instructions", e.target.value)}
                            />
                        </div>

                        <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                            <h4 className="font-semibold flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Ready to Generate
                            </h4>
                            <ul className="text-muted-foreground space-y-1 list-disc list-inside pl-1">
                                <li>Client: <span className="text-foreground font-medium">{formData.clientName}</span></li>
                                <li>Project: <span className="text-foreground font-medium">{formData.projectTitle}</span></li>
                                <li>Context: <span className="text-foreground font-medium">{formData.files.length} files, {formData.contextText.length > 0 ? "text provided" : "no text"}</span></li>
                            </ul>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between pt-4 border-t">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1 || isGenerating}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                {step < 3 ? (
                    <Button onClick={handleNext} disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? "Generating..." : "Generate Proposal"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
