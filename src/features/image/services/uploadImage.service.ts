import { getPresignedUrl, uploadToS3 } from "../api/image.api";

const IMAGE_UPLOAD_MODE = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MODE ?? "s3";

const uploadImageToS3 = async (file: File, directory: string): Promise<string> => {
  const { presignedUrl, fileUrl } = await getPresignedUrl({
    fileName: file.name,
    fileSize: file.size,
    directory,
  });

  await uploadToS3(presignedUrl, file);

  return fileUrl;
};

const uploadImageMock = async (): Promise<string> => {
  return "/mock/product_mock.jpg";
};

export const uploadImage = async (file: File, directory: string): Promise<string> => {
  if (IMAGE_UPLOAD_MODE === "mock") {
    console.info("[mock upload] S3 업로드를 생략하고 mock image URL을 반환합니다.");
    return uploadImageMock();
  }

  return uploadImageToS3(file, directory);
};
