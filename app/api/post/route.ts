import { config } from "@/config/const";
import { getAllFilesInfo } from "./[...slug]/utils";
import { NextResponse } from "next/server";

export async function GET() {
	const rootDir = config?.post.addr
	const data = await getAllFilesInfo(rootDir!!)
	return NextResponse.json({ data })
}
