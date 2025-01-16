import cv2
import face_recognition as fr
import numpy as np
import imghdr
from fastapi import HTTPException

def face_recognition_post_repo(file, camera_capture):
    print('Processing in repository:', file)
    
    try:
        # Read the files
        file_bytes = file.file.read()
        camera_capture_bytes = camera_capture.file.read()
        
        # Convert bytes to numpy array
        file_np_arr = np.frombuffer(file_bytes, np.uint8)
        camera_np_arr = np.frombuffer(camera_capture_bytes, np.uint8)
        
        # Decode the numpy arrays into images
        img_file = cv2.imdecode(file_np_arr, cv2.IMREAD_COLOR)
        img_camera = cv2.imdecode(camera_np_arr, cv2.IMREAD_COLOR)
        
        # Check if images were loaded successfully
        if img_file is None or img_camera is None:
            raise HTTPException(status_code=400, detail="Invalid image format or corrupted file")
        
        # Detect faces in both images
        face_locations_file = fr.face_locations(img_file, model="hog")
        face_locations_camera = fr.face_locations(img_camera, model="hog")
        
        # Check if faces were detected
        if not face_locations_file:
            raise HTTPException(status_code=400, detail="No faces detected in the uploaded file")
        if not face_locations_camera:
            raise HTTPException(status_code=400, detail="No faces detected in the camera capture")
        
        # Get face encodings
        face_encodings_file = fr.face_encodings(img_file, face_locations_file)
        face_encodings_camera = fr.face_encodings(img_camera, face_locations_camera)
        
        if not face_encodings_file or not face_encodings_camera:
            raise HTTPException(status_code=400, detail="Could not encode faces")
        
        # Compare faces
        matches = []
        is_same_person = False
        
        for encoding_file in face_encodings_file:
            for encoding_camera in face_encodings_camera:
                match = fr.compare_faces([encoding_file], encoding_camera, tolerance=0.6)[0]
                distance = fr.face_distance([encoding_file], encoding_camera)[0]
                confidence = float(1 - distance)
                
                matches.append({
                    "match": bool(match),
                    "confidence": confidence
                })
                
                if match and confidence > 0.5:  # Adding a confidence threshold
                    is_same_person = True
        
        # Print the result clearly
        if is_same_person:
            print("\n¡COINCIDENCIA ENCONTRADA! Las imágenes muestran a la misma persona.")
        else:
            print("\nNO HAY COINCIDENCIA. Las imágenes muestran a diferentes personas.")
        
        # Return results
        return {
            "success": True,
            "matches": matches,
            "is_same_person": is_same_person,
            "faces_found": {
                "file": len(face_locations_file),
                "camera": len(face_locations_camera)
            }
        }
        
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))