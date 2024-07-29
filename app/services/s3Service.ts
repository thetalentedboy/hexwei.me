import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT_URL as string,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string
	}
});

const bucketName = process.env.R2_BUCKET_NAME

export function getListObjects(prefix: string): Promise<ListObjectsV2CommandOutput> {
	const command = new ListObjectsV2Command({
		Bucket: bucketName,
		Prefix: prefix,
		Delimiter: '/'
	});

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
