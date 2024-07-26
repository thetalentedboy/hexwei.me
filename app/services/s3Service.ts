import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
	region: 'auto',
	endpoint: 'https://29b331d4c3cf43153a22cc85b588bda0.r2.cloudflarestorage.com',
	credentials: {
		accessKeyId: '513e53f4c77e553f5f7ba06cb90e93cc',
		secretAccessKey: 'fa0be93ba606ef994c8078f092e8c0396662bb9ba5a98a2aa034a7ff50be4d1f'
	}
});

export function getListObjects(prefix: string): Promise<ListObjectsV2CommandOutput> {
	const command = new ListObjectsV2Command({
		Bucket: "blog-post",
		Prefix: prefix,
		Delimiter: '/'
	});

	return client.send(command);
}

export async function getObjectContent(key: string): Promise<string> {
	console.log(key, 'key11111111111');

	const command = new GetObjectCommand({
		Bucket: 'blog-post',
		Key: key
	});

	try {
		const response = await client.send(command);
		const body = await readableStreamToString(response.Body as ReadableStream<Uint8Array>);
		return body;
	} catch (error) {
		console.error('Error fetching S3 object:', error);
		throw error;
	}
}

// Helper function to convert ReadableStream to string
async function readableStreamToString(readable: ReadableStream<Uint8Array>): Promise<string> {
	const reader = readable.getReader();
	let result = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		result += new TextDecoder('utf-8').decode(value);
	}
	return result;
}
