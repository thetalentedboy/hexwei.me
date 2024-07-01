"use client"
import { Dispatch, SetStateAction, useEffect, useInsertionEffect, useState } from "react";
import { fileInfo } from "./api/post/[[...slug]]/utils"
import classname from "classnames"
import { useRouter } from "next/navigation";

interface Props {
	data: fileInfo[]
}

export default function FileDisplay(props: Props) {
	const { data } = props;
	const [files, setFiles] = useState<fileInfo[]>(data)
	const [path, setPath] = useState("post/")

	useEffect(() => {
		console.log(111);

		async function fetchData() {
			const responce = await fetch(`/api/${path}`)
			const res = await responce.json()
			setFiles(res.data)
		}
		fetchData()
	}, [path])

	const isMultiLayer = path.split('/').filter(part => part !== '').length > 1

	const back = () => {
		const parts = path.split('/').filter(part => part !== '');
		setPath(parts.slice(0, -1).join('/'))
	}

	return <div className="bg-shell py-4">
		<div className="flex justify-between">
			<div className="text-xl">{path}</div>
			{isMultiLayer && <div className="text-main hover:text-[#3399FF] cursor-pointer" onClick={back} >cd ..</div>}
		</div>
		<div className="text-main">
			<div className="flex justify-around text-lg mb-2 px-4">
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
		if (data.isDirectory) {
			jump(data.path)
		} else {
			router.push(data.path)
		}
	}

	return <div className="flex justify-between  *:pl-2 *:py-1 *:odd:bg-opacity-10 *:odd:bg-[#fff]" onClick={j}>
		<div className="w-1/2 !pl-6 hover:text-[#3399FF] cursor-pointer">{data.name}</div>
		<div className="w-1/4">{data.size} {data.path}</div>
		<div className="w-1/4">{data.date}</div>
	</div>
}
