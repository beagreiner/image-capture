const scanner = new jscanify();
const canvasCtx = canvas.getContext("2d");
const resultCtx = result.getContext("2d");
const test = document.querySelector('video');
const paperWidth = 2480;
const paperHeight = 3508;
const texSize =  1024;
let resultCanvas; 
let resultImage;

navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {

  video.srcObject = stream;
  
  video.onloadedmetadata = () => {
    video.play();
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    result.width = video.videoWidth;
    result.height = video.videoHeight;

    setInterval(() => {
      canvasCtx.drawImage(video, 0, 0);
      resultCanvas = scanner.highlightPaper(canvas, {thickness: 2});
      resultCtx.drawImage(resultCanvas, 0, 0);
      
    }, 250);
   
  };
});

document.querySelector('.btn-camera').addEventListener('click', function () {
  
  //extract + append canvas with scanned document
  resultImage = scanner.extractPaper(resultCanvas, paperWidth, paperHeight);
  document.body.appendChild(resultImage);

  //crop specific areas from scanned document
  const tex1 = document.createElement('canvas');
  tex1.setAttribute('id', 'tex1');
  tex1.width = texSize;
  tex1.height = texSize;
  const tex1ctx = tex1.getContext('2d');
  tex1ctx.drawImage(resultImage,
                    472, 160, //start point x, y in source canvas
                    1536, 1536, //width, height of cropped area in  in source canvas
                    0, 0, //start point x, y in target canvas
                    1024, 1024); //width, height of image in target canvas
  var tex1Img = document.createElement('img');
  tex1Img.src = tex1.toDataURL('image/jpg');
  document.body.appendChild(tex1Img);   
  
  const tex2 = document.createElement('canvas');
  tex2.setAttribute('id', 'tex2');
  tex2.width = texSize;
  tex2.height = texSize;
  const tex2ctx = tex2.getContext('2d');
  tex2ctx.drawImage(resultImage,
                    472, 1812,
                    1536, 1536,
                    0, 0,
                    1024, 1024);
  var tex2Img = document.createElement('img');
  tex2Img.src = tex2.toDataURL('image/jpg');
  document.body.appendChild(tex2Img);   
});
