
export interface IStorageService {
    uploadEventPicture(file: Buffer, fileName: string, mimeType: string): Promise<string>;
  }
  