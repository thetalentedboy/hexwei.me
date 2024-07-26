import matter, { GrayMatterFile } from 'gray-matter';
import dayjs from "dayjs";
import { getListObjects, getObjectContent } from "@/app/services/s3Service";
import { _Object, CommonPrefix } from "@aws-sdk/client-s3";


export interface FileInfo {
	name: string
	path: string
	size: number
	isFolder: boolean
	date: string
}

export async function getListFiles(prefix: string): Promise<FileInfo[]> {
	const data = await getListObjects(prefix)
	const { Contents = [], CommonPrefixes = [] } = data

	return mergeContents(Contents, CommonPrefixes)
}


export async function getFileContent(key: string): Promise<GrayMatterFile<string>> {
	const data = await getObjectContent(key)

	return matter(data)
}


/**
 * Merge S3Objects and S3Prefixes into FileInfo array.
 * @param contents Array of S3Objects representing files.
 * @param prefixes Array of S3Prefixes representing folders.
 * @returns Merged array of FileInfo.
 */
function mergeContents(contents: _Object[], prefixes: CommonPrefix[]): FileInfo[] {
	const merged: FileInfo[] = [];

	// Add files (S3Objects) to merged array
	contents.forEach(obj => {
		const fileInfo: FileInfo = {
			name: obj.Key?.split('/').pop() || '',
			path: obj.Key || '',
			size: obj.Size || 0,
			isFolder: false,
			date: dayjs(obj.LastModified).format('YY MM-DD HH:mm') || ''
		};
		merged.push(fileInfo);
	});

	// Add folders (S3Prefixes) to merged array
	prefixes.forEach(prefix => {
		const folderName = prefix.Prefix?.split('/').filter(Boolean).pop() || ''; // Extract last segment as folder name
		const folderInfo: FileInfo = {
			name: folderName,
			path: prefix.Prefix || '',
			size: 0, // Folders typically don't have a size in S3
			isFolder: true,
			date: '' // Folders typically don't have a last modified date in S3
		};
		merged.push(folderInfo);
	});

	return merged;
}
