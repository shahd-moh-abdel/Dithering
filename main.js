/** @type {HTMLCanvasElement} */

const image = new Image();
image.src = "./images/Leonhard_Euler.jpg";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 220;
canvas.height = 284;

image.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function index(x, y) {
    return (y * canvas.width + x) * 4;
  }

  function applyErrorDiffusion(x, y, errR, errG, errB) {
    if (x + 1 < canvas.width) {
      pixels.data[index(x + 1, y)] += (errR * 7) / 16;
      pixels.data[index(x + 1, y) + 1] += (errG * 7) / 16;
      pixels.data[index(x + 1, y) + 2] += (errB * 7) / 16;
    }
    if (x - 1 >= 0 && y + 1 < canvas.height) {
      pixels.data[index(x - 1, y + 1)] += (errR * 3) / 16;
      pixels.data[index(x - 1, y + 1) + 1] += (errG * 3) / 16;
      pixels.data[index(x - 1, y + 1) + 2] += (errB * 3) / 16;
    }
    if (y + 1 < canvas.height) {
      pixels.data[index(x, y + 1)] += (errR * 5) / 16;
      pixels.data[index(x, y + 1) + 1] += (errG * 5) / 16;
      pixels.data[index(x, y + 1) + 2] += (errB * 5) / 16;
    }
    if (x + 1 < canvas.width && y + 1 < canvas.height) {
      pixels.data[index(x + 1, y + 1)] += (errR * 1) / 16;
      pixels.data[index(x + 1, y + 1) + 1] += (errG * 1) / 16;
      pixels.data[index(x + 1, y + 1) + 2] += (errB * 1) / 16;
    }
  }

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const oldRed = pixels.data[index(x, y)];
      const oldGreen = pixels.data[index(x, y) + 1];
      const oldBlue = pixels.data[index(x, y) + 2];

      const factor = 4;

      const newRed = Math.round((factor * oldRed) / 255) * (255 / factor);
      const newGreen = Math.round((factor * oldGreen) / 255) * (255 / factor);
      const newBlue = Math.round((factor * oldBlue) / 255) * (255 / factor);

      const errR = oldRed - newRed;
      const errG = oldGreen - newGreen;
      const errB = oldBlue - newBlue;

      pixels.data[index(x, y)] = newRed;
      pixels.data[index(x, y) + 1] = newGreen;
      pixels.data[index(x, y) + 2] = newBlue;

      applyErrorDiffusion(x, y, errR, errG, errB);
    }
  }

  ctx.putImageData(pixels, 0, 0);
});
