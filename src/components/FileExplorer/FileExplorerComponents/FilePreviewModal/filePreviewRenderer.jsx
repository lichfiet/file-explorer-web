import './FilePreviewModal.css';

export default function FilePreviewRenderer({ fileInputData, fileType, fileName, closeModal }) {

    const fileSrc = URL.createObjectURL(fileInputData); // Create a URL for the file input data

        try {

            let Video = () => { return <video controls="true" autoPlay="true" className="file-preview-video" src={fileSrc}></video> };
            let Image = () => { return <img className="file-preview-image" src={fileSrc} alt="File Preview" /> };
            let Text = () => { return <p>Text file</p> };

            let Media = () => {
                if (fileType === 2 /* Video */) {
                    return (<Video src={fileSrc + ".mp4"} />)
                } else if (fileType === 0 /* Image */) {
                    return (<Image src={fileSrc} />)
                } else if (fileType === 1 /* Text */) {
                    return (<Text />)
                }
                console.log("rendering media")
            }

            return (
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={ () => { closeModal() } }></a>
                            {fileName}
                        </header>
                        <div className="file-preview-container">
                            <Media />
                        </div>
                    </article>
                </dialog>
            );

        } catch (error) {

            console.error('There was an error:', error);
            return (
                <p>There was an error loading the file</p>
            );

        }

}