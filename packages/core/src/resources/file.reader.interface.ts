export interface IFileReader<FileType> {
  read(filePath: string): Promise<FileType>;
}
