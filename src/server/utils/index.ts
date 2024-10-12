import * as cloudinary from "cloudinary";
import { Entry } from "../api/routers/entry";

export const generateEntryUniqueKey = (entry: Entry): string => {
  return `${entry.type}:${entry.name.trim().toLowerCase().replace(/\s/g, "-")}`;
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
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const makeImageSpooky = (publicId: string) => {
  const options = {
    effect:
      "gen_background_replace:prompt_a bizarre and super creepy background acording with main object theme-max creativity",
  };

  try {
    const result = cloudinary.v2.image(publicId, { ...options });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
