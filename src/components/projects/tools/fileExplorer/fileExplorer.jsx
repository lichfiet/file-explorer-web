import { useState, useEffect } from 'react';
import localApi from '../../../../utils/apiHanding';
import extension from '../../../../utils/extensiontools'
import FileUploadForm from './fileUploadForm'
import FilePreviewRenderer from './filePreviewRenderer'
import { ConversationListInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import { render } from '@testing-library/react';

const FileExplorer = function () {

    const [modal, setModal] = useState(null)

    const [files, setFiles] = useState([]); // State Data for file list
    const [fileData, setFileData] = useState([{ fileName: null, fileType: null, fileExtension: null, fileExtensionType: null }]); // State Data for file list

    const [filesLoading, setFilesLoading] = useState({ busy: false, icon: <i className="fa fa-solid fa-arrows-rotate" style={{ 'color': '#FFFFF' }}></i> }) // Refresh Button State
    const [fileDeleting, setFileDeleting] = useState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="fa fa-solid fa-plus"></i> }) // File Upload Button State
    const [fileOpening, setFileOpening] = useState({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> }) // File Open Button State
    const [connectionType, setConnectionType] = useState('SFTP');

    const [activeFile, setActiveFile] = useState({ fileName: null, index: null, fileExtensionType: null })
    const [fileSelected, setFileSelected] = useState(null)

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
        }
        ); // Update file state variable
    }


    // Grab the file list
    const fetchFiles = async () => {
        setFilesLoading({ busy: true, text: null }) // make button loading

        // Request file list data from Api
        try {
            const fileData = await localApi.requestFiles(connectionType)

            console.log("File Data")

            if (fileData === undefined) {
            
                throw new Error('Missing File Data')

            } else {
                let meow = []

                let Test = () => {

                    fileData.map((obj, index) => (

                        meow.push(
                            <div className="fileReturned" key={index} id={obj.fileName}>
                                <button name={obj.fileName} id={"button-" + obj.fileName} className={(obj.fileName === activeFile.fileName ? "secondary contrast" : "secondary")} onClick={() => { fileSelector(obj.fileName, index, obj.fileExtensionType) }}>

                                <div className="fileReturned" id={index}>
                                    {extension.getThumbnail(obj.fileExtensionType, obj.fileType)}
                                </div>


                            </button>
                            <p className="fileReturnedText" extension={obj.fileExtension}>{obj.fileName}</p>
                        </div>)

                    ))
                    
                    console.log("map test")
                    return meow
                }

                setFileData(fileData)
                renderFiles();
            }

        } catch (error) {
            console.error('Error fetching files: ' + error); // Handle error if API request fails

            // setFiles([{
            //     fileName: "No files found", // s3 contents Key value 
            //     fileType: '-', // Directory or File
            //     fileExtension: "Dir", // If File, add extension
            //     fileExtensionType: "Dir", // If File, add extension type
            // }]);

        } finally {
            ;
        }

        setFilesLoading({ busy: false, icon: (<i className="fa fa-solid fa-rotate-right"></i>) }) // Reset Loading State
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

                console.log("Logging Data")
                console.log(response)

                let file = document.getElementById(fileName)

                file.remove();
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
                        <a href="#close" aria-label="Close" className="close" onClick={() => { setModal(null); setActiveFile({ fileName: null, index: null, fileExtensionType: null }) }}></a>
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
                        <a href="#close" aria-label="Close" className="close" onClick={() => { setModal(null); setActiveFile({ fileName: null, index: null, fileExtensionType: null }) }}></a>
                        File Upload
                    </header>
                    <FilePreviewRenderer fileInputData={selectedFileData} fileType={selectedFileType}></FilePreviewRenderer>
                </article>
            </dialog>
        )
    }

    const newFileSelector = (fileName, index, fileExtensionType) => {
        /**
         * Behavior:
         * 
         * IF no file selected, set currently selected file and log it
         * 
         * IF file selected, and file clicked is the same as the one selected, open the file with openPreviewModal function
         * 
         * IF file selected, and file clicked is different, set the new file as the selected file and log it
         */



        // If no fileName was passed to the function
        if ((fileName !== null)) {

            console.log("No File Name Passed To File Selector")

            // If no file is currently selected
        } else if (activeFile.fileName === null || activeFile.fileName === undefined) {

            // set the new file as the selected file
            // re-render the file list

            // If the file clicked is the same as the one selected
        } else if (activeFile.fileName === fileName) {

            // set file opening state 
            // query the file
            // and open the preview modal

            // remove loading state
            // clear selected file
            // set active file to null


            // If the file clicked is different from the one selected
        } else if (activeFile.fileName !== fileName) {

            // clear selected file
            // set the new file as the selected file

        }
    }

    const fileSelector = function (fileName, index, fileExtensionType) {

        // If active file = the one just clicked on (i.e., file was double clicked)
        if (activeFile.fileName === fileName) {

            setFileOpening({ busy: true, icon: undefined })

            const FilePanePreview = async function (fileName, index, fileExtensionType) {

                setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

                let button = document.getElementById(`${index}`)

                let oldval = button.innerHTML

                button.innerHTML = ""
                button.setAttribute('aria-busy', 'true');

                console.log(fileName);

                if ((fileExtensionType === 0) || (fileExtensionType === 1) || (fileExtensionType === 2)) {
                    try {
                        const response = await localApi.getFile(fileName, connectionType);
                        const blob = new Blob([response.data]);
                        const fileSrc = URL.createObjectURL(blob);

                        setFileOpening({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> })

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


                button.innerHTML = (oldval === null ? "n/a" : oldval)
                button.setAttribute('aria-busy', 'false')

                setFileOpening({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> });
                setActiveFile({ fileName: null, index: null, fileExtensionType: null })
                // Remove Contrast from the button
                clearSelectedFile();

            };

            return (FilePanePreview(fileName, index, fileExtensionType));
        } else if (((activeFile.fileName === null) || (activeFile.fileName === undefined)) && (fileName !== null)) {

            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

            renderFiles();

        } else {

            setActiveFile(
                {
                    fileName: fileName,
                    index: index,
                    fileExtensionType: fileExtensionType
                });

            renderFiles();
        }

    }

    // Set the active connection type
    const setActiveConnection = (value) => {
        setConnectionType(value);

        console.log(value)
    }

    // Fetch files on load
    useEffect(() => {
        fetchFiles();
    }, [connectionType]);

    useEffect(() => {
        renderFiles();
    }, [activeFile.fileName], []);

    return (


        <div className="">
            <nav style={{ padding: "20px" }}>
                <ul>
                    <button aria-busy={filesLoading.busy} onClick={() => { fetchFiles() }} className="contrast fileExplorerButton">{filesLoading.icon}</button>
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
            <div className="filesListed grid">
                {files}
            </div>
            <div>
                {modal}
            </div>
        </div>
    );
};

export default FileExplorer;
