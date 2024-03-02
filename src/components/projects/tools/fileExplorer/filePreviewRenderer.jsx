export default function FilePreviewRenderer(props) {

    if ((props.fileType === 0) || (props.fileType === 1) || (props.fileType === 2)) {

        const fileSrc = URL.createObjectURL(props.fileInputData); // Create a URL for the file input data

        try {


            let Video = () => { return <video controls="true" autoPlay="true" className="file-preview-video" src={fileSrc}></video> };
            let Image = () => { return <img className="file-preview-image" src={fileSrc} alt="File Preview" /> };

            let Media = () => {
                if (props.fileType === 2 /* Video */) {
                    return (<Video src={fileSrc} />)
                } else if (props.fileType === 0 /* Image */) {
                    return (<Image src={fileSrc} />)
                } else if (props.fileType === 1 /* Text */) {
                    return <p>Text file</p>
                }
            }
            return (
                <>
                    <div className="file-preview-container">
                        <Media />
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