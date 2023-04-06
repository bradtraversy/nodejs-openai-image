function onSubmit(e) {
  e.preventDefault();

  // document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';
  document.querySelector('#image1').src = '';
  document.querySelector('#image2').src = '';
  document.querySelector('#image3').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
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
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log(data);
    // console.log(data[0].data);

    const imageUrl = data.data[0];
    const imageUrl1 = data.data[1];
    const imageUrl2 = data.data[2];
    const imageUrl3 = data.data[3];
    // console.log(imageUrl)

    document.querySelector('#image').src = imageUrl;
    document.querySelector('#image1').src = imageUrl1;
    document.querySelector('#image2').src = imageUrl2;
    document.querySelector('#image3').src = imageUrl3;

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