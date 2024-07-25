import { config } from "@/config/const";
import { getAllFilesAttr } from "./api/post/[[...slug]]/utils";
import FileDisplay from "./fileDisplay";

async function fetchData(url: string) {
  const rootDir = config?.post.addr
  return await getAllFilesAttr(url ?? rootDir!!)
}

interface HomeInterface {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: HomeInterface) {
  const list = await fetchData(searchParams?.url ?? '')

  return (<>
    <header className=" text-main py-10">
      <div className="m-auto lg:flex lg:justify-center">
        <div className="md:w-1/2 text-center flex justify-center flex-col">
          <div className="text-8xl opacity-70">HexWei</div>
          <div className="text-xs opacity-50 -mt-4">FE, infra, devops, programming, hacking</div>
        </div>
        <div className="p-4 md:w-1/2">
          <p className="text-center md:text-left">Personal Introduction:</p>
          <div className="w-full bg-[#000] rounded-md p-4">
            Hello! I'm HexWei, a tech enthusiast with expertise in front-end engineering, infrastructure management, DevOps, and programming. I focus on creating efficient solutions and automating workflows. I enjoy tackling technological challenges and innovating in the field.
          </div>
        </div>
      </div>
    </header>
    <nav className="flex text-main mb-8 md:my-14 *:px-4 *:border-r-main *:border-r justify-center *:leading-4 *:cursor-pointer">
      <div className="hover:text-[#3399FF]">Home</div>
      <div className="hover:text-[#3399FF]">Archive</div>
      <div className="!border-none hover:text-[#3399FF]">Contact</div>
    </nav>
    <FileDisplay data={list} />
  </>);
}
