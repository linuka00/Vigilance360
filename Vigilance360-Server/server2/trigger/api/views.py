import json
import jwt
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from api.model.threat import Threat
from .model.hardware import Hardware

from .model.os import Os

from .model.software import Software


from hdfs import InsecureClient


from firebase_admin import auth

from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

config = {
    "apiKey": "AIzaSyD7a7wHHQYGAkBdDlKQZQ7tRV4WxdWxX84",
    "authDomain": "vigilance360-d392a.firebaseapp.com",
    "databaseURL": "https://vigilance360-d392a-default-rtdb.firebaseio.com",
    "projectId": "vigilance360-d392a",
    "storageBucket": "vigilance360-d392a.appspot.com",
    "messagingSenderId": "375995494704",
    "appId": "1:375995494704:web:9c75a8d5f4d9aab25418f5"
}

# Initialize Firebase
# firebase_admin.initialize_app(credentials.Certificate
firebase_admin.initialize_app(credentials.Certificate(
    r'D:\Workspace\RP317\Vigilance360-Server\server2\trigger\vigilance360-firebase.json'), config)


@api_view(["POST"])
def trigger(request):
    data = json.loads(request.body.decode('utf-8'))
    user_id = data.get('userId')
    deleteAllThreat(user_id)
    software_ref = db.reference('software')
    softwares = software_ref.get()
    hardware_ref = db.reference('hardware')
    hardwares = hardware_ref.get()
    os_ref = db.reference('os')
    oss = os_ref.get()
    device_ref = db.reference('device')
    devices = device_ref.get()
    for key, software in softwares.items():
        if software.get('u_id') == user_id:
            for key, device in devices.items():
                if key == software.get('d_id'):
                    checkSoftwareThreat(software, key, user_id, device)
            if software.get('d_id') == "":
                checkSoftwareThreat(software, key, user_id, "")
            # softwareList.append(software)

    for key, hardware in hardwares.items():
        if hardware.get('u_id') == user_id:
            for key, device in devices.items():
                if key == hardware.get('d_id'):
                    checkHardwareThreat(hardware, key, user_id, device)
            if hardware.get('d_id') == "":
                checkHardwareThreat(hardware, key, user_id, device)
            # hardwareList.append(hardware)

    for key, os in oss.items():
        if os.get('u_id') == user_id:
            for key, device in devices.items():
                if key == hardware.get('d_id'):
                    checkOsThreat(os, key, user_id, device)
            if hardware.get('d_id') == "":
                checkOsThreat(os, key, user_id, device)
            # osList.append(os)

    return JsonResponse({"status": "Sucssess"})


def get_all_user_ids():
    user_ids = []
    try:
        # Fetch all users from Firebase Authentication
        all_users = auth.list_users().iterate_all()

        # Extract user IDs from the list of users
        for user in all_users:
            user_ids.append(user.uid)

        return user_ids
    except Exception as e:
        print(f"Error getting users: {e}")
        return []


def saveThreat(threat: Threat):
    keyRef = db.reference("/threat").push(threat)
    threat['id'] = keyRef.key
    updateThreat(keyRef.key, threat)
    return keyRef.key


def updateThreat(threat_id, new_threat):
    db.reference("/threat").child(threat_id).update(new_threat)


def deleteAllThreat(user_id):
    threat_ref = db.reference('threat')
    query = threat_ref.order_by_child('user_id').equal_to(user_id)
    matching_records = query.get()

    for record_key in matching_records.keys():
        threat_ref.child(record_key).delete()


def checkSoftwareThreat(software: Software, software_id, user_id, device):
    softwareThreatList: list[Software] = getHadoopSoftwareThreat()
    for softwareThreat in softwareThreatList:
        if isinstance(softwareThreat, dict):
            if (softwareThreat.get('name') == software.get('name')):
                threat: Threat = {
                    "id": "",
                    "user_id": user_id,
                    "name": softwareThreat.get('name'),
                    "affected": softwareThreat.get('affected'),
                    "overview": softwareThreat.get('overview'),
                    "description": softwareThreat.get('description'),
                    "impact": softwareThreat.get('impact'),
                    "solution": softwareThreat.get('solution'),
                    "reference": softwareThreat.get('reference'),
                    "disclaimer": softwareThreat.get('disclaimer'),
                    "threatLevel": softwareThreat.get('threatLevel'),
                    "platform": "software",
                    "version": softwareThreat.get('version'),
                    "platform_value": software,
                    "device": device,
                    "status": 2
                }
                threat_id = saveThreat(threat)
                if (softwareThreat.get('version') == software.get('version')):
                    threat: Threat = {
                        "id": threat_id,
                        "user_id": user_id,
                        "name": softwareThreat.get('name'),
                        "affected": softwareThreat.get('affected'),
                        "overview": softwareThreat.get('overview'),
                        "description": softwareThreat.get('description'),
                        "impact": softwareThreat.get('impact'),
                        "solution": softwareThreat.get('solution'),
                        "reference": softwareThreat.get('reference'),
                        "disclaimer": softwareThreat.get('disclaimer'),
                        "threatLevel": softwareThreat.get('threatLevel'),
                        "platform": "software",
                        "version": softwareThreat.get('version'),
                        "platform_value": software,
                        "device": device,
                        "status": 3
                    }
                    updateThreat(threat_id, threat)


def checkHardwareThreat(hardware: Hardware, hardware_id, user_id, device):
    hardwareThreatList: list[Hardware] = getHadoopHardwareThreat()

    for hardwareThreat in hardwareThreatList:
        if isinstance(hardwareThreat, dict):
            if (hardwareThreat.get('name') == hardware.get('name')):
                threat: Threat = {
                    "id": "",
                    "user_id": user_id,
                    "name": hardwareThreat.get('name'),
                    "affected": hardwareThreat.get('affected'),
                    "overview": hardwareThreat.get('overview'),
                    "description": hardwareThreat.get('description'),
                    "impact": hardwareThreat.get('impact'),
                    "solution": hardwareThreat.get('solution'),
                    "reference": hardwareThreat.get('reference'),
                    "disclaimer": hardwareThreat.get('disclaimer'),
                    "threatLevel": hardwareThreat.get('threatLevel'),
                    "platform": "hardware",
                    "version": hardwareThreat.get('model'),
                    "platform_value": hardware,
                    "device": device,
                    "status": 2
                }
                threat_id = saveThreat(threat)
                if (hardwareThreat.get('model') == hardware.get('model')):
                    threat: Threat = {
                        "id": threat_id,
                        "user_id": user_id,
                        "name": hardwareThreat.get('name'),
                        "affected": hardwareThreat.get('affected'),
                        "overview": hardwareThreat.get('overview'),
                        "description": hardwareThreat.get('description'),
                        "impact": hardwareThreat.get('impact'),
                        "solution": hardwareThreat.get('solution'),
                        "reference": hardwareThreat.get('reference'),
                        "disclaimer": hardwareThreat.get('disclaimer'),
                        "threatLevel": hardwareThreat.get('threatLevel'),
                        "platform": "hardware",
                        "version": hardwareThreat.get('model'),
                        "platform_value": hardware,
                        "device": device,
                        "status": 3
                    }
                    updateThreat(threat_id, threat)


def checkOsThreat(os: Os, os_id, user_id, device):
    osThreatList: list[Os] = getHadoopOsThreat()

    for osThreat in osThreatList:
        if isinstance(osThreat, dict):
            print(osThreat)
            print(osThreat.get('name'))
            if (osThreat.get('name') == os.get('name')):
                threat: Threat = {
                    "id": "",
                    "user_id": user_id,
                    "name": osThreat.get('name'),
                    "affected": osThreat.get('affected'),
                    "overview": osThreat.get('overview'),
                    "description": osThreat.get('description'),
                    "impact": osThreat.get('impact'),
                    "solution": osThreat.get('solution'),
                    "reference": osThreat.get('reference'),
                    "disclaimer": osThreat.get('disclaimer'),
                    "threatLevel": osThreat.get('threatLevel'),
                    "platform": "os",
                    "version": osThreat.get('version'),
                    "platform_value": os,
                    "device": device,
                    "status": 2
                }
                threat_id = saveThreat(threat)
                if (osThreat.get('version') == os.get('version')):
                    threat: Threat = {
                        "id": threat_id,
                        "user_id": user_id,
                        "name": osThreat.get('name'),
                        "affected": osThreat.get('affected'),
                        "overview": osThreat.get('overview'),
                        "description": osThreat.get('description'),
                        "impact": osThreat.get('impact'),
                        "solution": osThreat.get('solution'),
                        "reference": osThreat.get('reference'),
                        "disclaimer": osThreat.get('disclaimer'),
                        "threatLevel": osThreat.get('threatLevel'),
                        "platform": "os",
                        "version": osThreat.get('version'),
                        "platform_value": os,
                        "device": device,
                        "status": 3
                    }
                    updateThreat(threat_id, threat)


def getHadoopSoftwareThreat():
    # Establish a connection to the Hadoop Namenode
    client = InsecureClient('http://localhost:50070')

    # Specify the path of the file in HDFS
    hdfs_software_path = '/temp/software.json'

    # Read the content of the file from HDFS
    with client.read(hdfs_software_path) as hdfs_file:
        software_file_content = hdfs_file.read()

    # Convert the JSON content to a list
    software_json_data = json.loads(software_file_content)
    software_data_list = list(software_json_data)

    # Return the JSON data as a Django HTTP response
    return software_data_list


def getHadoopHardwareThreat():
    # Establish a connection to the Hadoop Namenode
    client = InsecureClient('http://localhost:50070')

    hdfs_hardware_path = '/temp/hardware.json'

    with client.read(hdfs_hardware_path) as hdfs_file:
        hardware_file_content = hdfs_file.read()

    hardware_json_data = json.loads(hardware_file_content)
    hardware_data_list = list(hardware_json_data)

    return hardware_data_list


def getHadoopOsThreat():
    # Establish a connection to the Hadoop Namenode
    client = InsecureClient('http://localhost:50070')

    hdfs_os_path = '/temp/os.json'

    with client.read(hdfs_os_path) as hdfs_file:
        os_file_content = hdfs_file.read()

    os_json_data = json.loads(os_file_content)
    os_data_list = list(os_json_data)
    print(os_data_list)
    return os_data_list

# jwt token generate


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_jwt_token(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data.get('id')
    email = data.get('email')
    email_verified = data.get('email_verified')

    # Customize the payload by adding email, username, id, and proId
    payload = {
        'user_id': id,
        'email': email,
        'email_verified': email_verified
    }

    encoded = jwt.encode(payload, "secret", algorithm="HS256")

    return JsonResponse({'access_token': encoded})
