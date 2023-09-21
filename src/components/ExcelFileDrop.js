import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/ExcelFileDrop.css'

const ExcelFileDrop = ({ onFileDrop }) => {
    const handleDrop = useCallback(
        (acceptedFiles) => {
            // Verificar si se ha soltado algún archivo
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                // Verificar que el archivo sea de tipo Excel
                if (file.type === 'image/png' || file.type === 'image/jpeg') {
                    onFileDrop(file);
                    alert('¡imagen subida con exito!.');
                } else {
                    alert('Por favor, selecciona un archivo PNG o JPG valido.');
                }
            }
        },
        [onFileDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/png, image/jpeg',
    });

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Suelta la imagen aquí...</p>
            ) : (
                <p style={{ textAlign: 'center' }}>Arrastra y suelta la imagen aquí, o haz clic para seleccionarlo.</p>
            )}
        </div>
    );
};

export default ExcelFileDrop;
