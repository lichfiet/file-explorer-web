import './FilePreviewModal.css';

export default function FilePreviewRenderer(props) {

        const fileType = props.fileType
        const fileName = props.fileName
        const fileExtension = props.fileExtension
        const fileInputData = props.fileInputData

        const fileSrc = URL.createObjectURL(fileInputData); // Create a URL for the file input data

        try {

            let Video = () => { return <video controls="true" autoPlay="true" className="file-preview-video" src={fileSrc}></video> };
            let Image = () => { return <img className="file-preview-image" src={fileSrc} alt="File Preview" /> };
            let Text = () => { return <p>Text file</p> };

            let Media = () => {
                if (props.fileType === 2 /* Video */) {
                    return (<Video src={fileSrc + ".mp4"} />)
                } else if (props.fileType === 0 /* Image */) {
                    return (<Image src={fileSrc} />)
                } else if (props.fileType === 1 /* Text */) {
                    return (<Text />)
                }
            }

            return (
                <div className="file-preview-container">
                    <Media />
                </div>
            );

        } catch (error) {

            console.error('There was an error:', error);
            return (
                <p>There was an error loading the file</p>
            );

        }

}