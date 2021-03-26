let faces;

function setup() {
  createCanvas(900, 900);
  createButton('Generate Faces').mousePressed(generateFaces);
}

function generateFaces() {
  // httpPost(path, [datatype], [data], [callback], [errorCallback])
  const z = [];
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
  }
  const path = 'http://localhost:8000/query';
  const data = {
    z: z,
    truncation: 0.8
  };
  httpPost(path, 'json', data, gotImage, gotError);
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  faces = createImg(result.image);
  faces.hide();
}

function draw() {
  background(220);
  if (faces) {
    image(faces, 0, 0);
  }
}