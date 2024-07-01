import Adapter, { FileType } from "@/app/_components/Adapter";
import { getFileContent } from "@/app/api/post/[[...slug]]/utils";
import { config } from "@/config/const";
import { Metadata } from "next";
import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";

export const metadata: Metadata = {
	title: '',
	description: '',
	keywords: ''
}

interface Params {
	slug: string[]
}

async function getData(url: string) {
	const rootDir = config?.post.addr
	return await getFileContent(rootDir + url)
}

export default async function Page(props: { params: Params }) {
	const { params } = props
	const { slug } = params

	const fileType = getFileType(slug[slug.length - 1]) as FileType
	const pathname = slug.join("/")
	const data = await getData(pathname)
	const title = data.data.title

	metadata.title = title

	return <article className="mt-20">
		<p className="text-2xl text-main text-center">{title}</p>
		<div className="*:text-sm *:text-center">
			<p>createdAt: {data.data.ctime}</p>
		</div>
		<div id="main" className="mt-7">
			<Adapter fileType={fileType} content={data.content} />
		</div>
		<p className="text-right">
			<Link href={'/'}>cd /</Link>
		</p>
	</article>
}


function getFileType(fileName: string) {
	const dotIndex = fileName.lastIndexOf('.');
	if (dotIndex === -1) {
		return '';
	}
	const fileType = fileName.slice(dotIndex + 1);
	return fileType;
}

