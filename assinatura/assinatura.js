const video = document.getElementById('video');
const selfieVideo = document.getElementById('selfie-video');
const captureDocumentPhotoButton = document.getElementById('capture-document-photo');
const captureSelfieButton = document.getElementById('capture-selfie');
const similarityScoreElement = document.getElementById('similarity-score');

let documentPhoto = null;
let selfiePhoto = null;

// Carregar o modelo FaceAPI
Promise.all([
    faceapi.loadFaceModel('/models'),
    faceapi.loadFaceDetectionModel('/models')
]).then(() => {
    startVideo();
});

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
    });
}

captureDocumentPhotoButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    documentPhoto = canvas.toDataURL('image/jpeg');

    // Esconder a câmera do documento e mostrar a câmera de selfie
    document.getElementById('camera-container').style.display = 'none';
    document.getElementById('selfie-container').style.display = 'block';

    startSelfieVideo();
});

function startSelfieVideo() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        selfieVideo.srcObject = stream;
// Função para inicializar a câmera e exibir o vídeo ao vivo
async function initCamera(videoElement) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
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
    await faceapi.nets.ssdMobilenetv1.loadFromUri('../models/');
    await faceapi.nets.faceLandmark68Net.loadFromUri('../models/');
    await faceapi.nets.faceRecognitionNet.loadFromUri('../models/');

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

    // Inicializa a câmera para a captura do documento
    initCamera(videoDocument);

    // Captura a foto do documento quando o botão é clicado
    captureDocumentButton.addEventListener('click', function() {
        capturePhoto(videoDocument, canvasDocument, photoDocument);
        // Esconde elementos relacionados ao documento e exibe os da selfie
        videoDocument.classList.add('hidden');
        captureDocumentButton.classList.add('hidden');
        instructionsDocument.classList.add('hidden');

        instructionsSelfie.classList.remove('hidden');
        videoSelfie.classList.remove('hidden');
        captureSelfieButton.classList.remove('hidden');
        initCamera(videoSelfie);
    });
}

captureSelfieButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = selfieVideo.videoWidth;
    canvas.height = selfieVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(selfieVideo, 0, 0);
    selfiePhoto = canvas.toDataURL('image/jpeg');

    // Comparar as fotos
    compareFaces();
});

async function compareFaces() {
    const documentFace = await faceapi.detectFaces(documentPhoto);
    const selfieFace = await faceapi.detectFaces(selfiePhoto);

    if (documentFace.length === 0 || selfieFace.length === 0) {
        similarityScoreElement.textContent = 'Nenhum rosto foi detectado em uma ou ambas as fotos.';
        return;
    }

    const [documentDescriptor] = faceapi.faceDescriptors(documentFace[0]);
    const [selfieDescriptor] = faceapi.faceDescriptors(selfieFace[0]);

    const similarity = faceapi.euclideanDistance(documentDescriptor, selfieDescriptor);
    similarityScoreElement.textContent = `Pontuação de similaridade: ${similarity.toFixed(2)}`;
}
