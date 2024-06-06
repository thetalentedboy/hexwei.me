import { config } from "@/config/const";
import { NextResponse } from "next/server";
import { getAllFilesInfo, testFileAccess } from "./utils";


interface Parmas {
	slug: string[]
}

export async function GET(_: Request, context: { params: Parmas }) {
	const rootPath = config?.post.addr
	const path = context.params.slug.join('/')
	const folderDir = rootPath + path

	if (!testFileAccess(folderDir)) {
		return NextResponse.json({ msg: 'file not found' })
	}
	const data = await getAllFilesInfo(folderDir)

	return NextResponse.json({ data })
}

