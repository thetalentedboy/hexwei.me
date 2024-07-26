import { NextRequest, NextResponse } from "next/server";
import { getListFiles } from "./service";


export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const prefix = searchParams.get('prefix')
	if (!prefix) {
		return NextResponse.error()
	}
	const data = await getListFiles(prefix)

	return NextResponse.json({ data })
}

