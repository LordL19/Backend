import { Storage } from "@google-cloud/storage";
import { UploadDto } from "../../domain";

interface Props {
    bucket: string,
    key: Object
}

export class StorageService {
    private storage: Storage;
    private readonly bucket: string;
    constructor(props: Props) {
        this.bucket = props.bucket;
        this.storage = new Storage({
            credentials: props.key
        });
    }

    async generateUrlToUpload(fileUpload: UploadDto) {
        const { file } = fileUpload;
        const [url] = await this.storage.bucket(this.bucket).file(`${file.folder ? `${file.folder}/${file.name}` : file.name}`).getSignedUrl({
            version: "v4",
            action: "write",
            contentType: file.type,
            expires: Date.now() + 10 * 60 * 1000
        });
        return { url };

    }

    async uploadFile(fileUpload: UploadDto) {
        const { file } = fileUpload;
        const [img] = await this.storage.bucket(this.bucket).upload(file.path, {
            destination: `${file.folder ? `${file.folder}/${file.name}` : file.name}`
        });
        ;
        return img;
    }
}