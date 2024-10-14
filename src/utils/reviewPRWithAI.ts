import OpenAI from 'openai';
import { openAiKey } from '../config';

export default async function reviewPRWithAI(prDescription: string, prDiff: string): Promise<string> {
    try {
        const openai = new OpenAI({
            apiKey: openAiKey,
        });

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that reviews code for best practices, potential improvements, and errors.'
                },
                {
                    role: 'user',
                    content: `
                Review the following pull request description and the code changes (diff):

                PR Description:
                ${prDescription}

                PR Code Changes (Diff):
                ${prDiff}

                Provide detailed feedback regarding code quality, potential improvements, and any issues you notice.
                `
                }
            ],
            max_tokens: 1500,
            temperature: 0.7,
        });

        return response.choices[0]?.message?.content || 'No response from AI.';
    } catch (error) {
        console.log("Error in reviewPRWithAi: ", error);
    }
}