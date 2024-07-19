import { config } from "@/config/const";
import { NextResponse } from "next/server";
import { getAllFilesAttr } from "./utils";
import { cwd } from "process";

interface Params {
	slug: string[]
}

export async function GET(_: Request, context: { params: Params }) {
	const rootPath = config?.post.addr
	const p = context.params?.slug?.join('/') ?? ''
	const folderDir = rootPath + p
	throw new Error(cwd() + '|' + folderDir);

	try {
		const data = await getAllFilesAttr(folderDir)
		return NextResponse.json({ data })
	} catch (error) {

	}

}

