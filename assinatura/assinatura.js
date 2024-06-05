// Função para inicializar a câmera e exibir o vídeo ao vivo
async function initCamera(videoElement, facingMode = 'user') {
    try {
      const constraints = {
        video: {
          facingMode: facingMode
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = stream;
  
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
      alert("Não foi possível acessar a câmera. Por favor, autorize o uso da câmera e recarregue a página.");
    }
}

// Add the page load event to initialize the camera
document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.getElementById('video');
  initCamera(videoElement);
});

  
// Função para girar a câmera
function toggleCamera(videoElement) {
  let facingMode = videoElement.getAttribute('facingMode');
  facingMode = facingMode === 'user' ? 'environment' : 'user';
  videoElement.setAttribute('facingMode', facingMode);
  console.log(`Câmera alternada para: ${facingMode}`);

  // Re-inicializa a câmera com o novo facingMode
  initCamera(videoElement, facingMode);
}

// Adiciona o evento de clique ao botão de alternar câmera
document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.querySelector('video');
  const toggleCameraButton = document.getElementById('toggleCameraButton');
  toggleCameraButton.addEventListener('click', function() {
  toggleCamera(videoElement);
  });
});

// Função para capturar uma foto do vídeo ao vivo e exibi-la
function capturePhoto(videoElement, canvasElement, photoElement) {
const context = canvasElement.getContext('2d');
canvasElement.width = videoElement.videoWidth;
canvasElement.height = videoElement.videoHeight;
context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
const data = canvasElement.toDataURL('image/png');
photoElement.src = data;
photoElement.classList.remove('hidden');
}

// Função para iniciar a comparação facial
async function compareFaces() {
    const photoDocumentElement = document.getElementById('photoDocument');
    const photoSelfieElement = document.getElementById('photoSelfie');
    const comparisonResultElement = document.getElementById('comparisonResult');

    // Carrega as imagens para a API Face API
    const photoDocument = await faceapi.loadImage(photoDocumentElement.src);
    const photoSelfie = await faceapi.loadImage(photoSelfieElement.src);

    // Detecta os rostos nas imagens
    const detectionsDocument = await faceapi.detectAllFaces(photoDocument, {
        returnFaceDescriptors: true
    });
    const detectionsSelfie = await faceapi.detectAllFaces(photoSelfie, {
        returnFaceDescriptors: true
    });

    // Se nenhum rosto foi detectado em uma das imagens, exibe uma mensagem
    if (detectionsDocument.length === 0 || detectionsSelfie.length === 0) {
        comparisonResultElement.textContent = 'Nenhum rosto foi detectado em uma das imagens.';
        return;
    }

    // Extrai os descritores faciais de cada imagem
    const faceDescriptorDocument = detectionsDocument[0].faceDescriptor;
    const faceDescriptorSelfie = detectionsSelfie[0].faceDescriptor;

    // Compara os descritores faciais usando a distância euclidiana
    const distance = faceapi.euclideanDistance(faceDescriptorDocument, faceDescriptorSelfie);
    const threshold = 0.5; // Limite para determinar a similaridade

    // Exibe o resultado da comparação
    if (distance < threshold) {
        comparisonResultElement.textContent = 'Rosto da selfie é similar ao rosto do documento.';
        } else {
        comparisonResultElement.textContent = 'Rosto da selfie não é similar ao rosto do documento.';
    }      
};
