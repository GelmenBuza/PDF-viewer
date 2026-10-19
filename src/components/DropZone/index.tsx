import {useCallback, useEffect, useMemo, useState} from "react";
import {useDropzone, type Accept} from "react-dropzone";
import * as React from "react";

type FileWithPreview = File & {
    preview: string;
}

const DropZone: React.FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);


    // Настройки дроп зоны
    const onDrop = useCallback((acceptedFiles: File[]) => {

        const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
        setFiles(prev => [...prev, ...filesWithPreview]);

        // Тут можно отдать файл на верх
        console.log("Принятый файл", filesWithPreview);
    }, [])

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeFile = (fileName: string) => {
        setFiles(prev => prev.filter(f => f.name !== fileName));
    }


    const accept: Accept = useMemo(() => ({
        'application/pdf': [],
    }), [])


    const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({onDrop, accept, multiple: false})


    return (
        <div>

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

                {isDragReject ? <p>Неподходящий файл!</p>
                    : isDragActive ? (
                            <p> Опустите файлы здесь...</p>
                        )
                        : (
                            <p>
                                Перетащите файлы сюда или кликните для выбора
                            </p>
                        )
                }


            </div>
            <aside style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                {files.map(file => (
                    <div key={file.name} style={{position: 'relative', width: '100px', height: '100px'}}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {`${file.name.slice(0, 15)}... .pdf`}
                        </div>
                        <button
                            onClick={() => removeFile(file.name)}
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </aside>
        </div>
    )
}

export default DropZone;