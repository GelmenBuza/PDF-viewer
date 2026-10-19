import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import * as React from "react";

const DropZone: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("Принятые файлы", acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div
            {...getRootProps()}
            style={{
                border: '2px dashed #cccccc',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragActive ? '#e0f7fa' : '#ffffff'
            }}
        >

            <input {...getInputProps()} />

            {isDragActive ? (
                    <p> Опустите файлы здесь...</p>
                )
                : (
                    <p>
                        Перетащите файлы сюда или кликните для выбора
                    </p>
                )}
        </div>
    )
}

export default DropZone;