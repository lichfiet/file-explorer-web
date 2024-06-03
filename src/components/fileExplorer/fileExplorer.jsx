import { useState, useEffect, useRef, createRef } from 'react';
import localApi from '../../utils/apiHanding';
import extension from '../../utils/extensiontools'
import FileUploadForm from './fileUploadForm'
import FileEditForm from './fileEditModal.jsx';
import FilePreviewRenderer from './filePreviewRenderer'
import FolderCreateForm from './folderCreateModal'
import FileNavigationTree from './fileTree.jsx';

import Toggle from '../buttons/toggle.jsx'


const FileExplorer = function ({ setModal, showError }) {

    const [files, setFiles] = useState(<div aria-busy="true"></div>); // State Data for file list
    const [fileData, setFileData] = useState([]); // State Data for file list

    // Button States
    const [refreshButtonState, setRefreshButtonState] = useState({ busy: false, icon: null }) // Refresh Button State
    const [deleteButtonState, setDeleteButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-up-from-bracket"></i> }) // File Upload Button State
    const [previewButtonState, setPreviewButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-eye"></i> }) // File Open Button State
    const [editButtonState, setEditButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-regular fa-pen-to-square"></i> }) // File Open Button State
    const [createFolderButtonState, setCreateFolderButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-folder-plus"></i> }) // Create Folder Button State
    const [upDirectoryButtonState, setUpDirectoryButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-up"></i> })
    const [previousDirectoryButtonState, setPreviousDirectoryButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-left"></i> })

    const [connectionType, setConnectionType] = useState('S3');
    const [activeFile, setActiveFile] = useState({ fileName: null, index: null, fileExtensionType: null, directory: null });
    const [currentDirectory, setCurrentDirectory] = useState('');
    const [directoryHistory, setDirectoryHistory] = useState([]);

    const fileIconRefs = useRef([]); // Create a reference to the file list
    const fileBusyRefs = useRef([]); // Create a reference to the file list
    const fileBusy = useRef();

    const [fileRetrievalInProgress, setFileRetrievalInProgress] = useState(false);

    // Set the active connection type
    const setActiveConnection = (value) => {
        setConnectionType(value);
    }

    const emptyDiv = <i className="squareIcon fa fa-solid" aria-busy={true} ></i>;
    const explorerButtonLoading = {
        refresh: (boolean) => {
            (boolean === true ? setRefreshButtonState({ busy: false, icon: emptyDiv }) : setRefreshButtonState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-rotate-right"></i> }))
        },
        preview: (boolean) => {
            (boolean === true ? setPreviewButtonState({ busy: false, icon: emptyDiv }) : setPreviewButtonState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-eye"></i> }))
        },
        delete: (boolean) => {
            (boolean === true ? setDeleteButtonState({ busy: false, icon: emptyDiv }) : setDeleteButtonState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-trash"></i> }))
        },
        upload: (boolean) => {
            (boolean === true ? setFileUploading({ busy: false, icon: emptyDiv }) : setFileUploading({ busy: false, icon: <i className="squareIcon fa fa-solid fa-plus"></i> }))
        },
        edit: (boolean) => {
            (boolean === true ? setEditButtonState({ busy: false, icon: emptyDiv }) : setEditButtonState({ busy: false, icon: <i className="squareIcon fa fa-regular fa-pen-to-square"></i> }))
        },
        create: (boolean) => {
            (boolean === true ? setCreateFolderButtonState({ false: false, icon: emptyDiv }) : setCreateFolderButtonState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-folder-plus"></i> }))
        }
    };

    const selectedFile = {
        clear: () => {
            setActiveFile({ fileName: null, index: null, fileExtensionType: null, directory: null });
        },
        setLoading: async (index) => {
            let icon = fileIconRefs.current[index].current;

            fileIconRefs.current[index].current = <></>
            fileBusyRefs.current[index].current = "true";
            fileBusy.current = icon;
        },
        setNotLoading: (index) => {
            fileIconRefs.current[index].current = fileBusy.current;
            fileBusyRefs.current[index].current = "false";
        },
        delete: async (index) => {
            try {
                if (activeFile.fileName === null) {
                    throw new Error("No File Selected")
                } else if (activeFile.fileExtensionType = 3) {
                    explorerButtonLoading.delete(true) // Set file deletion state to busy
                    selectedFile.setLoading(index); // Set the deleting file to a loading state

                    const response = async () => { await localApi.deleteFolder(activeFile.directory, connectionType); }
                    console.log(await response());

                    refreshFiles();
                } else {
                    explorerButtonLoading.delete(true) // Set file deletion state to busy
                    selectedFile.setLoading(index); // Set the deleting file to a loading state

                    const response = async () => { await localApi.deleteFile(activeFile.directory, connectionType); }
                    console.log(await response())

                    refreshFiles();
                }
            } catch (error) {
                console.log('Error fetching files:', error.message);
            } finally {
                explorerButtonLoading.delete(false) // Set file delete button state to not busy
                setActiveFile({ fileName: null, index: null, fileExtensionType: null, directory: null });
            }
        }
    }


    // Re-renders the file list. Run every time fileData is updated or activeFile is updated
    const renderFiles = () => {
        setFiles(() => {
            let renderedFiles = []
            if (fileData === undefined || fileData === null || fileData == []) {
                return;
            } else {
            fileData.map((obj, index) => (
                renderedFiles.push(
                    <div className="fileReturned" key={index} id={obj.name}>
                        <button ref={fileIconRefs[index]} name={obj.name} id={"button-" + obj.name} directory={obj.directory} className={(obj.name === activeFile.fileName ? "fileReturnedButtonSelected secondary" : "fileReturnedButton secondary")} onClick={() => { fileSelector(obj.name, index, obj.extensionType, obj.directory), console.log("renderfiled directory: " + obj.directory) }}>
                            <div className={`${(obj.name === activeFile.fileName ? "fileReturnedIconSelected" : "fileReturnedIcon")} fileReturned`} id={index} aria-busy={fileBusyRefs.current[index].current}>
                                {fileIconRefs.current[index].current}{/* {extension.getThumbnail(obj.extensionType, obj.type)} */}
                            </div>
                        </button>
                        <p className="fileReturnedText" extension={obj.extension}>{obj.name}</p>
                    </div>)
            ))

            return renderedFiles

            }
        }); // Update file state variable
    };

    // Grabs the file list. Run every time the refresh button is clicked or the connection type is changed
    const refreshFiles = async () => {

        const createRefs = (fileList) => {
            if (fileList === undefined || fileList === null || fileList == []) {
                return
            } else {
            fileList.map((obj, index) => {
                // create ref for icon
                fileIconRefs.current[index] = createRef();
                fileIconRefs.current[index].current = extension.getThumbnail(obj.extensionType, obj.type);

                // create ref for busy state
                fileBusyRefs.current[index] = createRef();
                fileBusyRefs.current[index].current = "false";
            })
        }
        };

        try {
            setFileRetrievalInProgress(true); // Set querying state to true
            explorerButtonLoading.refresh(true) // Set the file list to a loading state
            setFiles(<div aria-busy="true" style={{ alignContent: "center", justifyContent: "center", display: "flex-box", margin: "100%", position: "relative" }}><p style={{ color: "white", alignContent: "center", justifyContent: "center" }}>Loading...</p></div>); // Set the file list to a loading state

            const response = await localApi.requestFiles(connectionType, currentDirectory)
            let fileData = await response;

            const validatedResponse = async (fileData) => { 
                if (await fileData.length === 0) {
                    fileData = []
                    console.log("meow")
                    showError("No files found in this directory")
                } else {
                    return;
                } 
            }
            await validatedResponse(fileData);

            createRefs(fileData);
            setFileData(fileData);

        } catch (error) {
            setFileData([]);
            createRefs([]);
            showError("Error Occured Retrieving Files From Remote")

            console.log('Error fetching files: ' + error.message); // Handle error if API request fails
        } finally {
            explorerButtonLoading.refresh(false) // Set the file list to a loading state
            setFileRetrievalInProgress(false); // Set querying state to false
        }
    }

    const openUploadModal = (connectionType) => {
        setModal(
            <dialog open className="dialogs">
                <article className="modals">
                    <header className='modals-header'>
                        <a href="#close" aria-label="Close" className="close" onClick={async () => { setModal(null); refreshFiles(); selectedFile.clear(); }}></a>
                        File Upload
                    </header>
                    <FileUploadForm method={connectionType}></FileUploadForm>
                </article>
            </dialog>
        )
    };

    const getFileEditorModal = async (fileName, index, connectionType) => {

        const openEditModal = (fileName, connectionType) => {
            setModal(
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={async () => { setModal(null); refreshFiles(); selectedFile.clear(); }}></a>
                            Editing {fileName}
                        </header>
                        <FileEditForm method={connectionType} fileName={fileName}></FileEditForm>
                    </article>
                </dialog>
            )
        };


        console.log("Editing File: " + fileName)

        try {
            editButtonState.busy = true; // Set the file opening state to busy
            selectedFile.setLoading(index); // Set the selected file to a loading state

            openEditModal(fileName, connectionType);
        } catch (error) {
            console.log(error)
        } finally {

            editButtonState.busy = false; // Set the file preview button state to not busy

            selectedFile.setNotLoading(index);
            selectedFile.clear();
        }

    }


    const getFilePreviewModal = async function (fileName, index, fileExtensionType) {

        const openPreviewModal = (selectedFileData, selectedFileType, selectedFileName) => {
            setModal(
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={() => { setModal(null); selectedFile.clear() }}></a>
                            {activeFile.fileName}
                        </header>
                        <FilePreviewRenderer fileInputData={selectedFileData} fileType={selectedFileType} fileName={selectedFileName}></FilePreviewRenderer>
                    </article>
                </dialog>
            )
        }

        try {
            setFileRetrievalInProgress(true); // Set querying state to true
            explorerButtonLoading.preview(true); // Set the file opening state to busy
            selectedFile.setLoading(index); // Set the selected file to a loading state

            const response = await localApi.getFile(activeFile.directory, connectionType); // Query the file
            const blob = new Blob([response.data], { type: `image/${extension.getFromFileName(fileName)}` }); // Create a blob from the file data 

            openPreviewModal(blob, fileExtensionType, fileName);

        } catch (error) {
            console.log(error)
        } finally {

            explorerButtonLoading.preview(false); // Set the file preview button state to not busy

            selectedFile.setNotLoading(index);
            selectedFile.clear();

            setFileRetrievalInProgress(false); // Set querying state to false
        }
    };

    const getFolderCreateModal = async () => {

        const openFolderCreatorModal = (connectionType, currentDirectory) => {
            setModal(
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={async () => { setModal(null); refreshFiles(); selectedFile.clear(); }}></a>
                            Create Folder
                        </header>
                        <FolderCreateForm method={connectionType} currentDirectory={currentDirectory}></FolderCreateForm>
                    </article>
                </dialog>
            )
        }

        try {
            explorerButtonLoading.create(true); // Set the modal opening state to busy
            openFolderCreatorModal(connectionType, currentDirectory);
        } catch (error) {
            console.log(error)
        } finally {
            explorerButtonLoading.create(false); // Set the modal opening state to not busy
        }
    };

    // Run every time file is selected
    const fileSelector = async (fileName, index, fileExtensionType, filePath) => {
        const setActive = () => { setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType, directory: filePath }); }

        if (fileRetrievalInProgress) { return; } else if (fileName === null) {
            return;

        } else if (activeFile.fileName === null || undefined) {
            setActive();

        } else if (activeFile.directory === filePath) {
            setActive()
            selectedFile.clear();
            if (fileExtensionType === 3) {
                setDirectoryHistory(prevHistory => [...prevHistory, currentDirectory]);
                console.log('File Path:' + filePath)
                setCurrentDirectory(filePath);
            } else {
                return getFilePreviewModal(filePath, index, fileExtensionType);
            }

        } else if (activeFile.fileName !== fileName) {
            setActive()
        }
    }


    const navigate = async (direction) => {
        if (direction === 'up') {
            if (currentDirectory === '') {
                return;
            } else {
                const transformedDirectory = currentDirectory.endsWith('/') ? currentDirectory.slice(0, -1) : currentDirectory;
                setCurrentDirectory(transformedDirectory.substring(0, transformedDirectory.lastIndexOf('/')));
                setDirectoryHistory(prevHistory => [...prevHistory, currentDirectory]);
            }
        } else if (direction === 'previous') {
            if (directoryHistory.length > 0) {
                const previousDir = directoryHistory.pop();
                setCurrentDirectory(previousDir);
            }
        } else if (direction === 'down') {
            // Implement later
        }
    }



    // Fetch files on load
    useEffect(() => {
        renderFiles();
    }, [activeFile, fileData, fileBusy.current]);

    return (


        <div className="fileExplorerContainer">
            <div className="fileExplorerDirectoryTree">
                <FileNavigationTree fileList={files} fileSelector={fileSelector} />
            </div>
            <div className="fileExplorerInterface">
                {useEffect(() => {
                    refreshFiles();
                    console.log(currentDirectory)
                }, [connectionType, currentDirectory])}

                {/** File Explorer Nav */}
                <div>
                    <nav className="fileExplorerNav">
                        <ul /** directory buttons */>
                            <button aria-busy={previousDirectoryButtonState.busy} onClick={() => navigate('previous')} className="contrast fileExplorerButton">
                                {previousDirectoryButtonState.icon}
                            </button>
                            <button aria-busy={upDirectoryButtonState.busy} onClick={() => navigate('up')} className="contrast fileExplorerButton">
                                {upDirectoryButtonState.icon}
                            </button>
                        </ul>
                        <ul>
                            <button aria-busy={createFolderButtonState.busy} onClick={() => { getFolderCreateModal() }} className="contrast fileExplorerButton">{createFolderButtonState.icon}</button>
                            <button aria-busy={deleteButtonState.busy} onClick={() => { selectedFile.delete(activeFile.index) }} className="contrast fileExplorerButton">{deleteButtonState.icon}</button>
                            <button aria-busy={previewButtonState.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : fileSelector(activeFile.fileName, activeFile.index, activeFile.fileExtensionType, activeFile.directory)) }} className="contrast fileExplorerButton">{previewButtonState.icon}</button>
                            <button aria-busy={editButtonState.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : getFileEditorModal(activeFile.directory, activeFile.index, connectionType)) }} className="contrast fileExplorerButton">{editButtonState.icon}</button>
                            <button aria-busy={refreshButtonState.busy} onClick={() => { refreshFiles(); }} className="contrast fileExplorerButton">{refreshButtonState.icon}</button>
                            <button aria-busy={fileUploading.busy} onClick={() => { openUploadModal(connectionType) }} className="contrast fileExplorerButton">{fileUploading.icon}</button>
                        </ul>
                        <ul /** S3 or SFTP radio button */ >
                            <Toggle func={setActiveConnection} text1={'S3'} text2={'SFTP'} opt1Param={'S3'} opt2Param={'SFTP'} stateVar={connectionType} />
                        </ul>
                    </nav>
                </div>

                <hr style={{ marginTop: "0px" }}></hr>

                <div className="filesListed" /** File List */>
                    {files /** updated by fileSelector function */}
                </div>

            </div>
        </div>


    );
};

export default FileExplorer;
