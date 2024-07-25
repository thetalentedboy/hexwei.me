import Adapter, { FileType } from "@/app/_components/Adapter";
import { getFileContent } from "@/app/api/post/[[...slug]]/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: '',
	description: '',
	keywords: ''
}

export default async function Page(props: { params: { slug: string[] } }) {
	const { params } = props
	const { slug } = params

	const fileType = getFileExtName(slug[slug.length - 1]) as FileType
	const pathname = slug.join("/")
	const data = await getFileContent(pathname)
	const { title = '-', ctime = '1980.01.01', desc = '', keywords = '' } = data.data

	metadata.title = title ?? "hexwei"
	metadata.description = desc ?? 'hexwei'
	metadata.keywords = keywords

	return <article className="mt-20">
		<p className="text-2xl text-main text-center">{title}</p>
		<div className="*:text-sm *:text-center">
			<p>createdAt: {ctime ?? '---'}</p>
		</div>
		<div id="main" className="mt-7">
			<Adapter fileType={fileType} content={data.content} />
		</div>
		<p className="text-right my-6">
			<Link href={'/'}>cd /</Link>
		</p>
	</article>
}


function getFileExtName(fileName: string) {
	const dotIndex = fileName.lastIndexOf('.');
	if (dotIndex === -1) {
		return '';
	}
	const fileType = fileName.slice(dotIndex + 1);
	return fileType;
}

