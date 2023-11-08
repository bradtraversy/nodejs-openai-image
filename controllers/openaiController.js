const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: "org-cwXoUoykGBKlTlhHcQJzoYL8",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = async (req, res) => {
  const { userInput, numPrompt, temperature } = req.body;

  // Define the formatInstructions variable based on your responseSchemas 
  const templateString = `
  I need you to become the ultimate prompt-generating machine. 
  Help me create ${numPrompt} prompt associated with the image theme I will provide.
  The prompts are specifically for the OPENAI image generator model DALL·E 3.
  I will provide you the basic information required to make a DALL·E 3 prompt.
  
  When generating the prompts, please keep characteristics like 4K, 8K, 3D rendering,
  photorealistic, photography realistic, hyperrealistic, detailed, highly detailed,
  high resolution, hyper-detailed, HDR, UHD, professional photography, Unreal Engine v5,
  and realistic rendering in mind. You can also include other similar characteristics that match these styles.
  
  You will never alter the prompt structure in any way and obey the following guidelines:
  basic_information, 5 descriptive keywords relevant to the image theme, distance to the subject,
  camera angle, camera type, camera lens type, time of day, style of photograph, type of film, location.
  
  The prompt should contain only the information itself without the instruction.
  For example, the prompt can be.
  "A happy infant playing with toys, colorful, playful, joyful, hyperrealistic, 4K, close-up,
  top-down, DSLR, macro lens, morning, candid, digital, nursery."
  
  The image theme is based on the three answer we got from three question:
  Q1. What imgae do you want to create?
  Q2. The image related to a event?
  Q3. Do you want to feature specific product/s?

  The answer we get are ${userInput}

  return the prompts in JavaScript dictionary style {'prompt1': '...'}
  `

  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo-instruct', // Choose the engine you prefer
      prompt: templateString,
      temperature: temperature,
      max_tokens: 2048,
    });
  
    const prompts = response.data.choices[0].text;    
    console.log(prompts);

    res.status(200).json({
      success: true,
      data: prompts,
    });
  
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The prompts could not be generated',
    });
  }
};

const generateImage = async (req, res) => {
  const { prompt, quality, size } = req.body;

  const imageQuality = 
    quality === 'standard' ? 'standard' : 'hd';

  const imageSize =
    size === '1024x1024' ? '1024x1024' : size === '1024x1792' ? '1024x1792' : '1792x1024';

  try {
    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: imageSize,
      quality: imageQuality
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generatePrompt, generateImage };
