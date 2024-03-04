import { useRef, useState } from 'react';
import localApi from '../../utils/apiHanding';

export default function FileUploadForm({method}) {
  const fileSelector = useRef(null);
  const [uploadLoading, setUploadLoading] = useState({busy: false, text: "Upload", response: null});

  const handleFileUpload = async (event) => {

    setUploadLoading({busy: true, text: "Uploading..."})

    const fileInput = fileSelector.current.files[0];

    const formData = new FormData();
    formData.append('fileUpload', fileInput);

    try {
      
      const response = await localApi.uploadFile(formData, method);
      console.log('Response:', response);

      (response.status === 200 ? setUploadLoading({busy: false, text: "Upload", response: <p>File "{fileSelector.current.files[0].name}" Uploaded Successfully</p>}) : setUploadLoading({busy: false, text: "Upload", response: <p>Bad Upload</p>}))

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadLoading({busy: false, text: "Upload", response: <p>Missing File, please select a file</p>})
    }

  };

  return (
    <div className="container">
      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <div className="container">
          <input ref={fileSelector} className="fileUpload" type="file" name="fileUpload" id="fileInput" />
        </div>
      </form>
      <button className="contrast fileUpload" aria-busy={uploadLoading.busy} onClick={() => {handleFileUpload()}}>{uploadLoading.text}</button>
      {uploadLoading.response}
    </div>
  );
}