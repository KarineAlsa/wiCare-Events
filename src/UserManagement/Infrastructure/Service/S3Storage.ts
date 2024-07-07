import axios from 'axios';
import { IStorageService } from '../../Domain/Service/IStorageService';

export class S3StorageService implements IStorageService{
  private bucketName: string;
  private folderName: string;

  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME as string;
    this.folderName = process.env.S3_FOLDER as string;
  }

  async uploadEventPicture(file: Buffer, fileName: string, mimeType: string): Promise<string> {
    const s3Url = `https://${this.bucketName}.s3.amazonaws.com/${this.folderName}/${fileName}`;

    try {
      await axios.put(s3Url, file, {
        headers: {
          'Content-Type': mimeType,
          'x-amz-acl': 'public-read',
        },
      });

      return s3Url;
    } catch (error:any) {
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  async deleteProfilePicture(url: string): Promise<boolean> {
    const s3Url = url;

    try {
      await axios.delete(s3Url, {
        headers: {
          'x-amz-acl': 'public-read',
        },
      });
      return true
    } catch (error: any) {
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  
}
