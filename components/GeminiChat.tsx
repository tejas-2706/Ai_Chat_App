"use client"
import { GeminiStream } from '@/lib/GeminiStream'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from './CodeBlock'

export const GeminiChat = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    async function handleSubmit() {
        setIsLoading(true);
        setResponse("");
        await GeminiStream(prompt, setResponse)
        setIsLoading(false);
    }
    return (
        <div className='flex flex-col h-screen'>
            <div className='flex-1 overflow-y-auto flex flex-col text-xl p-2'>
                <div className='flex justify-center my-2'>
                    {response ?
                        <div className="rounded-2xl p-4 max-w-[60%] bg-[#212121]">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code: CodeBlock,
                                    p: ({ children }) => <>{children}</>
                                }}
                            >
                                {response}
                            </ReactMarkdown>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div className='flex justify-center gap-4 mb-2'>
                <textarea
                    className='bg-gray-900 rounded-2xl p-4 border-none'
                    placeholder='Enter a Prompt'
                    rows={1}
                    cols={90}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button onClick={handleSubmit} className='bg-purple-400 rounded-2xl p-2 cursor-pointer'>
                    {isLoading ?
                        <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                        </svg>
                    }
                </button>
            </div>
        </div>
    )
}