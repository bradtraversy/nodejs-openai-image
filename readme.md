# OpenAI Image Generator

This is a simple image generator built with Node.js and Express that uses [OpenAI's Dall-E models](https://beta.openai.com/docs/guides/images) to generate images.

<img src="public/img/ss.png" width="500">
>>>>>>> 5ad53e3d31e8f5b997e0f3e96a485fcf3d17776d

## Usage

Rename the `example.env` file to `.env`.

Generate an API KEY at [OpenAI](https://beta.openai.com/) and add it to the `.env` file.

Install the dependencies

```bash
npm install
```

Run server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

The endpoint is at `POST http://localhost:5000/openai/generateimage`.
