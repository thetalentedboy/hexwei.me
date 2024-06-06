import { config } from "@/config/const";
import { getAllFilesInfo } from "./api/post/[...slug]/utils";
import FileDisplay from "./fileDisplay";

async function fetchData() {
  const rootDir = config?.post.addr
  return await getAllFilesInfo(rootDir!!)
}

export default async function Home() {
  const list = await fetchData()

  return (
    <main className="lg:max-w-5xl m-auto">
      <header className=" text-main py-10">
        <div className="m-auto lg:flex lg:justify-center">
          <div className="w-1/2 text-center flex justify-center flex-col">
            <div className="text-8xl opacity-70">HexWei</div>
            <div className="text-xs opacity-50 -mt-4">FE, infra, devops, programming, hacking</div>
          </div>
          <div className="w-1/2">
            <p>Personal Introduction:</p>
            <div className="w-full bg-[#000] rounded-md p-4">
              Hello! I am HexWei, a tech enthusiast skilled in front-end engineering, infrastructure management, DevOps, programming, and cybersecurity. I'm passionate about creating efficient solutions, automating workflows, and ensuring security in digital environments. Always excited to tackle technological challenges and innovate.
            </div>
          </div>
        </div>
      </header>
      <nav className="flex text-main my-14 *:px-4 *:border-r-main *:border-r justify-center *:leading-4 *:cursor-pointer">
        <div className="hover:text-[#3399FF]">Home</div>
        <div className="hover:text-[#3399FF]">Archive</div>
        <div className="!border-none hover:text-[#3399FF]">Contact</div>
      </nav>
      <FileDisplay data={list} />
      <p className="text-center text-xs">Copyright © 2024 HexWei </p>
    </main>
  );
}
