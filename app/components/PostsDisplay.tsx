"use client"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FileInfo } from "../api/post/service"
import { useUpdateEffect } from "../hooks";
import { useRouter, useSearchParams } from "next/navigation";



export default function PostsDisplay() {
	const [directoryMode, setDirectoryMode] = useState(true)

	return <>
		<div className="w-full flex justify-end items-center cursor-pointer" onClick={() => setDirectoryMode(prev => !prev)}>
			<input type="checkbox" checked={directoryMode} />
			<span className="text-xs pl-2">View prefixes as directories</span>
		</div>
		<div className="bg-shell py-4 overflow-hidden rounded-md">
			<div className="px-6">
				<div className="flex justify-around text-lg mb-2 text-main">
					<div className="w-1/2">Name</div>
					<div className="w-1/4">Size</div>
					<div className="w-1/4">Date</div>
				</div>
				{directoryMode ? <DirectoryDisplay /> : <FilesDisplay />}
			</div>
		</div>
	</>
}

interface IPage {
	pageToken: string,
	pageSize: number
}

function FilesDisplay() {
	const [list, setList] = useState<FileInfo[]>([])
	const [page, setPage] = useState<IPage>({ pageToken: "", pageSize: 10 })


	const getNextFiles = async () => {
		const responce = await fetch(`/api/post?dir=0&page_size=${page.pageSize}&page_token=${page.pageToken}`)
		const { data } = await responce.json()
		setList([...list, ...data.list])
		setPage({ ...page, pageToken: data.page_token });
	}

	useEffect(() => {
		getNextFiles()
	}, [])

	return <div>
		{list.map((item, index) => <FileItem key={index} data={item} jump={() => { }} />)}
		{page.pageToken ? <div onClick={getNextFiles}>查看更多</div> : <div>已经到底了</div>}
	</div>
}


function DirectoryDisplay() {
	const searchParams = useSearchParams()
	const [prefix, setPrefix] = useState(searchParams.get('prefix') ?? "post/")
	const [files, setFiles] = useState<FileInfo[]>([])

	useEffect(() => {
		async function fetchData() {
			const responce = await fetch(`/api/post?prefix=${prefix}&dir=1`)
			const res = await responce.json()
			setFiles(res.data)
		}
		fetchData()
	}, [prefix])

	const isMultiLayer = prefix.split('/').filter((part: string) => part !== '').length > 1
	return <>
		{files.map((item, index) => <FileItem key={index} data={item} jump={setPrefix} />)}
		<div className="flex justify-between mt-4">
			<div className="text-xl">{prefix}</div>
			{isMultiLayer && <div className="text-main hover:text-[#3399FF] cursor-pointer" onClick={() => setPrefix("post/")} >cd ..</div>}
		</div>
	</>
}


function FileItem(props: { data: FileInfo, jump: Dispatch<SetStateAction<string>> }) {
	const { data, jump } = props
	const router = useRouter()

	const j = () => {
		const index = data.path.indexOf("post");
		const p = data.path.substring(index);

		if (data.isFolder) {
			jump(p)
		} else {
			router.push(p)
		}
	}

	return <div className="flex justify-between *:py-1 *:odd:bg-[rgba(255,255,255,0.03)] group hover:bg-[rgba(255,255,255,0.15)] transition duration-150 ease-in-out cursor-pointer rounded-sm text-main" onClick={j}>
		<div className="w-1/2 group-hover:text-[#3399FF] ">{data.name}</div>
		<div className="w-1/4">{data.size}</div>
		<div className="w-1/4">{data.date}</div>
	</div>
}
