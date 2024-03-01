export default async function FilePreviewRenderer(fileName, index, fileExtensionType) {

    if ((fileExtensionType === 0) || (fileExtensionType === 1) || (fileExtensionType === 2)) {
        try {
            const response = await localApi.getFile(fileName, connectionType);
            const blob = new Blob([response.data]);
            const fileSrc = URL.createObjectURL(blob);

            setFileOpening({ busy: false, icon: <i class="fa fa-solid fa-eye"></i> })

            setModal(
                <dialog open>
                    <article className='filePreview'>
                        <header>
                            <button aria-label="Close" className="close" onClick={() => { setModal(null) }}></button>
                            File Preview
                        </header>
                        <h4>{fileName}</h4>
                        {/** If video, use video tag, else use img tag */}
                        {fileExtensionType === 2 ? (<video controls="true" autoPlay="true" src={fileSrc}></video>) : (<img src={fileSrc} alt="File Preview" />)}
                    </article>
                </dialog>
            );

        } catch (error) {
            console.error('There was an error:', error);
        }
    }

}