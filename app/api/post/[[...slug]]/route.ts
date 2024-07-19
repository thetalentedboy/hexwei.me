import { config } from "@/config/const";
import { NextResponse } from "next/server";
import { getAllFilesAttr } from "./utils";
import path from "node:path";

interface Params {
	slug: string[]
}

export async function GET(_: Request, context: { params: Params }) {
	const rootPath = config?.post.addr
	const p = context.params?.slug?.join('/') ?? ''
	const folderDir = path.join(process.cwd(), rootPath + p)

	const data = await getAllFilesAttr(folderDir)
	return NextResponse.json({ data })

}

