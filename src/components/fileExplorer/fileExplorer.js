import { useState, useEffect } from 'react';
import localApi from '../../utils/apiHanding';
import extension from '../../utils/extensiontools'
import FileUploadForm from './fileUploadForm'


const FileExplorer = function () {

    const [modal, setModal] = useState(null)

    const [files, setFiles] = useState([]); // State Data for file list
    const [filesLoading, setFilesLoading] = useState({ busy: false, icon: <i class="fa fa-solid fa-rotate-right"></i> }) // Refresh Button State
    const [fileDeleting, setFileDeleting] = useState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="fa fa-solid fa-plus"></i> }) // File Upload Button State
    const [fileOpening, setFileOpening] = useState({ busy: false, icon: <i class="fa fa-solid fa-eye"></i>}) // File Open Button State
    const [connectionType, setConnectionType] = useState('S3');

    const [activeFile, setActiveFile] = useState({ fileName: null, index: null, fileExtensionType: null })
    const [fileSelected, setFileSelected] = useState(null)

    // var for button loading template
    let buttonLoading = {
        openFile: {
            loading: {
                busy: true,
                innerText: (null)
            },
            standby: {
                busy: false,
                innerText: <i class="fa-solid fa-eye"></i>
            },
            state: {
                busy: false,
                innerText: <i class="fa-solid fa-eye"></i>
            }
        },
        deleteFile: {
            busy: false,
            innerText: (<i className="fa fa-solid fa-trash"></i>)
        },
        refreshList: {
            busy: false,
            icon: (<i class="fa fa-solid fa-rotate-right"></i>)
        }
    }

    const clearSelected = () => {
        for (let n = 0; n < files.length; n++) {
            let file = document.getElementById("button-" + files[n].fileName);
            if (file !== null) {
                file.className = 'outline secondary';
            }
        } 
    }


    // Grab the file list
    const fetchFiles = async () => {
        setFilesLoading({ busy: true, text: null }) // make button loading
   
        // Request file list data from Api
        try {
            const fileData = await localApi.requestFiles(connectionType)

            setFiles(fileData); // Update file state variable
            console.log("Logging Data") // Log
            console.log(fileData)
        } catch (error) {
            console.error('Error fetching files:', error); // Handle error if API request fails
        } finally {
            clearSelected();
        }

        setFilesLoading({ busy: false, icon: (<i class="fa fa-solid fa-rotate-right"></i>) }) // Reset Loading State
    }

    useEffect(() => {
        fetchFiles();
      }, []);


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
        );
    }

    const openPreviewModal = () => {}

    const fileSelector = function (fileName, index, fileExtensionType) {

        // If active file = the one just clicked on (i.e., file was double clicked)
        if (activeFile.fileName === fileName) {

            setFileOpening({ busy: true, icon: undefined})

            const FilePanePreview = async function (fileName, index, fileExtensionType) {

                setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

                let exttype = fileExtensionType
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

                        setFileOpening({ busy: false, icon: <i class="fa fa-solid fa-eye"></i>})

                        setModal(
                            <dialog open>
                                <article>
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

                setFileOpening({ busy: false, icon: <i class="fa fa-solid fa-eye"></i>});
                setActiveFile({ fileName: null, index: null, fileExtensionType: null })
                // Remove Contrast from the button
                clearSelected();

            };

            return (FilePanePreview(fileName, index, fileExtensionType));
        } else if (((activeFile.fileName === null) || (activeFile.fileName === undefined)) && (fileName !== null)) {            
            clearSelected();
            // find file by id and
            const fileElement = document.getElementById("button-" + fileName)
            fileElement.className = (fileElement.className + " contrast")

            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

        } else {

            const currFile = document.getElementById("button-" + activeFile.fileName)
            currFile.className = fileSelected

            const fileElement = document.getElementById("button-" + fileName)
            const currClasses = fileElement.className

            setFileSelected(currClasses)
            fileElement.className = (fileElement.className + " contrast")

            setActiveFile(
                {
                    fileName: fileName,
                    index: index,
                    fileExtensionType: fileExtensionType
                });
        }

    }

    const setActiveConnection = (value) => {
        setConnectionType(value);

        console.log(value)
    }


    return (
        <div className="fileExplorerContainer">
            <section>
                <nav style={{ padding: "10px" }}>
                    <ul>
                        <a data-tooltip="Refresh File List" style={{'margin-right': '1px'}}><button aria-busy={filesLoading.busy} onClick={() => { fetchFiles() }} className="contrast fileExplorerButton">{filesLoading.icon}</button></a>
                        <a data-tooltip="Open File" style={{'margin-right': '1px'}}><button aria-busy={fileOpening.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : fileSelector(activeFile.fileName, activeFile.index, activeFile.fileExtensionType)) }} className="contrast fileExplorerButton">{fileOpening.icon}</button></a>
                        <a data-tooltip="Delete File" style={{'margin-right': '1px'}}><button aria-busy={fileDeleting.busy} onClick={() => { deleteFile(activeFile) }} className="contrast fileExplorerButton">{fileDeleting.icon}</button></a>
                        <a data-tooltip="Upload File" style={{'margin-right': '1px'}}><button aria-busy={fileUploading.busy} onClick={() => { openUploadModal(connectionType) }} className="contrast fileExplorerButton">{fileUploading.icon}</button></a>
                    </ul>
                    {/** S3 or SFTP radio buttons */}
                    <ul>
                        <fieldset>
                            <input type="radio" id="S3" name="connection-type" onClick={() => {setActiveConnection('S3')}}/>
                            <label htmlFor="S3">S3</label>
                            <input type="radio" id="SFTP" name="connection-type" onClick={() => {setActiveConnection('SFTP')}}/>
                            <label htmlFor="SFTP">SFTP</label>
                        </fieldset>
                    </ul>

                </nav>
                <div className="grid">
                </div>
                <div className="filesListed">
                    {
                        files.map((obj, index) => (
                            <div className="fileReturned" key={index} id={obj.fileName}>
                                <button name={obj.fileName} id={"button-" + obj.fileName} className={"outline secondary"} onClick={() => { fileSelector(obj.fileName, index, obj.fileExtensionType) }}>


                                    <div className="fileReturned" id={index}>
                                        {extension.getThumbnail(obj.fileExtensionType, obj.fileType)}
                                    </div>


                                </button>
                                <p className="fileReturnedText" extension={obj.fileExtension}>{obj.fileName}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {modal}
                </div>
            </section>
        </div>
    );
};

export default FileExplorer;
