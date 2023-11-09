from urllib.parse import urlparse
import warnings
from django.shortcuts import render

from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import concurrent.futures

from rest_framework.response import Response
from rest_framework.decorators import api_view

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

import webhdfs
from hdfs import InsecureClient

import json

import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model


config = {
    "apiKey": "AIzaSyAf4h3WS_PJIY_Q-C_3a1JLlk6YKiD8-yw",
    "authDomain": "my-project-1-666a4.firebaseapp.com",
    "projectId": "my-project-1-666a4",
    "storageBucket": "my-project-1-666a4.appspot.com",
    "messagingSenderId": "576412656365",
    "appId": "1:576412656365:web:6a1935b3482dcb61a0a2e4",
    "measurementId": "G-08HCHNFWXM"
}

firebase_admin.initialize_app(credentials.Certificate(
    r'D:\Workspace\RP317\Vigilance360-Server\server1\crawler\vigilance360-firebase.json'))

db = firestore.client()


def predict_category_lstm(example_text):
    loaded_lstm_model = load_model(
        'D:\\Workspace\RP317\\Vigilance360-Server\\server1\\crawler\\api\\lstm_model.h5')

    # Preprocess the example text
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts([example_text])
    example_text_sequence = tokenizer.texts_to_sequences([example_text])
    max_len = 100  # Adjust as needed
    example_text_padded = pad_sequences(example_text_sequence, maxlen=max_len)

    # Make predictions
    predictions = loaded_lstm_model.predict(example_text_padded)

    # Decode predictions back to labels
    predicted_labels = np.argmax(predictions, axis=1)

    # Map labels back to their original categories
    categories = ['hardware', 'software', 'os']
    predicted_category = categories[predicted_labels[0]]

    return predicted_category


def extract_features(article, category):
    api_key = "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"
    url = "https://api.openai.com/v1/engines/text-davinci-003/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    prompt = f"""Extract the following information from the given article
    :Category: ( article about Os, Hardware, Sofware or both) 
    Name: should be company + product), 
    if Category = os / software: version,
    if Category = hardware: model number, 
    Threat Level: (High Risk or Low Risk), 
    Components Affected:
    Overview, 
    Description, 
    Impact, 
    Solution,
    Version,
    Reference,
    Disclaimer
    .Details of the Article : {article}"""

    data = {
        "prompt": prompt,
        "max_tokens": 200
    }

    response = requests.post(url, json=data, headers=headers)
    response_json = response.json()

    if "choices" in response_json and len(response_json["choices"]) > 0:
        extracted_data = response_json["choices"][0]["text"]

        result = {"name": "", "threatLevel": "", "affected": "", "overview": "",
                  "description": "", "impact": "", "solution": "", "version": "", "model": "", "reference": "", "disclaimer": ""}

        lines = extracted_data.split('\n')
        for line in lines:
            if line.startswith("Name: "):
                result["name"] = line.replace("Name: ", "")
            elif line.startswith("Threat Level: "):
                result["threatLevel"] = line.replace("Threat Level: ", "")
            elif line.startswith("Components Affected: "):
                result["affected"] = line.replace(
                    "Components Affected: ", "")
            elif line.startswith("Overview: "):
                result["overview"] = line.replace("Overview: ", "")
            elif line.startswith("Reference: "):
                result["reference"] = line.replace("Reference: ", "")
            elif line.startswith("Disclaimer: "):
                result["disclaimer"] = line.replace("Disclaimer: ", "")
            elif line.startswith("Description: "):
                result["description"] = line.replace("Description: ", "")
            elif line.startswith("Impact: "):
                result["impact"] = line.replace("Impact: ", "")
            elif line.startswith("Solution: "):
                result["solution"] = line.replace("Solution: ", "")
            elif category == "os" or category == "software":
                if line.startswith("Version: "):
                    result["version"] = line.replace("Version: ", "")
            elif category == "hardware":
                if line.startswith("Model: "):
                    result["model"] = line.replace("Model: ", "")
        return result

    else:
        return "Extraction failed."


__all__ = ["extract_features"]


def crawl_page():
    warnings.filterwarnings("ignore", category=UserWarning)
    docs = db.collection('urls').get()
    paragraphs = []
    oses = []
    softwares = []
    hardwares = []
    links = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for doc in docs:
            document = doc.to_dict()
            url = document['url']
            paragraph = get_paragraphs(url)
            osThreat = getOsThreat(paragraph)
            softwareThreat = getSoftwareThreat(paragraph)
            hardwareThreat = getHardwareThreat(paragraphs)
            if (osThreat != ''):
                oses.append(osThreat)
            if (softwareThreat != ''):
                softwares.append(softwareThreat)
            if (hardwareThreat != ''):
                hardwares.append(hardwareThreat)
    return oses, softwares, hardwares


def get_paragraphs(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all paragraph elements
        paragraphs = [p.get_text() for p in soup.find_all('p')]
        return paragraphs
    else:
        return []


def getOsThreat(paragraphs):
    category = predict_category_lstm(paragraphs)
    if category == 'os':
        print(category)
        return extract_features(paragraphs, category)
    else:
        return ''


def getSoftwareThreat(paragraphs):
    category = predict_category_lstm(paragraphs)
    if category == 'software':
        print(category)
        return extract_features(paragraphs, category)
    else:
        return ''


def getHardwareThreat(paragraphs):
    category = predict_category_lstm(paragraphs)
    if category == 'hardware':
        print(category)
        return extract_features(paragraphs, category)
    else:
        return ''


def sendDataToHadoop(request):
    oses, softwares, hardwares = crawl_page()
    print(oses)
    print(softwares)
    print(hardwares)
    softwareThreat = softwares
    hardwareThreat = hardwares
    osThreat = oses
    # Convert the list to JSON string
    softwareThreatContent = json.dumps(softwareThreat)
    hardwareThreatContent = json.dumps(hardwareThreat)
    osThreatContent = json.dumps(osThreat)

    # Path where you want to store the file in HDFS
    hdfs_software_path = "/temp/software.json"
    hdfs_hardware_path = "/temp/hardware.json"
    hdfs_os_path = "/temp/os.json"

    # Establish connection to HDFS using WebHDFS
    # client=webhdfs.API(host='localhost',port='50070')
    client = InsecureClient('http://localhost:50070')

    # client.upload(hdfs_file_path, local_file_path,overwrite=True)
    with client.write(hdfs_software_path, overwrite=True) as hdfs_file:
        hdfs_file.write(softwareThreatContent)

    with client.write(hdfs_hardware_path, overwrite=True) as hdfs_file:
        hdfs_file.write(hardwareThreatContent)

    with client.write(hdfs_os_path, overwrite=True) as hdfs_file:
        hdfs_file.write(osThreatContent)

    return HttpResponse(status=200)
