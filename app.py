from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def compare_faces(image_path1, image_path2):
    img1 = cv2.imread(image_path1)
    img2 = cv2.imread(image_path2)
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    
    orb = cv2.ORB_create()
    kp1, des1 = orb.detectAndCompute(img1, None)
    kp2, des2 = orb.detectAndCompute(img2, None)
    
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(des1, des2)
    
    matches = sorted(matches, key = lambda x:x.distance)
    
    score = sum([match.distance for match in matches]) / len(matches)
    
    return score

@app.route('/')
def index():
    return render_template('/contrato-prata/contrato-prata.html')

@app.route('/assinatura/assinatura.html')
def reconhecimento():
    return render_template('/assinatura/assinatura.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'document' not in request.files or 'selfie' not in request.files:
        return jsonify({'error': 'Faltam arquivos para upload'}), 400

    document = request.files['document']
    selfie = request.files['selfie']
    
    document_filename = secure_filename(document.filename)
    selfie_filename = secure_filename(selfie.filename)
    
    document_path = os.path.join(app.config['UPLOAD_FOLDER'], document_filename)
    selfie_path = os.path.join(app.config['UPLOAD_FOLDER'], selfie_filename)
    
    document.save(document_path)
    selfie.save(selfie_path)
    
    score = compare_faces(document_path, selfie_path)
    
    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
