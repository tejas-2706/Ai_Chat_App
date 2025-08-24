export const GeminiStream = async(prompt: string, setText : (s : string) => void ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        body: JSON.stringify({prompt})
    });

    const reader = res.body?.getReader();

    const decoder = new TextDecoder();

    if (!reader) return;

    let text = "";

    while(true){
        const {done,value} = await reader.read();

        if (done) break;

        text += decoder.decode(value, {stream : true});

        setText(text);
    }

}