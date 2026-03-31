import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload photo to Cloudinary
export async function uploadPhoto(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'albums',
  });
  return result.secure_url;
}

// Delete photo from Cloudinary
export async function deletePhotoFromCloudinary(url: string) {
  try {
    // Extract public_id from URL
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split('.')[0]; // Remove extension
    await cloudinary.uploader.destroy(`albums/${publicId}`);
  } catch (err) {
    console.error('Cloudinary delete error:', err);
  }
}
