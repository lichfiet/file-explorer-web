import { useState } from 'react';
import localApi from '../../utils/apiHanding';
import extension from '../../utils/extensiontools'

const FileExplorer = function () {

    const [modal, setModal] = useState(null)

    const [files, setFiles] = useState([]); // State Data for file list
    const [filesLoading, setFilesLoading] = useState({ busy: false, text: "Refresh" }) // Refresh Button State
    const [fileDeleting, setFileDeleting] = useState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }) // File Deletion Button State
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
                innerText: ("Open")
            },
            state: {
                busy: false,
                innerText: ("Open")
            }
        },
        deleteFile: {
            busy: false,
            innerText: (<i className="fa fa-solid fa-trash"></i>)
        },
        refreshList: {
            busy: false,
            innerText: ("False")
        }
    }

    // state object used to manage loading value for buttons
    const [buttonLoadingStates, setButtonLoading] = useState({
        openFile: buttonLoading.openFile.standby,
        deleteFile: {
            busy: buttonLoading.deleteFile.busy,
            innerText: buttonLoading.deleteFile.innerText
        },
        refreshList: {
            busy: buttonLoading.refreshList.busy,
            innerText: buttonLoading.refreshList.innerText
        }
    })

    // Grab the file list
    const fetchFiles = async () => {
        setFilesLoading({ busy: true, text: null }) // make button loading

        
        // Request file list data from Api
        try {
            let fileData // Req
            fileData = await localApi.requestFiles(connectionType)

            setFiles(fileData); // Update file state variable
            console.log("Logging Data") // Log
            console.log(fileData)

        } catch (error) {
            console.error('Error fetching files:', error); // Handle error if API request fails
        } finally {
            for (let n = 0; n < files.length; n++) {

                let file = document.getElementById("button-" + files[n].fileName)


                file.className = 'outline secondary';


                console.log(files[n], extension.getThumbnail(files[n].fileExtensionType, files[n].fileType))
            } 
    
        }

        setFilesLoading({ busy: false, text: "Refresh" }) // Reset Loading State

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

    const fileSelector = function (fileName, index, fileExtensionType) {

        if (activeFile.fileName === fileName) {

            const FilePanePreview = async function (fileName, index, fileExtensionType) {


                setActiveFile(
                    {
                        fileName: fileName,
                        index: index,
                        fileExtensionType: fileExtensionType
                    });

                let exttype = fileExtensionType
                let button = document.getElementById(`${index}`)

                let oldval = button.innerHTML

                button.innerHTML = ""
                button.setAttribute('aria-busy', 'true');


                console.log(fileName);

                if (exttype === 0 || exttype === 1) {
                    try {
                        const response = await localApi.getFile(fileName, connectionType);
                        console.log("1")
                        const blob = new Blob([response.data]);
                        // Check if component is still mounted
                        const filetest = URL.createObjectURL(blob);

                        setModal(
                            <dialog open>
                                <article>
                                    <header>
                                        <a href="#close" aria-label="Close" className="close" onClick={() => { setModal(null); setActiveFile({ fileName: null, index: null, fileExtensionType: null }) }}></a>
                                        File Preview
                                    </header>
                                    <h4>{fileName}</h4>
                                    <img src={filetest} alt="File Preview" />
                                </article>
                            </dialog>
                        );

                        // Remove Contrast from the button
                        const fileElement = document.getElementById("button-" + fileName)
                        fileElement.className = (fileSelected)

                    } catch (error) {
                        console.error('There was an error:', error);

                        const fileElement = document.getElementById("button-" + fileName)
                        fileElement.className = (fileSelected)
                    }
                } else if (exttype === 2) {
                    try {
                        const response = await localApi.getFile(fileName, connectionType);
                        console.log("1")
                        const blob = new Blob([response.data]);
                        const videotest = URL.createObjectURL(blob);

                        setModal(
                            <dialog open>
                                <article>
                                    <header>
                                        <button aria-label="Close" className="close" onClick={() => { setModal(null); setActiveFile({ fileName: null, index: null, fileExtensionType: null }) }}></button>
                                        File Preview
                                    </header>
                                    <h4>{fileName}</h4>
                                    <video controls="true" autoPlay="true" src={videotest}></video>
                                </article>
                            </dialog>
                        );

                        // Remove Contrast from the button
                        const fileElement = document.getElementById("button-" + fileName)
                        fileElement.className = (fileSelected)

                    } catch (error) {
                        console.error('There was an error:', error);

                        const fileElement = document.getElementById("button-" + fileName)
                        fileElement.className = (fileSelected)
                    }
                }


                button.innerHTML = (oldval === null ? "n/a" : oldval)
                button.setAttribute('aria-busy', 'false')

                setActiveFile({ fileName: null, index: null, fileExtensionType: null })

                buttonLoading.openFile.state = buttonLoading.openFile.standby

            };


            return (FilePanePreview(fileName, index, fileExtensionType));
        } else if (activeFile.fileName === null || activeFile.fileName === undefined && fileName !== null) {
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
                        <button aria-busy={filesLoading.busy} onClick={() => { fetchFiles() }} className="fileExplorerButton">{filesLoading.text}</button>
                    </ul>
                    <ul>
                        <fieldset>
                            <input type="radio" id="S3" name="connection-type" onClick={() => {setActiveConnection('S3')}}/>
                            <label htmlFor="S3">S3</label>
                            <input type="radio" id="SFTP" name="connection-type" onClick={() => {setActiveConnection('SFTP')}}/>
                            <label htmlFor="SFTP">SFTP</label>
                        </fieldset>
                    </ul>
                    <ul>
                        <button aria-busy={buttonLoadingStates.openFile.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : fileSelector(activeFile.fileName, activeFile.index, activeFile.fileExtensionType)) }} className="fileExplorerButton">{buttonLoadingStates.openFile.innerText}</button>
                        <button aria-busy={fileDeleting.busy} onClick={() => { deleteFile(activeFile) }} className="fileExplorerButton">{fileDeleting.icon}</button>
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
