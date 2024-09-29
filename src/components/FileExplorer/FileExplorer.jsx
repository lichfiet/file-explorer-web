import { useState, useEffect, useRef, createRef } from 'react';
import localApi from '../../utils/apiHanding';
import extension from '../../utils/extensiontools'
import FileUploadForm from './FileExplorerComponents/FileUploadModal/fileUploadForm.jsx'
import FileEditForm from './FileExplorerComponents/FileEditModal/fileEditModal.jsx';
import FilePreviewRenderer from './FileExplorerComponents/FilePreviewModal/filePreviewRenderer.jsx'
import FolderCreateForm from './FileExplorerComponents/FolderCreateModal/folderCreateModal.jsx'
import FileNavigationTree from './FileExplorerComponents/FileNavigationTree/FileTree.jsx';
import VerifyDeleteForm from './FileExplorerComponents/VerifyDeleteModal/VerifyDeleteModal.jsx';

import axios from 'axios';

const FileExplorer = function ({ setModal, createPopUpNotif, closeModal }) {

    const modalMethods = {
        setModal: setModal,
        createPopUpNotif: (message, level) => {createPopUpNotif(message, level)},
        closeModal: closeModal
    };


    const [files, setFiles] = useState(<div aria-busy="true"></div>); // State Data for file list
    const [fileData, setFileData] = useState([]); // State Data for file list
    const [wholeDirectory, setWholeDirectory] = useState(); // State Data for file list

    // Button States
    const [refreshButtonState, setRefreshButtonState] = useState({ busy: false, icon: null }) // Refresh Button State
    const [deleteButtonState, setDeleteButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-up-from-bracket"></i> }) // File Upload Button State
    const [previewButtonState, setPreviewButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-eye"></i> }) // File Open Button State
    const [editButtonState, setEditButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-regular fa-pen-to-square"></i> }) // File Open Button State
    const [createFolderButtonState, setCreateFolderButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-folder-plus"></i> }) // Create Folder Button State
    const [upDirectoryButtonState, setUpDirectoryButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-up"></i> })
    const [previousDirectoryButtonState, setPreviousDirectoryButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-left"></i> })
    const [nextDirectoryButtonState, setnextDirectoryButtonState] = useState({ busy: false, icon: <i className="squareIcon fa fa-solid fa-arrow-right"></i> })

    class NullActiveFile {
        constructor() {
            this.fileName = null;
            this.index = null;
            this.fileExtensionType = null;
            this.directory = null;
            this.hasChilden = null;
        }
    }

    class ActiveFile {
        constructor(fileName, index, fileExtensionType, directory, hasChildren) {
            this.fileName = fileName;
            this.index = index;
            this.fileExtensionType = fileExtensionType;
            this.directory = directory;
            this.hasChilden = hasChildren;
        }
    }

    const [connectionType, setConnectionType] = useState('S3');
    const [activeFile, setActiveFile] = useState(new NullActiveFile());
    const [currentDirectory, setCurrentDirectory] = useState('');
    const [directoryHistory, setDirectoryHistory] = useState([]);

    const fileIconRefs = useRef([]); // Create a reference to the file list
    const fileBusyRefs = useRef([]); // Create a reference to the file list
    const fileBusy = useRef();

    const [fileEventInProgress, setFileEventInProgress] = useState(false);




    /** ------------------------------------File Explorer Button Loading State Management-------------------------------------- */

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

    /** --------------------------------File Explorer File State Management & Event Handling------------------------------------ */

    const selectedFile = {
        clear: () => {
            setActiveFile(new NullActiveFile());
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
            console.log(activeFile)

            try {
                if (activeFile.fileName === null) {
                    throw new Error("No File Selected")
                } else if (activeFile.fileExtensionType === 3) {
                    explorerButtonLoading.delete(true) // Set file deletion state to busy
                    selectedFile.setLoading(index); // Set the deleting file to a loading state

                    const response = async () => { await localApi.deleteFolder(activeFile.directory, connectionType); }
                    console.log(await response());

                    explorerButtonLoading.delete(false) // Set file delete button state to not busy
                    setActiveFile(new NullActiveFile());

                    refreshFiles();
                } else {
                    explorerButtonLoading.delete(true) // Set file deletion state to busy
                    selectedFile.setLoading(index); // Set the deleting file to a loading state

                    const response = async () => { await localApi.deleteFile(activeFile.directory, connectionType); }
                    console.log("THIS IS RUNNING")
                    console.log(await response())

                    refreshFiles();
                }
            } catch (error) {
                console.log('Error fetching files:', error.message);
            } finally {
                explorerButtonLoading.delete(false) // Set file delete button state to not busy
                setActiveFile(new NullActiveFile());
            }
        }
    };




    /** ------------------------------------File List State Management / Rendering-------------------------------------- */

    // ? Re-renders the file list. Run every time fileData is updated or activeFile is updated
    const renderFiles = () => {
        setFiles(() => {
            if (fileData === undefined || fileData === null || fileData == []) {
                return;
            } else {
                let renderedFiles = []

                fileData.map((obj, index) => {
                    const hasChildren = obj.children !== undefined && obj.children[0] !== undefined ? true : false;
                    const fullFilePath = obj.directory
                    const fileName = obj.name
                    const extension = obj.extensionType

                    const hasThumbnail = obj.thumbnailUrl !== null && obj.thumbnailUrl !== undefined ? true : false;

                    const buttonClassName = (fileName === activeFile.fileName ? "fileReturnedButtonSelected secondary" : "fileReturnedButton secondary")
                    const fileClassName = (fileName === activeFile.fileName ? "fileReturnedIconSelected fileReturned" : "fileReturnedIcon fileReturned")

                    const testbuttonClassName = (fileName === activeFile.fileName ? "fileReturnedButtonSelected secondary test2" : "fileReturnedButton secondary test")


                    const icon = (index) => { return fileIconRefs.current[index].current }
                    const iconRef = (index) => { return fileIconRefs[index] }
                    const busyRef = (index) => { return fileBusyRefs.current[index].current }

                    const handleButtonClick = async () => {
                        fileSelectionEventController(fileName, index, obj.extensionType, fullFilePath, hasChildren);
                    }

                    renderedFiles.push(
                        <div className="fileReturned" key={index} id={fullFilePath}>
                            {hasThumbnail &&
                            
                                <button className={testbuttonClassName} style={{padding: "0px", backgroundColor: "none", borderColor: "none"}} ref={iconRef(index)} name={fileName} id={"button-" + fileName} directory={fullFilePath} onClick={() => { handleButtonClick() }} 
                                >{icon(index)}
                                </button>
                               
                            }

                            {!hasThumbnail &&
                            <button ref={iconRef(index)} name={fileName} id={"button-" + fileName} directory={fullFilePath}
                                className={buttonClassName} onClick={() => { handleButtonClick() }}
                            >
                                 <div className={fileClassName}
                                    id={index}
                                    aria-busy={busyRef(index)}
                                >{icon(index)}</div>
                            </button>}
                            <p className="fileReturnedText" extension={extension}>{fileName}</p>
                        </div>
                    )
                });

                return renderedFiles

            }
        });
    };

    // ? Grabs the file list. Run every time the refresh button is clicked, connection type, or current directory is updated
    const refreshFiles = async () => {

        const createRefs = (fileList) => {
            if (fileList === undefined || fileList === null || fileList == []) {
                return
            } else {
                fileList.map((obj, index) => {
                    // create ref for icon
                    fileIconRefs.current[index] = createRef();
                    fileIconRefs.current[index].current = obj.thumbnailUrl !== null && obj.thumbnailUrl !== undefined ? <img src={obj.thumbnailUrl} alt={obj.name} style={{ width: "100%", height: "100%" }} /> : extension.getThumbnail(obj.extensionType, obj.type);
                    // create ref for busy state
                    fileBusyRefs.current[index] = createRef();
                    fileBusyRefs.current[index].current = "false";
                })
            }
        };

        try {
            setFileEventInProgress(true); // Set querying state to true
            explorerButtonLoading.refresh(true) // Set the file list to a loading state
            setFiles(<div aria-busy="true" style={{ alignContent: "center", justifyContent: "center", display: "flex-box", margin: "100%", position: "relative" }}><p style={{ color: "white", alignContent: "center", justifyContent: "center" }}>Loading...</p></div>); // Set the file list to a loading state

            const response = await localApi.requestFiles(connectionType, currentDirectory)
            let fileData = await response;

            const validatedResponse = async (fileData) => {
                if (await fileData.length === 0) {
                    fileData = []
                    createPopUpNotif("No files found in this directory", "info")
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
            createPopUpNotif("Error Occured Retrieving Files From Remote", "error")

            console.log('Error fetching files: ' + error.message); // Handle error if API request fails
        } finally {
            explorerButtonLoading.refresh(false) // Set the file list to a loading state
            setFileEventInProgress(false); // Set querying state to false
        }
    }

    /** ----------------------------------------------------------------------------------------------- */



    /**
     * EVENT HANDLING
     */

    /** ---------------------------------File Explorer Event Pre-Checks---------------------------------- */

    // ? Check if an event is in progress
    const isEventInProgress = () => {
        if (fileEventInProgress === true) {
            createPopUpNotif("Event In Progress, please wait", "warn")
            return true
        } else {
            return false
        }
    };

    // ? Check if a file is selected
    const isFileSelected = () => {
        if (activeFile.fileName === null) {
            createPopUpNotif("No File Selected", "info")
            return false
        } else {
            return true
        }
    };

    /** ---------------------------------File Explorer Event Handlers---------------------------------- */
    // ? These events are called by buttons AND other events in the file explorer

    const handleFilePreviewEvent = async (fileName, index, fileExtensionType) => {
        if (isEventInProgress() || !isFileSelected()) {
            return;
        }

        const closeModal = async () => { setModal(null); refreshFiles(); selectedFile.clear(); }
        const openPreviewModal = (selectedFileData, selectedFileType, selectedFileName) => {
            setModal(<FilePreviewRenderer fileInputData={selectedFileData} fileType={selectedFileType} fileName={activeFile.fileName} closeModal={closeModal} />)
        }

        try {
            setFileEventInProgress(true); // Set querying state to true
            explorerButtonLoading.preview(true); // Set the file opening state to busy
            selectedFile.setLoading(index); // Set the selected file to a loading state

            const response = await localApi.getFile(activeFile.directory, connectionType); // Query the file
            const selectedFileData = new Blob([response.data], { type: `media/*` }); // Create a blob from the file data 
            openPreviewModal(selectedFileData, fileExtensionType, fileName);
        } catch (error) {
            console.log('Error fetching file:', error.message); // Handle error if API request fails
            createPopUpNotif('Error occurred requesting file' + error.message, "error")
        } finally {
            console.log("meow")
            explorerButtonLoading.preview(false);
            selectedFile.setNotLoading(index);
            selectedFile.clear(); // Clear the selected file
            setFileEventInProgress(false); // Set querying state to false
        }
    }

    const handleFileDeleteEvent = async () => {
        if (isEventInProgress() || !isFileSelected()) {
            return;
        }

        explorerButtonLoading.delete(true) // Set file deletion state to busy
        selectedFile.setLoading(activeFile.index); // Set the deleting file to a loading state

        if (activeFile.fileExtensionType === 3) {
            const response = async () => { await localApi.deleteFolder(activeFile.directory, connectionType); }

            const deleteFunction = async () => {
                await createPopUpNotif(await response(), "info");
                await refreshFiles();
            }

            try {

                if (activeFile.hasChilden === true) {
                    setModal(
                        <dialog open className="dialogs">
                            <article className="modals">
                                <header className='modals-header'>
                                    <a href="#close" aria-label="Close" className="close" onClick={async () => { closeModal(); }}></a>
                                    {activeFile.fileName}
                                </header>
                                <VerifyDeleteForm deleteFunction={deleteFunction} closeModal={closeModal} />
                            </article>
                        </dialog>
                    )

                } else {
                    await createPopUpNotif(await response(), "info");
                }


            } catch (error) {
                createPopUpNotif("Error Deleting File", "error")
            }
        } else {
            try {
                const response = async () => { await localApi.deleteFile(activeFile.directory, connectionType); }
                createPopUpNotif(await response(), "info");
            } catch (error) {
                createPopUpNotif("Error Deleting File", "error")
            }
        }

        explorerButtonLoading.delete(false) // Set file delete button state to not busy
        setActiveFile(new NullActiveFile());
        refreshFiles();
    }

    const handleForceFileSelectorEvent = async (fileName, index, fileExtensionType, parentDir, filePath) => {
        if (isEventInProgress()) {
            return;
        }

        setFileEventInProgress(true)

        try {
            if (fileExtensionType === 3) {
                setDirectoryHistory(prevHistory => [...prevHistory, currentDirectory]);
                console.log('File Path:' + parentDir)
                setCurrentDirectory(parentDir);
                setActiveFile(new NullActiveFile());
            } else {
                setDirectoryHistory(prevHistory => [...prevHistory, currentDirectory]);
                console.log('File Path:' + filePath)
                setCurrentDirectory(filePath);
            }
        } catch (error) {
            createPopUpNotif(error.message, "error")
        } finally {
            selectedFile.clear();
            setFileEventInProgress(false)
        }


    };

    const fileSelectionEventController = async (fileName, index, fileExtensionType, filePath, hasChildren) => {
        try {
            if (isEventInProgress()) {
                return;
            } else if (!activeFile.fileName === null || activeFile.fileName === undefined || activeFile.fileName !== fileName) {
                setActiveFile(new ActiveFile(fileName, index, fileExtensionType, filePath, hasChildren))
            } else if (activeFile.directory === filePath && fileExtensionType == 3) {
                setActiveFile(new ActiveFile(fileName, index, fileExtensionType, filePath, hasChildren))
                selectedFile.clear();
                setDirectoryHistory(prevHistory => [...prevHistory, currentDirectory]);
                setCurrentDirectory(filePath);
            } else if (activeFile.directory === filePath && fileExtensionType !== 3) {
                setActiveFile(new ActiveFile(fileName, index, fileExtensionType, filePath, hasChildren))
                selectedFile.clear();
                handleFilePreviewEvent(filePath, index, fileExtensionType);
            }
        } catch (error) {
            createPopUpNotif(error.message, "error")
        }
    }

    /** ---------------------------------File Explorer Button Event Handlers---------------------------------- */

    const handUploadButtonClick = () => {
        if (isEventInProgress()) {
            return;
        }

        const closeModal = async () => { setModal(null); refreshFiles(); selectedFile.clear(); }

        setModal(<FileUploadForm method={connectionType} closeModal={closeModal} currentDirectory={currentDirectory}></FileUploadForm>)
    };

    const handFileEditButtonClick = async () => {
        if (isEventInProgress() || !isFileSelected()) {
            return;
        }

        const openEditModal = () => {
            const closeModal = async () => { setModal(null); refreshFiles(); selectedFile.clear(); }

            setModal(
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={async () => { closeModal(); }}></a>
                            Editing: {activeFile.fileName}
                        </header>
                        <FileEditForm 
                        method={connectionType} 
                        fileName={activeFile.directory} 
                        fileDirectory={activeFile.directory} 
                        closeModal={closeModal}
                        modalMethods={modalMethods} 
                        />
                    </article>
                </dialog>
            )
        };

        try {
            editButtonState.busy = true; // Set the file opening state to busy
            selectedFile.setLoading(activeFile.index); // Set the selected file to a loading state
            openEditModal();
        } catch (error) {
            console.log(error)
        } finally {
            editButtonState.busy = false; // Set the file preview button state to not busy
            selectedFile.clear();
        }

    }

    const handleFilePreviewButtonClick = async () => {
        if (isEventInProgress() || !isFileSelected()) {
            return;
        }

        await handleFilePreviewEvent(activeFile.fileName, activeFile.index, activeFile.fileExtensionType);
    }

    const handleFolderCreateButtonClick = async () => {
        if (isEventInProgress()) {
            return;
        }

        const openFolderCreatorModal = (connectionType, currentDirectory) => {
            const finishModal = async () => { closeModal(); refreshFiles(); selectedFile.clear(); }

            setModal(
                <dialog open className="dialogs">
                    <article className="modals">
                        <header className='modals-header'>
                            <a href="#close" aria-label="Close" className="close" onClick={async () => { await finishModal(); }}></a>
                            Create Folder
                        </header>
                        <FolderCreateForm connectionType={connectionType} currentDirectory={currentDirectory} closeModal={finishModal} ></FolderCreateForm>
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

    const handleDeleteButtonClick = async () => {
        if (isEventInProgress() || !isFileSelected()) {
            return;
        }

        await handleFileDeleteEvent();
    }

    const navigate = async (direction) => {
        if (isEventInProgress()) {
            return;
        }

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
        } else if (direction === 'next') {
            if (directoryHistory.length > 0) {
                const nextDir = directoryHistory.shift(-1);
                setCurrentDirectory(nextDir);
            }
        }
    }

    /** ----------------------------------------------------------------------------------------------- */




    /**
     * USE EFFECTS
     */

    // Fetch files on load and when the current directory changes
    useEffect(() => {
        renderFiles();
    }, [activeFile, fileData, fileBusy.current]);

    // Fetch whole directory for fileTree and searchBox on load and when the current directory changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/listFiles/`, {
                    headers: {
                        'method': `S3`,
                        'sessionid': 'true',
                        'Access-Control-Allow-Credentials': 'true',
                    }
                });
                setWholeDirectory(response.data);
            } catch (error) {
                console.error('Error fetching tree and search data:', error);
            }
        };

        fetchData();
    }, [fileData]);



    return (
        <div className="fileExplorerContainer">
            <div className="mobilevisiblity navtreevisiblity">
                <FileNavigationTree fileList={wholeDirectory} fileSelector={handleForceFileSelectorEvent} />
            </div>
            <div className="fileExplorerInterface">
                {useEffect(() => {
                    refreshFiles();
                }, [currentDirectory])}



                {/** File Explorer Nav */}
                <div>
                    <nav className="fileExplorerNav">
                        <ul /** directory navigation buttons */>
                            <button aria-busy={previousDirectoryButtonState.busy} onClick={() => navigate('previous')} className="contrast fileExplorerButton mobilevisiblity">{previousDirectoryButtonState.icon}</button>
                            <button aria-busy={nextDirectoryButtonState.busy} onClick={() => navigate('next')} className="contrast fileExplorerButton mobilevisiblity">{nextDirectoryButtonState.icon}</button>
                            <button aria-busy={upDirectoryButtonState.busy} onClick={() => navigate('up')} className="contrast fileExplorerButton">{upDirectoryButtonState.icon}</button>
                        </ul>
                        <ul /** file interaction buttons */ style={{ justifyContent: "end" }}>
                            <button aria-busy={createFolderButtonState.busy} onClick={() => { handleFolderCreateButtonClick() }} className="contrast fileExplorerButton">{createFolderButtonState.icon}</button>
                            <button aria-busy={deleteButtonState.busy} onClick={() => { handleDeleteButtonClick() }} className="contrast fileExplorerButton">{deleteButtonState.icon}</button>
                            <button aria-busy={previewButtonState.busy} onClick={() => { handleFilePreviewButtonClick() }} className="contrast fileExplorerButton">{previewButtonState.icon}</button>
                            <button aria-busy={editButtonState.busy} onClick={() => { handFileEditButtonClick() }} className="contrast fileExplorerButton">{editButtonState.icon}</button>
                            <button aria-busy={refreshButtonState.busy} onClick={() => { refreshFiles(); }} className="contrast fileExplorerButton">{refreshButtonState.icon}</button>
                            <button aria-busy={fileUploading.busy} onClick={() => { handUploadButtonClick() }} className="contrast fileExplorerButton">{fileUploading.icon}</button>
                        </ul>
                    </nav>
                </div>
                <hr style={{ marginTop: "4px" }}></hr>



                {/* File Explorer File List 
                reredender files when fileData is updated or activeFile is updated
                */}
                <div className="filesListed">
                    {files}                
                </div>



            </div>
        </div>


    );
};

export default FileExplorer;
