// 🌍 Weather and interactivity
let weatherCondition = 'loading';
let flowers = [];

function setup() {
  createCanvas(windowWidth, 300);
  angleMode(DEGREES);
  noLoop();

  // ✅ Open-Meteo API – real-time weather for London
  let url = 'https://api.open-meteo.com/v1/forecast?latitude=35.8997&longitude=14.5146&current_weather=true';
  loadJSON(url, gotWeather);
}

// 🔄 Parse weather code from Open-Meteo
function gotWeather(data) {
  if (data && data.current_weather) {
    const code = data.current_weather.weathercode;
    console.log("Weather code:", code);

    // Map Open-Meteo weather codes to readable conditions
    if ([0].includes(code)) weatherCondition = 'clear';
    else if ([1, 2, 3].includes(code)) weatherCondition = 'cloudy';
    else if ([45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) weatherCondition = 'rain';
    else weatherCondition = 'unknown';
  } else {
    weatherCondition = 'unknown';
  }
  redraw(); // Re-render after weather loads
}

function draw() {
  setBackgroundFromWeather();

  // 🌳 Draw tree using Recursion and Fractals
  push();
  translate(width / 2, height);
  drawFractalTreeRecursive(80, 25, 2); // initial length, angle, thickness
  pop();

  drawFlowers();

  // Label the weather
  fill(0);
  textSize(14);
  textAlign(RIGHT, TOP);
  text("Weather in Malta: " + weatherCondition, width - 10, 10);
}

// 🌿 Recursion and Fractals: Draws a tree with self-similar recursive branches
function drawFractalTreeRecursive(len, angle, thick) {
  stroke(80, 42, 42);
  strokeWeight(thick);
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 10) {
    let reducedAngle = angle * 0.8;

    // Recursive right branch
    push();
    rotate(reducedAngle);
    drawFractalTreeRecursive(len * 0.67, reducedAngle, thick * 0.67);
    pop();

    // Recursive left branch
    push();
    rotate(-reducedAngle);
    drawFractalTreeRecursive(len * 0.67, reducedAngle, thick * 0.67);
    pop();
  }
}

// 🖱️ Plant a flower where clicked
function mousePressed() {
  if (mouseY <= height) {
    flowers.push({
      x: mouseX,
      y: mouseY,
      size: random(10, 20),
      color: color(random(255), random(100, 255), random(255))
    });
    redraw();
  }
}

// 🌸 Draw all planted flowers
function drawFlowers() {
  noStroke();
  for (let f of flowers) {
    fill(f.color);
    ellipse(f.x, f.y, f.size);
  }
}

// 🎨 Set background color based on weather condition
function setBackgroundFromWeather() {
  if (weatherCondition === 'clear') {
    background(135, 206, 250); // Sunny
  } else if (weatherCondition === 'cloudy') {
    background(180); // Cloudy gray
  } else if (weatherCondition === 'rain') {
    background(100, 100, 255); // Rainy
  } else {
    background(220); // Default fallback
  }
}
