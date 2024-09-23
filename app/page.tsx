import { METADATA } from "@/config/const";
import PostsDisplay from "./components/PostsDisplay";

export default function Home() {

  return (<main>
    <header className=" text-main py-10">
      <div className="m-auto lg:flex lg:justify-center">
        <div className="md:w-1/2 text-center flex justify-center flex-col">
          <div className="text-8xl opacity-70">HexWei</div>
          <div className="text-xs opacity-50 -mt-4">{METADATA.KEYWORDS}</div>
        </div>
        <div className="p-4 md:w-1/2">
          <div className="w-full bg-[#000] rounded-md p-4 text-sm sm:text-base">{METADATA.DESC}
          </div>
        </div>
      </div>
    </header>
    <nav className="flex text-main mb-8 md:my-14 *:px-4 *:border-r-main *:border-r justify-center *:leading-4 *:cursor-pointer">
      <div className="hover:text-[#3399FF]">Home</div>
      <div className="!border-none hover:text-[#3399FF]">Contact</div>
    </nav>
    <PostsDisplay />
    <p className="text-center text-xs mt-2">Copyright © 2024 By HexWei</p>
  </main>);
}
