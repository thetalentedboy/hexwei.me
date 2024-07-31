import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput, GetObjectCommand, ListObjectsV2CommandInput } from "@aws-sdk/client-s3";

const client = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT_URL as string,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string
	}
});

const bucketName = process.env.R2_BUCKET_NAME

export enum DirMode {
	Close,
	Open,
}

interface IListsQuery {
	prefix?: string,
	dir?: DirMode,
	page?: IPage
}

export interface IPage {
	pageToken: string,
	pageSize: number
}

export function getListObjects(listQuery: IListsQuery): Promise<ListObjectsV2CommandOutput> {
	const commandOptions: ListObjectsV2CommandInput = {
		Bucket: bucketName
	}
	if (listQuery.dir === DirMode.Open) {
		commandOptions.Prefix = listQuery.prefix
		commandOptions.Delimiter = '/'
	} else {
		commandOptions.MaxKeys = listQuery.page?.pageSize ?? 10
		if (listQuery.page?.pageToken) {
			commandOptions.ContinuationToken = listQuery.page.pageToken
		}
	}

	const command = new ListObjectsV2Command(commandOptions);
	return client.send(command);
}

export async function getObjectContent(key: string): Promise<string> {
	const command = new GetObjectCommand({
		Bucket: 'blog-post',
		Key: key
	});

	try {
		const response = await client.send(command);
		const content = await response.Body?.transformToString()

		return content || ''
	} catch (error) {
		console.error('Error fetching S3 object:', error);
		throw error;
	}
}
