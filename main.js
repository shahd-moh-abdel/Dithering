/** @type {HTMLCanvasElement} */

const image = new Image();
image.src = "./images/Leonhard_Euler.jpg";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 220;
canvas.height = 284;

image.addEventListener("load", (e) => {
  ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mappedImage = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = [];

    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      let red = pixels.data[index];
      let green = pixels.data[index + 1];
      let blue = pixels.data[index + 2];

      red = Math.round(red / 255) * 255;
      green = Math.round(green / 255) * 255;
      blue = Math.round(blue / 255) * 255;

      const cell = { color: `rgb(${red}, ${green}, ${blue})` };

      row.push(cell);
    }
    mappedImage.push(row);
  }

  for (let y = 0; y < mappedImage.length; y++) {
    for (let x = 0; x < mappedImage[y].length; x++) {
      ctx.fillStyle = mappedImage[y][x].color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
});
