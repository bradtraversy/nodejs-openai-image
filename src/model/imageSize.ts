import { CreateImageRequestSizeEnum } from "openai";

export enum ImageSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export const imageSizes = new Map<ImageSize, CreateImageRequestSizeEnum>([
  [ImageSize.small, '256x256'],
  [ImageSize.medium, '512x512'],
  [ImageSize.large, '1024x1024'],
]);