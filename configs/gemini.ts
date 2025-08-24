import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function Gemini_AI(Prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: Prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
  return response.text
}

export async function Gemini_AI_Streamig(Prompt:string){
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: Prompt
    });

    // for await (const chunk of response){
    //     console.log(chunk.text);
    // }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller){
            try {
                for await (const chunk of response){
                    const text = chunk.text;
                    if (text){
                        controller.enqueue(encoder.encode(text));
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                controller.close();
            }
        }
    });

    return stream;
}
