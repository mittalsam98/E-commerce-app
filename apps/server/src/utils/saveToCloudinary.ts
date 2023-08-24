import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import { IImages } from 'shared-types/index';

export const saveToCloudinary = async (
  photos: UploadedFile | UploadedFile[],
  options: UploadApiOptions
): Promise<IImages[]> => {
  const imgsArray: IImages[] = [];
  if (Array.isArray(photos)) {
    await Promise.all(
      photos.map(async (photo) => {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
          photo.tempFilePath,
          options
        );
        imgsArray.push({
          id: public_id,
          imgUrl: secure_url
        });
      })
    );

    return imgsArray;
  }

  // Save single photo
  const { public_id, secure_url } = await cloudinary.uploader.upload(photos.tempFilePath, options);

  imgsArray.push({
    id: public_id,
    imgUrl: secure_url
  });

  return imgsArray;
};

export default saveToCloudinary;
