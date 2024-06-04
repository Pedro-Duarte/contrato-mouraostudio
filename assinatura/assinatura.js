// Função para inicializar a câmera e exibir o vídeo ao vivo
async function initCamera(videoElement, facingMode = 'user') {
    try {
        const constraints = {
            video: {
                facingMode: facingMode
            }
        };
        console.log(`Tentando iniciar a câmera com facingMode: ${facingMode}`);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        console.log(`Câmera iniciada com facingMode: ${facingMode}`);
    } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
        alert("Não foi possível acessar a câmera. Por favor, autorize o uso da câmera e recarregue a página.");
    }
}

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

document.addEventListener('DOMContentLoaded', async function() {
    // Carrega os modelos necessários para detecção e reconhecimento facial
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    // Seleção dos elementos do DOM relacionados à captura do documento
    const videoDocument = document.getElementById('video');
    const captureDocumentButton = document.getElementById('captureDocument');
    const canvasDocument = document.getElementById('canvasDocument');
    const photoDocument = document.getElementById('photoDocument');
    const instructionsDocument = document.getElementById('instructions-document');

    // Seleção dos elementos do DOM relacionados à captura da selfie
    const videoSelfie = document.getElementById('videoSelfie');
    const captureSelfieButton = document.getElementById('captureSelfie');
    const canvasSelfie = document.getElementById('canvasSelfie');
    const photoSelfie = document.getElementById('photoSelfie');
    const instructionsSelfie = document.getElementById('instructions-selfie');

    // Botão e elemento de resultado da comparação facial
    const compareFacesButton = document.getElementById('compareFaces');
    const comparisonResult = document.getElementById('comparisonResult');

    // Botão para alternar câmera
    const toggleCameraButton = document.getElementById('toggleCamera');
    let facingMode = 'environment'; // inicialmente usar câmera traseira

    // Inicializa a câmera traseira para a captura do documento
    await initCamera(videoDocument, facingMode);

    // Captura a foto do documento quando o botão é clicado
    captureDocumentButton.addEventListener('click', async function() {
        capturePhoto(videoDocument, canvasDocument, photoDocument);
        // Esconde elementos relacionados ao documento e exibe os da selfie
        videoDocument.classList.add('hidden');
        captureDocumentButton.classList.add('hidden');
        instructionsDocument.classList.add('hidden');

        instructionsSelfie.classList.remove('hidden');
        videoSelfie.classList.remove('hidden');
        captureSelfieButton.classList.remove('hidden');
        toggleCameraButton.classList.remove('hidden');
        await initCamera(videoSelfie, 'user');
    });

    // Captura a selfie quando o botão é clicado
    captureSelfieButton.addEventListener('click', function() {
        capturePhoto(videoSelfie, canvasSelfie, photoSelfie);
        // Esconde elementos relacionados à selfie e exibe o botão de comparação
        videoSelfie.classList.add('hidden');
        captureSelfieButton.classList.add('hidden');
        toggleCameraButton.classList.add('hidden');
        instructionsSelfie.classList.add('hidden');

        compareFacesButton.classList.remove('hidden');
    });

    // Alternar entre a câmera frontal e traseira
    toggleCameraButton.addEventListener('click', async function() {
        facingMode = facingMode === 'user' ? 'environment' : 'user';
        console.log(`Alternando para câmera: ${facingMode}`);
        await initCamera(videoSelfie, facingMode);
    });

    // Compara os rostos das fotos capturadas
    compareFacesButton.addEventListener('click', async function() {
        // Converte as fotos capturadas em objetos de imagem
        const documentImage = await faceapi.bufferToImage(canvasDocument.toDataURL('image/png'));
        const selfieImage = await faceapi.bufferToImage(canvasSelfie.toDataURL('image/png'));

        // Detecta rostos nas imagens capturadas
        const documentDetections = await faceapi.detectAllFaces(documentImage).withFaceLandmarks().withFaceDescriptors();
        const selfieDetections = await faceapi.detectAllFaces(selfieImage).withFaceLandmarks().withFaceDescriptors();

        // Verifica se rostos foram detectados em ambas as imagens
        if (documentDetections.length > 0 && selfieDetections.length > 0) {
            // Compara os descritores faciais das imagens capturadas
            const faceMatcher = new faceapi.FaceMatcher(documentDetections);
            const bestMatch = faceMatcher.findBestMatch(selfieDetections[0].descriptor);

            // Exibe o resultado da comparação
            comparisonResult.textContent = bestMatch.toString();
        } else {
            comparisonResult.textContent = 'Não foi possível detectar rostos em uma ou ambas as imagens.';
        }
    });
});
