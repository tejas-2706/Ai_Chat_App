import { GeminiChat } from "@/components/GeminiChat";
import { GeminiImage } from "@/components/GeminiImage";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <GeminiChat/> */}
      {/* <GeminiImage/> */}
      <div className="flex flex-col justify-center items-center h-screen gap-10">
        <div className="text-4xl">       
          What Do you Wann'a Do ??
        </div>
        <div className="text-2xl">
          <Link
            href={'/chat'}
            className="cursor-pointer hover:underline p-4"
          >Chat Now</Link>
          <Link
            href={'/gen-image'}
            className="cursor-pointer hover:underline p-4"
          >Generate Image Now</Link>
        </div>
      </div>
    </div>
  );
}
