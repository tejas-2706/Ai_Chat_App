import { Gemini_AI, Gemini_AI_Streamig } from "@/configs/gemini";
import Conversation from "@/configs/gpt";
import { Role } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // const ans = await Conversation([{
    //     role: Role.User,
    //     content: "helllo? gpt how are u whats ur model name ??"
    // }]);

    // const ans = await Gemini_AI("How are you ? what is u r model, what do u do for living ??");

    const {prompt} = await req.json();

    const stream = await Gemini_AI_Streamig(prompt);

    return new NextResponse(stream, {
        headers : {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked", // enables streaming
        },
    });
}