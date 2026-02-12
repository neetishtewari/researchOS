import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
    const { source, content, files } = await req.json();

    // Construct the context prompt
    const prompt = `
    Analyze the following incoming lead:
    
    Source: ${source}
    
    Content:
    ${content}
    
    ${files && files.length > 0 ? `Attached Files: ${files.join(", ")}` : ""}
    
    Task:
    Act as a Senior Partner at a top-tier market research firm. Evaluate this opportunity based on:
    1. Strategic Fit (Is this interesting work?)
    2. Commercial Potential (Budget/Scale)
    3. Feasibility (Can we do it?)
    
    Provide a structured assessment.
    `;

    const result = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
            score: z.number().min(0).max(100).describe('Qualification score from 0-100'),
            leadType: z.enum(['Strategic Partner', 'Standard Project', 'Transactional', 'Low Fit']),
            summary: z.string().describe('Brief executive summary of the opportunity (2-3 sentences)'),
            dealSize: z.enum(['Small', 'Medium', 'Large', 'Unknown']).describe('Estimated commercial value'),
            timeline: z.enum(['Urgent', 'Standard', 'Long-term', 'Unknown']),
            risks: z.array(z.string()).describe('List of 2-3 potential risks or red flags'),
            nextSteps: z.array(z.string()).describe('List of 2-3 concrete next actions'),
        }),
        prompt,
    });

    return result.toJsonResponse();
}
