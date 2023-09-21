import React from 'react';
import ExcelFileDrop from './components/ExcelFileDrop';
// import FileSelect from './components/FileSelect';

const App = () => {
    const handleFileDrop = (file) => {
        // Crear una instancia de FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('file', file);

        // Enviar el archivo al servidor
        fetch('http://localhost:5000/upload/crop-image', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result); // Mensaje de respuesta del servidor

            })
            .catch((error) => {
                console.error('Error al subir el archivo:', error);
            });
    };



    return (
        <div className="App">
            <h1>Arrastra y suelta la imagen aqui</h1>
            <ExcelFileDrop onFileDrop={handleFileDrop} />
            {/* <FileSelect /> */}
        </div>

    );
};

export default App;

