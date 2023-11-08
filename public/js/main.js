async function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const input1 = document.querySelector('#input1').value;
  const input2 = document.querySelector('#input2').value;
  const input3 = document.querySelector('#input3').value;
  const quality = document.querySelector('#quality').value;
  const size = document.querySelector('#size').value;
  
  // input check
  if (input1 === '' || input2 === '' || input3 === '') {
    alert('Please add some text');
    return;
  }
  const userInput = `answer 1: ${input1}, answer 2: ${input2}, answer 3: ${input3}`;
  console.log('userInput');
  console.log(userInput);

  const prompts = await generatePromptRequest(userInput, 6, 0.2);
  for (const key in prompts) {
    const prompt = prompts[key];
    console.log(`Key: ${key}, Value: ${prompt}`);
    await generateImageRequest(prompt, size, quality);
  }
}

async function generatePromptRequest(userInput, numPrompt, temperature) {
  try {
    showSpinner();
    
    const response = await fetch('/openai/generateprompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        numPrompt, 
        temperature
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('Fail to generate prompt');
    }
    removeSpinner();
    const result = await response.json();
    return result;
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

async function generateImageRequest(prompt, size, quality) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        quality,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
