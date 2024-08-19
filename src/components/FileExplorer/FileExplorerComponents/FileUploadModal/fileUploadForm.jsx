import { useRef, useState } from 'react';
import localApi from '../../../../utils/apiHanding';

export default function FileUploadForm({ method, closeModal, currentDirectory }) {
  const fileSelector = useRef(null);
  const dropZoneRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState({
    busy: false,
    text: "Upload",
    response: null
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = async (files) => {
    setUploadLoading({ busy: true, text: "Uploading..." });

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('fileUpload', file);

        const response = await localApi.uploadFile(formData, method, currentDirectory);
        console.log('Response:', response);

        if (response.status === 200) {
          setUploadedFiles(prevFiles => [...prevFiles, file.name]);
        } else {
          setUploadLoading({ busy: false, text: "Upload", response: <p>Bad Upload</p> });
        }
      }

      setUploadLoading({ busy: false, text: "Upload", response: <p>All files uploaded successfully</p> });

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadLoading({ busy: false, text: "Upload", response: <p>Missing File, please select a file</p> });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(fileSelector.current.files);
    handleFileUpload(files);
  };

  return (
    <dialog open className="dialogs">
      <article className="modals">
        <header className='modals-header'>
          <a href="#close" aria-label="Close" className="close" onClick={ () => { closeModal() } }></a>
          File Upload
        </header>
        <div className="container">
          <div className="container" ref={dropZoneRef} onDrop={handleDrop} onDragOver={handleDragOver} style={{ border: '2px dashed white', padding: '20px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <p style={{ padding: "10vh" }}>Drop files here</p>
            <a href="#" onClick={() => fileSelector.current.click()} style={{ textDecoration: 'none' }}>
              <div style={{ marginBottom: '', display: 'inline-block' }}>
                Click here to upload files
              </div>
            </a>
            <input ref={fileSelector} className="fileUpload" type="file" name="fileUpload" id="fileInput" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFileSelect} />
          </div>
          <button className="outline secondary fileUpload" aria-busy={uploadLoading.busy} onClick={() => handleFileUpload(Array.from(fileSelector.current.files))}>{uploadLoading.text}</button>
          {uploadLoading.response}
          {uploadedFiles.length > 0 && (
            <div>
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </dialog>
  );
}