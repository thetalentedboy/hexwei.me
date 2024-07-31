import { NextRequest, NextResponse } from "next/server";
import { getDirFiles, getListFiles } from "./service";
import { DirMode } from "@/app/services/s3Service";


export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const dirMode = searchParams.get('dir')

	if (!dirMode) {
		return NextResponse.json({ msg: 'Invalid dirMode' }, { status: 400 });
	}

	let data = {}
	if (Number(dirMode) === DirMode.Open) {
		const prefix = searchParams.get('prefix') ?? "post/"
		data = await getDirFiles(prefix)
	} else {
		const pageToken = searchParams.get('page_token') ?? ''
		const pageSize = Number(searchParams.get('page_size'))
		data = await getListFiles({ pageToken, pageSize })
	}

	return NextResponse.json({ data })
}

