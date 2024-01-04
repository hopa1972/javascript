// Get the canvas element
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store the stars
const stars = [];

// Function to generate random values within a range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to initialize the stars
function initializeStars() {
  for (let i = 0; i < 500; i++) {
    const x = canvas.width / 2; // Start from the center
    const y = canvas.height / 2; // Start from the center
    const thickness = randomRange(1, 2);
    const angle = randomRange(0, 2 * Math.PI);
    const speed = randomRange(.2, 1.5) * (1 + Math.abs(Math.sqrt(x * x + y * y) / 1000));

    stars.push({
      x,
      y,
      thickness,
      angle,
      speed
    });
  }
}

// Function to update the stars' positions
function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    // Calculate the distance from the center
    const distance = Math.sqrt((star.x - canvas.width / 2) ** 2 + (star.y - canvas.height / 2) ** 2);

    // Calculate the new position based on the angle and speed
    star.x += Math.cos(star.angle) * star.speed * (1 + distance / 100);
    star.y += Math.sin(star.angle) * star.speed * (1 + distance / 100);

    // If the star is out of the canvas, reset its position to the center
    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = canvas.width / 2;
      star.y = canvas.height / 2;
    }
  }
}


// Function to draw the stars on the canvas
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    // Calculate the brightness based on the distance from the center
    const distance = Math.sqrt((star.x - canvas.width / 2) ** 2 + (star.y - canvas.height / 2) ** 2);
    const brightness = 3 * distance / Math.max(canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.thickness, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.fill();
  }
}

// Function to animate the starfield effect
function animate() {
  updateStars();
  drawStars();

  requestAnimationFrame(animate);
}

// Get the text element
const text = document.querySelector('.text');

// Function to update the rotation of the text
function updateRotation() {
  const rotationX = Math.sin(Date.now() / 1000) * 60; // Rotate around X axis
  const rotationY = Math.cos(Date.now() / 1000) * 40; // Rotate around Y axis

  text.style.transform = `perspective(500px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  requestAnimationFrame(updateRotation);
}

// Start updating the rotation
updateRotation();

// Initialize the stars and start the animation
initializeStars();
animate();
