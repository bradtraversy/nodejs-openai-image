import { ImageSize } from "./imageSize";

export interface CreateImageRequestDTO {
  /** The image that should be created */
  prompt: string,
  /** The size of the image */
  size: ImageSize
}

export function isCreateImageRequestDto(object: any): object is CreateImageRequestDTO {
  return typeof object?.prompt === 'string' && (object?.size in ImageSize);
} 