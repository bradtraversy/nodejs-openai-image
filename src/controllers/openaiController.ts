import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { AxiosError } from 'axios';
import { imageSizes, ImageSize } from '../model/imageSize';
import { isCreateImageRequestDto, CreateImageRequestDTO } from '../model/types';
import env from '../config/env';

const configuration = new Configuration({
  apiKey: env.parsed?.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * This controller generates an image based on a given prompt and image size.\
 * \
 * It expects the request body to bein the form of a {@link CreateImageRequestDTO}
 * ***
 * If the image is generated successfully, the response should include a url to the generated image.
 * ***
 * @param req @see {@link Request}
 * @param res @see {@link Response}
 */
export const generateImage = async (req: Request, res: Response) => {
  if (!isCreateImageRequestDto(req.body)) {
    throw new Error("Expected field(s) 'prompt' and 'size' with proper values.")
  }
  const { prompt, size } = req.body;

  const imageSize = imageSizes.get(ImageSize[size] ?? ImageSize.small);

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    } else {
      console.log((error as any)?.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};
