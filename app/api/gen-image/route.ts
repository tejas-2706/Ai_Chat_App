import { Gemini_AI_Image } from "@/configs/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {prompt} = await req.json();
    console.log(prompt);
    
    try {
        const imageData = await Gemini_AI_Image(prompt);
        console.log(imageData);
        
        return NextResponse.json({
            message: "Image Generated !!",
            data: imageData,
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "Failed to Generate Image !!",
            error: error
        });
    }
}