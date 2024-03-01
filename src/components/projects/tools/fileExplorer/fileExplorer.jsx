import { useState, useEffect } from 'react';
import localApi from '../../../../utils/apiHanding';
import extension from '../../../../utils/extensiontools'
import FileUploadForm from './fileUploadForm'
import FilePreviewRenderer from './filePreviewRenderer'

const FileExplorer = function () {

    const [modal, setModal] = useState(null)

    const [files, setFiles] = useState(<div aria-busy="true"></div>); // State Data for file list
    const [fileData, setFileData] = useState([]); // State Data for file list

    const [filesLoading, setFilesLoading] = useState({ busy: false, icon: null }) // Refresh Button State
    const [fileDeleting, setFileDeleting] = useState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="fa fa-solid fa-plus"></i> }) // File Upload Button State
    const [fileOpening, setFileOpening] = useState({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> }) // File Open Button State
    const [connectionType, setConnectionType] = useState('S3');

    const [activeFile, setActiveFile] = useState({ fileName: null, index: null, fileExtensionType: null })

    const clearSelectedFile = () => {
        setActiveFile({ fileName: null, index: null, fileExtensionType: null })
    };

    const renderFiles = () => {

        setFiles(() => {
            let renderedFiles = []

            fileData.map((obj, index) => (

                renderedFiles.push(
                    <div className="fileReturned" key={index} id={obj.fileName}>
                        <button name={obj.fileName} id={"button-" + obj.fileName} className={(obj.fileName === activeFile.fileName ? "secondary contrast" : "secondary")} onClick={() => { fileSelector(obj.fileName, index, obj.fileExtensionType) }}>

                            <div className="fileReturned" id={index}>
                                {extension.getThumbnail(obj.fileExtensionType, obj.fileType)}
                            </div>


                        </button>
                        <p className="fileReturnedText" extension={obj.fileExtension}>{obj.fileName}</p>
                    </div>)

            ))

            return renderedFiles
        }); // Update file state variable
    };


    const fetchFileData = async () => { setFileData(await localApi.requestFiles(connectionType)) }

    // Grab the file list
    const refreshFiles = async () => {
        console.log("should be loading")



        setFilesLoading({ busy: true, icon: null })
        setFiles(<div aria-busy="true"><p>Loading Files</p></div>)
        // Request file list data from Api
        try {
            await fetchFileData();
        } catch (error) {
            console.error('Error fetching files: ' + error); // Handle error if API request fails
            setFileData([{ fileName: "No files found", fileType: '-', fileExtension: "Dir", fileExtensionType: "Dir" }]);
        } finally {

        }

        setFilesLoading({ busy: false, icon: <i className="fa fa-solid fa-rotate-right"></i> })

    }


    // Delete Selected File
    const deleteFile = async () => {

        if (activeFile.fileName === null) {
            console.log("No File Selected")
        } else {
            console.log(activeFile.fileName)


            const fileName = activeFile.fileName
            console.log(activeFile);
            setFileDeleting({ busy: true, icon: null })

            let button = document.getElementById(`${activeFile.index}`)

            let oldval = button.innerHTML

            button.innerHTML = ""
            button.setAttribute('aria-busy', 'true');

            try {
                let response
                response = await localApi.deleteFile(fileName, connectionType)

                refreshFiles();

            } catch (error) {
                // Handle error if API request fails
                console.error('Error fetching files:', error);
            }
            setFileDeleting({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> })

            button.innerHTML = oldval
            button.setAttribute('aria-busy', 'false')

            setActiveFile({ fileName: null, index: null, fileExtensionType: null })
        }
    }

    const openUploadModal = (connectionType) => {

        setModal(
            <dialog open>
                <article>
                    <header>
                        <a href="#close" aria-label="Close" className="close" onClick={async () => { setModal(null); await refreshFiles(); }}></a>
                        File Upload
                    </header>
                    <FileUploadForm method={connectionType}></FileUploadForm>
                </article>
            </dialog>
        )
    };

    const openPreviewModal = (selectedFileData, selectedFileType) => {
        setModal(
            <dialog open>
                <article>
                    <header>
                        <a href="#close" aria-label="Close" className="close" onClick={() => { setModal(null); clearSelectedFile() }}></a>
                        File Upload
                    </header>
                    <FilePreviewRenderer fileInputData={selectedFileData} fileType={selectedFileType}></FilePreviewRenderer>
                </article>
            </dialog>
        )
    }

    const fileSelector = async (fileName, index, fileExtensionType) => {

        // If no fileName was passed to the function
        if ((fileName === null)) {

            console.log("No File Name Passed To File Selector")


        } else if (activeFile.fileName === null || activeFile.fileName === undefined) {

            // If no file is currently selected
            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

            
        } else if (activeFile.fileName === fileName) {

            // If the file clicked is the same as the one selected
            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType }); // Set the active file to the one just clicked on


            const FilePanePreview = async function (fileName, index, fileExtensionType) {
                setFileOpening({ busy: true, icon: undefined }) // Set file opening state to busy

                let button = document.getElementById(`${index}`) // Get the button that was clicked on
                let oldval = button.innerHTML // Store the button's innerHTML

                button.innerHTML = "" // Clear the button's innerHTML
                button.setAttribute('aria-busy', 'true'); // Set the button's aria-busy attribute to true

                const response = await localApi.getFile(fileName, connectionType); // Query the file
                const blob = new Blob([response.data]); // Create a blob from the file data

                // Set the button's innerHTML back to its original value
                button.innerHTML = (oldval === null ? "n/a" : oldval)
                button.setAttribute('aria-busy', 'false')

                // Open the preview modal
                try {
                    openPreviewModal(blob, fileExtensionType);
                } catch (error) {
                    console.error('There was an error:', error);
                }

                setFileOpening({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> });
            };

            clearSelectedFile();

            return (FilePanePreview(fileName, index, fileExtensionType));

            
        } else if (activeFile.fileName !== fileName) { 

            // If the file clicked is different from the one selected
            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

        }
    }


    // Set the active connection type
    const setActiveConnection = (value) => {
        setConnectionType(value);

        console.log(value)
    }

    // Fetch files on load


    useEffect(() => {
        renderFiles();
    }, [activeFile.fileName, fileData]);

    return (
        <div className="">

            {useEffect(() => {
                refreshFiles();
            }, [connectionType])}

            <nav style={{ padding: "20px" }}>
                <ul>
                    <button aria-busy={filesLoading.busy} onClick={() => { refreshFiles(); }} className="contrast fileExplorerButton">{filesLoading.icon}</button>
                    <button aria-busy={fileOpening.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : fileSelector(activeFile.fileName, activeFile.index, activeFile.fileExtensionType)) }} className="contrast fileExplorerButton">{fileOpening.icon}</button>
                    <button aria-busy={fileDeleting.busy} onClick={() => { deleteFile(activeFile) }} className="contrast fileExplorerButton">{fileDeleting.icon}</button>
                    <button aria-busy={fileUploading.busy} onClick={() => { openUploadModal(connectionType) }} className="contrast fileExplorerButton">{fileUploading.icon}</button>
                </ul>
                {/** S3 or SFTP radio buttons */}
                <ul>
                    <fieldset>
                        <input type="radio" id="S3" name="connection-type" onClick={() => { setActiveConnection('S3') }} />
                        <label htmlFor="S3">S3</label>
                        <input type="radio" id="SFTP" name="connection-type" onClick={() => { setActiveConnection('SFTP') }} />
                        <label htmlFor="SFTP">SFTP</label>
                    </fieldset>
                </ul>

            </nav>
            <div className="grid">
            </div>
            <div className="filesListed">
                {files}
            </div>
            <div>
                {modal}
            </div>
        </div>
    );
};

export default FileExplorer;
