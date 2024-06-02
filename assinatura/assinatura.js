async function initCamera(videoElement) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
    } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
        alert("Não foi possível acessar a câmera. Por favor, autorize o uso da câmera e recarregue a página.");
    }
}

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
    const videoDocument = document.getElementById('video');
    const captureDocumentButton = document.getElementById('captureDocument');
    const canvasDocument = document.getElementById('canvasDocument');
    const photoDocument = document.getElementById('photoDocument');
    const instructionsDocument = document.getElementById('instructions-document');

    const videoSelfie = document.getElementById('videoSelfie');
    const captureSelfieButton = document.getElementById('captureSelfie');
    const canvasSelfie = document.getElementById('canvasSelfie');
    const photoSelfie = document.getElementById('photoSelfie');
    const instructionsSelfie = document.getElementById('instructions-selfie');

    const compareFacesButton = document.getElementById('compareFaces');
    const comparisonResult = document.getElementById('comparisonResult');

    await initCamera(videoDocument);

    captureDocumentButton.addEventListener('click', function() {
        capturePhoto(videoDocument, canvasDocument, photoDocument);
        videoDocument.classList.add('hidden');
        captureDocumentButton.classList.add('hidden');
        instructionsDocument.classList.add('hidden');

        instructionsSelfie.classList.remove('hidden');
        videoSelfie.classList.remove('hidden');
        captureSelfieButton.classList.remove('hidden');
        initCamera(videoSelfie);
    });

    captureSelfieButton.addEventListener('click', function() {
        capturePhoto(videoSelfie, canvasSelfie, photoSelfie);
        videoSelfie.classList.add('hidden');
        captureSelfieButton.classList.add('hidden');
        instructionsSelfie.classList.add('hidden');

        compareFacesButton.classList.remove('hidden');
    });

    compareFacesButton.addEventListener('click', async function() {
        const documentBlob = dataURItoBlob(canvasDocument.toDataURL('image/png'));
        const selfieBlob = dataURItoBlob(canvasSelfie.toDataURL('image/png'));

        const formData = new FormData();
        formData.append('document', documentBlob, 'document.png');
        formData.append('selfie', selfieBlob, 'selfie.png');

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        comparisonResult.textContent = result.score ? `Score: ${result.score}` : 'Erro na comparação';
    });
});

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
