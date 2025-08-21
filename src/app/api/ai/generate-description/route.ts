import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// This is a placeholder tool as the agent requires at least one.
// In a real-world scenario, this could be a web search tool.
const placeholderTool = tool(
  async () => {
    return "This is a placeholder response.";
  },
  {
    name: "placeholder_tool",
    description: "A placeholder tool.",
    schema: z.object({}),
  }
);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const prompt = `Based on the task title "${title}", generate a concise, one-sentence description for a to-do list item.`;

    const response = await model.invoke(prompt);
    
    const description = response.content.toString();

    return NextResponse.json({ description });
  } catch (error) {
    console.error('AI description generation failed:', error);
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}