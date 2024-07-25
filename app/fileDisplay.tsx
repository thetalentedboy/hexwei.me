"use client"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { fileInfo } from "./api/post/[[...slug]]/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
	data: fileInfo[]
}

export default function FileDisplay(props: Props) {
	const { data } = props;
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const url = searchParams.get('url') ?? "post/"

	const [path, setPath] = useState(url)
	const [files, setFiles] = useState<fileInfo[]>(data)

	const createUrlQueryString = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set("url", value)

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		async function fetchData() {
			const responce = await fetch(`/api/${path}`)
			const res = await responce.json()
			setFiles(res.data)
		}
		fetchData()
		router.push(pathname + `?${createUrlQueryString(path)}`)
	}, [path])

	const isMultiLayer = path.split('/').filter(part => part !== '').length > 1

	const back = () => {
		const parts = path.split('/').filter(part => part !== '');
		setPath(parts.slice(0, -1).join('/'))
	}

	return <div className="bg-shell py-4 overflow-hidden rounded-md">
		<div className="flex justify-between mb-4 px-4">
			<div className="text-xl">{path}</div>
			{isMultiLayer && <div className="text-main hover:text-[#3399FF] cursor-pointer" onClick={back} >cd ..</div>}
		</div>
		<div className="text-main px-6">
			<div className="flex justify-around text-lg mb-2">
				<div className="w-1/2">Name</div>
				<div className="w-1/4">Size</div>
				<div className="w-1/4">Date</div>
			</div>
			{files.map((item, index) => <FileItem key={index} data={item} jump={setPath} />)}
		</div>
	</div>
}


function FileItem(props: { data: fileInfo, jump: Dispatch<SetStateAction<string>> }) {
	const { data, jump } = props
	const router = useRouter()


	const j = () => {
		const index = data.path.indexOf("post");
		const p = data.path.substring(index);
		if (data.isDirectory) {
			jump(p)
		} else {
			router.push(p)
		}
	}

	return <div className="flex justify-between *:py-1 *:odd:bg-[rgba(255,255,255,0.03)] group hover:bg-[rgba(255,255,255,0.15)] transition duration-150 ease-in-out cursor-pointer rounded-sm" onClick={j}>
		<div className="w-1/2 group-hover:text-[#3399FF] ">{data.name}</div>
		<div className="w-1/4">{data.size}</div>
		<div className="w-1/4">{data.date}</div>
	</div>
}
