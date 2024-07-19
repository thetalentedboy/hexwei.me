import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import matter, { GrayMatterFile } from 'gray-matter';


export function readYaml<T>(path: string) {
	try {
		return yaml.load(fs.readFileSync(path, 'utf8')) as T;
	} catch (e) {
		console.error('Failed to read or parse the YAML file:', e);
	}
}

export function testFileAccess(directory: string) {
	const p = path.resolve(directory)
	try {
		fs.accessSync(p, fs.constants.F_OK | fs.constants.R_OK)
		return true
	} catch (error) {
		return false
	}
}

export interface fileInfo {
	name: string
	path: string
	size: number
	isDirectory: boolean
	date: string
}


export function getAllFilesAttr(directory: string): Promise<fileInfo[] | []> {
	const p = path.resolve(directory)
	return new Promise((resolve, reject) => {
		fs.readdir(p, (err, files) => {
			if (err) {
				reject(err);
				return;
			}
			const filesInfo: fileInfo[] = [];

			files.forEach(file => {
				const filePath = path.join(directory, file);
				fs.lstat(filePath, (err, stats) => {
					if (err) {
						reject(err);
						return;
					}

					filesInfo.push({
						name: file,
						path: filePath,
						size: stats.size,
						isDirectory: stats.isDirectory(),
						date: stats.mtime.toISOString(),
					});

					if (filesInfo.length === files.length) {
						resolve(filesInfo);
					}
				});
			});
		});
	});
}



export function getFileContent(directory: string): Promise<GrayMatterFile<string>> {

	return new Promise((resolve, reject) => {
		fs.readFile(decodeURIComponent(directory), 'utf8', (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(matter(data));
		});
	});
}
