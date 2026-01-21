import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = await streamText({
        model: openai('gpt-4o'),
        system: `You are an expert market research consultant acting as a "thinking multiplier" for a research team.
    Your goal is to draft a high-quality research proposal based on the provided context (RFP, notes, etc.).
    
    The proposal should include:
    1. Problem Understanding: Demonstrate deep understanding of the client's business context.
    2. Research Objectives: Clear, actionable objectives.
    3. Recommended Approach: Methodology rationale (Qual/Quant/Hybrid) and why it fits.
    4. Timeline & Deliverables: High-level schedule.
    5. Assumptions: explicit assumptions made during this draft.
    
    Tone: Professional, consulting-grade, concise but insightful. Avoid fluff.
    Format: Markdown.`,
        prompt,
    });

    return result.toTextStreamResponse();
}
