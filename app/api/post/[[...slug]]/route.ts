import { config } from "@/config/const";
import { NextResponse } from "next/server";
import { getAllFilesAttr, testFileAccess } from "./utils";


interface Params {
	slug: string[]
}

export async function GET(_: Request, context: { params: Params }) {
	const rootPath = config?.post.addr
	const path = context.params?.slug?.join('/') ?? ''
	const folderDir = rootPath + path

	if (!testFileAccess(folderDir)) {
		return NextResponse.json({ msg: 'file not found' })
	}
	const data = await getAllFilesAttr(folderDir)

	return NextResponse.json({ data })
}

