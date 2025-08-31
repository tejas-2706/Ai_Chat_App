import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

export async function Gemini_AI(Prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: Prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      systemInstruction: "Give me response in such a way that my react-markdown can process it easilt for beautify markdown output!!"
    }
  });
  console.log(response.text);
  return response.text
}

export async function Gemini_AI_Streamig(Prompt:string){
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: Prompt,
        config: {
            systemInstruction: "Give me response in such a way that my react-markdown can process it easilt for beautify markdown output!!",
        }
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


// export async function Gemini_AI_Image(prompt:string){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-image-preview",
//         contents: [{text: prompt}],
//     });
    
//     for (const part of response.candidates![0].content!.parts!){
//         if (part.text){
//             console.log(part.text);
//         }else if (part.inlineData){
//             const imageData = part.inlineData.data;
//             const buffer = Buffer.from(imageData!, "base64");
//             fs.writeFileSync("ai-image.png", buffer);
//             console.log("Image saved as ai-image.png");
//         }
//     }
// }


export async function Gemini_AI_Image(prompt: string) {
    try {
        const img_name = `ai-image-${Date.now()}`
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: [{ text: prompt }],
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE]
            }
        });

        // Safely access the candidates and parts
        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) {
            throw new Error("No valid content parts found in the response.");
        }

        let imageSaved = false;
        for (const part of parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData!, "base64");
                // fs.writeFileSync("ai-image.png", buffer);
                fs.writeFileSync(require('path').join(process.cwd(), 'public', `${img_name}.png`), buffer);
                console.log("Image saved as ai-image.png");
                imageSaved = true;
            }
        }
        
        if (!imageSaved) {
            throw new Error("Image data was not returned by the model.");
        }
        return img_name;
    } catch (error: any) {
        console.error("Failed to Generate Image:", error);
        throw error; // Re-throw the error to be caught by the Next.js API route
    }
}