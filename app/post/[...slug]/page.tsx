import ContentAdapter, { fileExtName } from "@/app/components/ContentAdapter";
import { getFileContent } from "@/app/api/post/service";
import { Metadata } from "next";
import Link from "next/link";
import { METADATA } from "@/config/const";

export const metadata: Metadata = {
	title: METADATA.TITLE,
	description: METADATA.DESC,
	keywords: METADATA.KEYWORDS
};

export default async function Page({ params }: { params: { slug: string[] } }) {
	const { slug } = params
	const fileExtName = getFileExtName(slug[slug.length - 1]) as fileExtName
	const fileKey = decodeURIComponent(slug.join("/"))

	const data = await getFileContent('post/' + fileKey)

	const { title = METADATA.TITLE, ctime = '----.--.--', desc = METADATA.DESC, keywords = METADATA.KEYWORDS } = data.data
	metadata.title = title
	metadata.description = desc
	metadata.keywords = keywords

	return <article className="mt-20">
		<p className="text-2xl text-main text-center">{title}</p>
		<div className="*:text-sm *:text-center">
			<p>createdAt: {ctime}</p>
		</div>
		<div id="main" className="mt-7">
			{data.content ? <ContentAdapter fileExtName={fileExtName} content={data.content} /> : '敬请期待......'}

		</div>
		<p className="text-right my-6">
			<Link href={'/'} className="hover:text-main">cd ~</Link>
		</p>
	</article>
}


function getFileExtName(fileName: string) {
	const dotIndex = fileName.lastIndexOf('.');
	if (dotIndex === -1) {
		return '';
	}
	return fileName.slice(dotIndex + 1);
}

