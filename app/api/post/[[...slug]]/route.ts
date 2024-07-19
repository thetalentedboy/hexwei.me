import { config } from "@/config/const";
import { NextResponse } from "next/server";
import { getAllFilesAttr, testFileAccess } from "./utils";
import path from "node:path";

interface Params {
	slug: string[]
}

export async function GET(_: Request, context: { params: Params }) {
	const rootPath = config?.post.addr
	const p = context.params?.slug?.join('/') ?? ''
	const folderDir = rootPath + p

	if (!testFileAccess(path.resolve(folderDir))) {
		return NextResponse.json({ msg: 'file not found' })
	}

	const data = await getAllFilesAttr(folderDir)
	return NextResponse.json({ data })
}

