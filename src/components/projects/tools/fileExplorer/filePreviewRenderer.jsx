export default function FilePreviewRenderer(props) {

    if ((props.fileType === 0) || (props.fileType === 1) || (props.fileType === 2)) {

        try {

            const fileSrc = URL.createObjectURL(props.fileInputData);
            const fileName = "testing"

            return (
                <>
                    <h4>{fileName}</h4>
                    <div className="file-preview-container">
                        {props.fileType === 2 ? (
                            <video controls="true" autoPlay="true" className="file-preview-video" src={fileSrc}></video>
                        ) : (
                            <img className="file-preview-image" src={fileSrc} alt="File Preview" />
                        )}
                    </div>
                </>
            );

        } catch (error) {

            console.error('There was an error:', error);
            return (
                <p>There was an error loading the file</p>
            );
            
        }
    }

}