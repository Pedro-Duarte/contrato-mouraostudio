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
