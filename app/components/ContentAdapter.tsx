import MarkdownIt from "markdown-it";
import "./markdown.css"

export type FileType = "html" | "md" | "video"

const markdown = MarkdownIt({
	html: true,
	breaks: true,
	linkify: true,
})

export default function ContentAdapter({ fileType, content }: { fileType: FileType, content: string }) {
	switch (fileType) {
		case 'html':
			return <Html content={content} />
		case 'md':
			return <Md content={content} />;
		default:
			return <div>Unsupported file type</div>;
	}

}

function Html({ content }: { content: string }) {
	return <div dangerouslySetInnerHTML={{ __html: content }} />
}

function Md({ content }: { content: string }) {
	const html = markdown.render(content)
	return <div className="markdown-body"><Html content={html} /></div>
}
