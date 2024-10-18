import * as cloudinary from "cloudinary";
import { type Entry } from "../api/routers/entry";

export const generateEntryUniqueKey = (entry: Entry): string => {
  return `${entry.type}:${entry.name.trim().toLowerCase().replace(/\s/g, "-")}:${entry.number || 1}`;
};

export const uploadImage = async (
  imagePath: string,
): Promise<string | unknown> => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.v2.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const makeImageSpooky = (publicId: string, number?: number) => {
  const options: Record<string, string> = {};

  if (number === 2) {
    options.effect =
      "gen_recolor:prompt_main_object_or_motive_on_image;to-color_green";
  } else {
    options.effect =
      "gen_background_replace:prompt_a bizarre and super creepy background acording with main object theme-max creativity";
  }

  try {
    const result = cloudinary.v2.image(publicId, { ...options });
    return result;
  } catch (error) {
    console.error(error);
  }
};
