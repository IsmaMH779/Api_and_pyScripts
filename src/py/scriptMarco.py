import sys
import cv2
import numpy as np
from tensorflow.keras.applications import ResNet50, preprocess_input, decode_predictions

# Cargar el modelo de ResNet50 preentrenado
model = ResNet50(weights='imagenet')

def process_image(file_path):
    try:
        # Leer la imagen usando OpenCV
        image = cv2.imread(file_path)
        
        # Reescalar la imagen a un tamaño adecuado para ResNet (224x224)
        image = cv2.resize(image, (224, 224))
        
        # Expandir las dimensiones de la imagen para que coincidan con el formato de entrada de ResNet
        image = np.expand_dims(image, axis=0)
        
        # Preprocesar la imagen para que sea adecuada para ResNet
        image = preprocess_input(image)
        
        # Realizar predicciones utilizando el modelo de ResNet
        predictions = model.predict(image)
        
        # Decodificar las predicciones en etiquetas legibles
        decoded_predictions = decode_predictions(predictions, top=5)[0]
        
        # Imprimir las predicciones
        print("Predicciones:")
        for i, (imagenet_id, label, score) in enumerate(decoded_predictions):
            print(f"{i + 1}: {label} ({score:.2f})")
            
    except FileNotFoundError:
        print("Archivo no encontrado.")
    except Exception as e:
        print(f"Error al procesar la imagen: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        process_image(image_path)
    else:
        print("Por favor, especifique la ruta de la imagen como argumento.")
