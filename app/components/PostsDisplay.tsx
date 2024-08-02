"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FileInfo } from "../api/post/service"
import { useRouter, useSearchParams } from "next/navigation";
import classnames from "classnames"
import Image from "next/image";
import rightSvg from "../../public/right.svg"
import BarLoader from 'react-spinners/BarLoader'


export default function PostsDisplay() {
	const [directoryMode, setDirectoryMode] = useState(true)
	const [loading, setLoading] = useState(false)

	const checkboxClass = classnames("text-xs flex items-center hover:text-main hover:border-main", {
		active: directoryMode
	})

	const loadingContainerClass = classnames("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-md w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.2)]", {
		"cursor-none block": loading,
		"hidden": !loading
	})

	return <>
		<div className="w-full flex justify-end items-center cursor-pointer p-2 form-group" onClick={() => setDirectoryMode(prev => !prev)}>
			<input className="hidden" type="checkbox" checked={directoryMode} />
			<label className={checkboxClass}>目录查看</label>
		</div>
		<div className="mx-2 relative">
			<div className={loadingContainerClass}>
				<BarLoader
					loading={true}
					color="#fff"
				/>
			</div>
			<div className="bg-shell py-2 sm:py-4 overflow-hidden rounded-md">
				<div className="px-3 sm:px-6 min-h-40 flex flex-col justify-between">
					<div className="flex justify-between text-lg mb-2 text-[#fff]">
						<div className="flex-1">Name</div>
						<div>Size</div>
					</div>
					{directoryMode ? <DirectoryDisplay setLoading={setLoading} /> : <FilesDisplay setLoading={setLoading} />}
				</div>
			</div>
		</div>
	</>
}

interface IPage {
	pageToken: string,
	pageSize: number
}

function FilesDisplay({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
	const [list, setList] = useState<FileInfo[]>([])
	const [page, setPage] = useState<IPage>({ pageToken: "", pageSize: 10 })


	const getNextFiles = async () => {
		try {
			setLoading(true)
			const responce = await fetch(`/api/post?dir=0&page_size=${page.pageSize}&page_token=${page.pageToken}`)
			const { data } = await responce.json()
			setList([...list, ...data.list])
			setPage({ ...page, pageToken: data.page_token });
			setLoading(false)
		} catch (error) { setLoading(false) }
	}

	useEffect(() => {
		getNextFiles()
	}, [])

	return <div>
		{list.map((item, index) => <FileItem key={index} data={item} showPath={true} />)}
		{page.pageToken && <div className="text-xs cursor-pointer hover:text-main mt-4" onClick={getNextFiles}>查看更多...</div>}
	</div>
}


function DirectoryDisplay({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
	const searchParams = useSearchParams()
	const [prefix, setPrefix] = useState(searchParams.get('prefix') ?? "post/")
	const [files, setFiles] = useState<FileInfo[]>([])

	const getPosts = async (p: string) => {
		try {
			setLoading(true)
			const responce = await fetch(`/api/post?prefix=${p}&dir=1`)
			const res = await responce.json()
			setPrefix(p)
			setFiles(res.data)
			setLoading(false)
		} catch (error) { setLoading(false) }
	}

	useEffect(() => {
		getPosts('post/')
	}, [])


	const isMultiLayer = (prefix.split('/').filter((part: string) => part !== '').length > 1)
	return <div className="flex flex-col flex-1 justify-between">
		<div className="min-h-30">
			{files.map((item, index) => <FileItem key={index} data={item} jump={getPosts} showPath={false} />)}
		</div>
		{isMultiLayer && <div className="flex justify-between mt-4">
			<div className="text-xl flex items-center text-main"> <Image src={rightSvg} alt="path icon" className="mr-2" /> {prefix}</div>
			<div className="text-main hover:text-[#3399FF] cursor-pointer" onClick={() => getPosts("post/")} >cd ..</div>
		</div>}
	</div>
}


function FileItem(props: { data: FileInfo, jump?: (p: string) => {}, showPath: boolean }) {
	const { data, jump, showPath } = props
	const router = useRouter()

	const j = () => {
		const index = data.path.indexOf("post");
		const p = data.path.substring(index);

		if (data.isFolder) {
			jump && jump(p)
		} else {
			router.push(p)
		}
	}

	return <div className="flex justify-between *:py-1 odd:bg-[rgba(255,255,255,0.03)] group  transition duration-150 ease-in-out cursor-pointer rounded-sm text-[#fff] opacity-60 hover:opacity-100" onClick={j}>
		<div className="flex-1 group-hover:text-main">{showPath ? data.path : data.name}</div>
		<div className="group-hover:text-main">{data.size}</div>
	</div>
}
