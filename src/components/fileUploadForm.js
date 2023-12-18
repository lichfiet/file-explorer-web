
export default function FileUploadForm() {
    return (
      <div class="container">
        <h2>Upload a File</h2>
        <form action="http://localhost:3000/uploadFile" method="post" encType="multipart/form-data">
          <div class="container">
          <input class="fileUpload" type="file" name="fileUpload" />
          <input class="contrast fileUpload" type="submit" value="Upload" />
          </div>
        </form>
      </div>
    )
  };

