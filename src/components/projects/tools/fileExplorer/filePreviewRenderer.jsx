export default function FilePreviewRenderer(props) {

    if ((props.fileType === 0) || (props.fileType === 1) || (props.fileType === 2)) {

        try {

            const fileSrc = URL.createObjectURL(props.fileInputData);
            const fileName = "testing"

            return (
                <>
                    <h4>{fileName}</h4>
                    {/** If video, use video tag, else use img tag */}
                    {props.fileType === 2 ? (<video controls="true" autoPlay="true" src={fileSrc}></video>) : (<img src={fileSrc} alt="File Preview" />)}
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