import { Message, Role } from '@/types';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_KEY,
});

const MAX_CONTEXT_TOKENS = 1000;

export default async function Conversation(Messages: Message[]) {
    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            messages: Messages as ChatCompletionMessageParam[],
        });

        console.log(completion.choices[0].message);

        return completion.choices[0].message
    } catch (error) {
        console.log("Open Router Error - ", error);
    }
}

