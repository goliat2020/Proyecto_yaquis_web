let poem;
let people;
let showTranslation = false;
let personImages = [];

function preload() {
  poem = loadJSON('https://raw.githubusercontent.com/goliat2020/Proyecto_yaquis_web/main/jsons/poem.json');
}

function setup() {
  createCanvas(windowWidth, 1200);
  textAlign(CENTER, TOP);
  textSize(20);

  loadJSON(
    'https://raw.githubusercontent.com/goliat2020/Proyecto_yaquis_web/main/jsons/people.json',
    (data) => {
      people = data;
      let ppl = Array.isArray(people) ? people : Object.values(people);
      // Load all images
      for (let i = 0; i < ppl.length; i++) {
        personImages[i] = loadImage(ppl[i].image, () => {
          redraw();
        });
      }
      redraw();
    }
  );
}

function draw() {
  background(245);
  fill(20);

  textAlign(CENTER, TOP);
  let p = showTranslation ? poem[1] : poem[0];
  textSize(18);
  text(p.language, width / 2, 40);

  textSize(22);
  let lines = p.text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, 80 + i * 28);
  }

  let startY = 80 + lines.length * 28 + 60;
  fill(60);
  textSize(16);
  text('Haz click en una persona para saber más', width / 2, startY - 30);

  let ppl = Array.isArray(people) ? people : Object.values(people);
  let imgSize = 150;
  let gap = imgSize + 40;

  for (let i = 0; i < ppl.length; i++) {
    let x = 100;
    let y = startY + i * gap;

    if (personImages[i]) {
      imageMode(CENTER);
      image(personImages[i], x, y + imgSize / 2, imgSize, imgSize);
    }

    textAlign(LEFT, TOP);
    fill(0);
    textSize(18);
    text(ppl[i].name, x + imgSize + 20, y);

    textSize(14);
    fill(60);
    text(ppl[i].years, x + imgSize + 20, y + 24);

    fill(30);
    textSize(14);
    let descX = x + imgSize + 20;
    let descY = y + 44;
    let boxW = width - (x + imgSize + 40);
    textAlign(LEFT, TOP);
    text(ppl[i].description, descX, descY, boxW);
  }

}

function mousePressed() {
  let p = showTranslation ? poem[1] : poem[0];
  let lines = p.text.split('\n');
  let poemHeight = lines.length * 28;
  let peopleStartY = 80 + poemHeight + 60;

  let ppl = Array.isArray(people) ? people : Object.values(people);
  let imgSize = 150;
  let gap = imgSize + 40;

  for (let i = 0; i < ppl.length; i++) {
    let y = peopleStartY + i * gap;
    if (mouseY > y && mouseY < y + imgSize) {
      window.open(ppl[i].link, '_blank');
      return;
    }
  }

  if (mouseY < peopleStartY - 40) {
    showTranslation = !showTranslation;
    redraw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
