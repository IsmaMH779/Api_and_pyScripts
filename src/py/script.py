import sys
import cv2
import numpy as np

def process_file(file_path):
    # Aquí puedes realizar las operaciones que necesites con el archivo
    # Por ejemplo, leer el contenido del archivo y realizar algún cálculo
    
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
