//const axios = require('axios');

export default function FileUploadForm() {
    return (
      <div>
        <h2>Upload a File</h2>
        <form action="http://localhost:3000/uploadFile" method="post" encType="multipart/form-data">
          <input type="file" name="fileUpload" />
          <input type="submit" value="Upload" />
        </form>
      </div>
    )
  };

