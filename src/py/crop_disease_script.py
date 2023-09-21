import sys
import tensorflow as tf
from tensorflow import keras

def process_file(file_path):
    
    try:
        model = keras.models.load_model(f'./trained_model/disease/modelo_entrenado_{}.h5')
        
        new_img = Image.open(file_path)
        new_img = new_img.resize((150,150))
        new_img = np.array(new_img) / 255.0
        new_img = np.expand_dims(new_img, axis = 0)

        prediccion = model.predict(new_img)
    except FileNotFoundError:
        print("Archivo no encontrado.")
    except Exception as e:
        print(f"Error al procesar la imagen: {str(e)}")
    
    try:
        with open(file_path, 'r') as file:
            # Leer el contenido del archivo
            content = file.read()
            
            # Realizar alguna operación con el contenido
            result = len(content)
            
            # Imprimir el resultado
            salida = 'El archivo contiene '+str(result)+' caracteres.'
            print(salida)
            # Abrir el archivo en modo escritura
            with open("outputs/salida_script_python.txt", "w") as archivo:
                # Escribir el contenido en el archivo
                archivo.write(salida)
    except FileNotFoundError:
        print("Archivo no encontrado.")
    except Exception as e:
        print(f"Error al procesar el archivo: {str(e)}")

if __name__ == "__main__":
    # Obtener la ruta del archivo como argumento de línea de comandos
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        process_file(file_path)
    else:
        print("Por favor, especifique la ruta del archivo como argumento.")