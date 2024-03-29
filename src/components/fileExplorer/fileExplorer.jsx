import { useState, useEffect, useRef, createRef } from 'react';
import localApi from '../../utils/apiHanding';
import extension from '../../utils/extensiontools'
import FileUploadForm from './fileUploadForm'
import FilePreviewRenderer from './filePreviewRenderer'
import Toggle from '../buttons/toggle.jsx'

const FileExplorer = function ({ setModal }) {

    const [files, setFiles] = useState(<div aria-busy="true"></div>); // State Data for file list
    const [fileData, setFileData] = useState([]); // State Data for file list

    // Button States
    const [refreshButtonState, setRefreshButtonState] = useState({ busy: false, icon: null }) // Refresh Button State
    const [deleteButtonState, setDeleteButtonState] = useState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }) // File Deletion Button State
    const [fileUploading, setFileUploading] = useState({ busy: false, icon: <i className="fa fa-solid fa-plus"></i> }) // File Upload Button State
    const [previewButtonState, setPreviewButtonState] = useState({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> }) // File Open Button State

    const [connectionType, setConnectionType] = useState('S3');
    const [activeFile, setActiveFile] = useState({ fileName: null, index: null, fileExtensionType: null });

    const fileIconRefs = useRef([]); // Create a reference to the file list
    const fileBusyRefs = useRef([]); // Create a reference to the file list
    const fileBusy = useRef();

    const [queryingFiles, setQueryingFiles] = useState(false);

    // Set the active connection type
    const setActiveConnection = (value) => {
        setConnectionType(value);
    }

    const explorerButtonLoading = {
        refresh: (boolean) => {
            (boolean === true ? setRefreshButtonState({ busy: true, icon: null }) : setRefreshButtonState({ busy: false, icon: <i className="fa fa-solid fa-rotate-right"></i> }))
        },
        preview: (boolean) => {
            (boolean === true ? setPreviewButtonState({ busy: true, icon: undefined }) : setPreviewButtonState({ busy: false, icon: <i className="fa fa-solid fa-eye"></i> }))
        },
        delete: (boolean) => {
            (boolean === true ? setDeleteButtonState({ busy: true, icon: null }) : setDeleteButtonState({ busy: false, icon: <i className="fa fa-solid fa-trash"></i> }))
        },
        upload: (boolean) => {
            (boolean === true ? setFileUploading({ busy: true, icon: null }) : setFileUploading({ busy: false, icon: <i className="fa fa-solid fa-plus"></i> }))
        }
    };

    const selectedFile = {
        clear: () => {
            setActiveFile({ fileName: null, index: null, fileExtensionType: null });
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
                } else {
                    explorerButtonLoading.delete(true) // Set file deletion state to busy
                    selectedFile.setLoading(index); // Set the deleting file to a loading state

                    const response = async () => { await localApi.deleteFile(activeFile.fileName, connectionType); }
                    console.log(await response())

                    refreshFiles();
                }
            } catch (error) {
                console.log('Error fetching files:', error.message);
            } finally {
                explorerButtonLoading.delete(false) // Set file delete button state to not busy
                setActiveFile({ fileName: null, index: null, fileExtensionType: null });
            }
        }
    }


    // Re-renders the file list. Run every time fileData is updated or activeFile is updated
    const renderFiles = () => {

        setFiles(() => {
            let renderedFiles = []

            fileData.map((obj, index) => (
                renderedFiles.push(
                    <div className="fileReturned" key={index} id={obj.fileName}>
                        <button ref={fileIconRefs[index]} name={obj.fileName} id={"button-" + obj.fileName} className={(obj.fileName === activeFile.fileName ? "fileReturnedButtonSelected secondary" : "fileReturnedButton secondary")} onClick={() => { fileSelector(obj.fileName, index, obj.fileExtensionType) }}>
                            <div className={`${(obj.fileName === activeFile.fileName ? "fileReturnedIconSelected" : "fileReturnedIcon")} fileReturned`} id={index} aria-busy={fileBusyRefs.current[index].current}>
                                {fileIconRefs.current[index].current}{/* {extension.getThumbnail(obj.fileExtensionType, obj.fileType)} */}
                            </div>
                        </button>
                        <p className="fileReturnedText" extension={obj.fileExtension}>{obj.fileName}</p>
                    </div>)
            ))

            return renderedFiles
        }); // Update file state variable
    };

    // Grabs the file list. Run every time the refresh button is clicked or the connection type is changed
    const refreshFiles = async () => {

        const createRefs = (fileList) => {
            fileList.map((obj, index) => {
                fileIconRefs.current[index] = createRef();
                fileIconRefs.current[index].current = extension.getThumbnail(obj.fileExtensionType, obj.fileType);

                fileBusyRefs.current[index] = createRef();
                fileBusyRefs.current[index].current = "false";
            })
        };

        try {
            setQueryingFiles(true); // Set querying state to true
            explorerButtonLoading.refresh(true) // Set the file list to a loading state
            setFiles(<div aria-busy="true"><p style={{ color: "white" }}>Loading...</p></div>); // Set the file list to a loading state

            const data = localApi.requestFiles(connectionType)
            let fileList = await data

            createRefs(fileList);
            setFileData(fileList);

        } catch (error) {
            console.log('Error fetching files: ' + error.message); // Handle error if API request fails
            setFileData([{ fileName: "No files found", fileType: '-', fileExtension: "Dir", fileExtensionType: "Dir" }]);
        } finally {
            explorerButtonLoading.refresh(false) // Set the file list to a loading state
            setQueryingFiles(false); // Set querying state to false
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

    const getFilePreview = async function (fileName, index, fileExtensionType) {

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
            setQueryingFiles(true); // Set querying state to true
            explorerButtonLoading.preview(true); // Set the file opening state to busy
            selectedFile.setLoading(index); // Set the selected file to a loading state

            const response = await localApi.getFile(fileName, connectionType); // Query the file
            const blob = new Blob([response.data], { type: `image/${extension.getFromFileName(fileName)}` }); // Create a blob from the file data 

            openPreviewModal(blob, fileExtensionType, fileName);

        } catch (error) { console.log(error) } finally {

            explorerButtonLoading.preview(false); // Set the file preview button state to not busy

            selectedFile.setNotLoading(index);
            selectedFile.clear();

            setQueryingFiles(false); // Set querying state to false
        }

    };

    // Run every time file is selected
    const fileSelector = async (fileName, index, fileExtensionType) => {
        if (queryingFiles) {
            return; // If querying files, return without performing any action
        } else if ((fileName === null)) { // If no fileName was passed to the function

            console.log("No File Name Passed To File Selector")

        } else if (activeFile.fileName === null || activeFile.fileName === undefined) { // If no file is currently selected

            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

        } else if (activeFile.fileName === fileName) { // If the file clicked is the same as the one selected

            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType }); // Set the active file to the one just clicked on
            selectedFile.clear();
            return (getFilePreview(fileName, index, fileExtensionType));

        } else if (activeFile.fileName !== fileName) { // If the file clicked is different from the one selected

            setActiveFile({ fileName: fileName, index: index, fileExtensionType: fileExtensionType });

        }
    }


    // Fetch files on load
    useEffect(() => {
        renderFiles();
    }, [activeFile, fileData, fileBusy.current]);

    return (
        <div className="container">

            {useEffect(() => {
                refreshFiles();
            }, [connectionType])}

            {/** File Explorer Nav */}
            <nav style={{ padding: "20px" }}>
                <ul /** file explorer buttons */ >
                    <button aria-busy={refreshButtonState.busy} onClick={() => { refreshFiles(); }} className="contrast fileExplorerButton">{refreshButtonState.icon}</button>
                    <button aria-busy={previewButtonState.busy} onClick={() => { (activeFile.fileName === null ? console.log('No File Selected') : fileSelector(activeFile.fileName, activeFile.index, activeFile.fileExtensionType)) }} className="contrast fileExplorerButton">{previewButtonState.icon}</button>
                    <button aria-busy={deleteButtonState.busy} onClick={() => { selectedFile.delete(activeFile.index) }} className="contrast fileExplorerButton">{deleteButtonState.icon}</button>
                    <button aria-busy={fileUploading.busy} onClick={() => { openUploadModal(connectionType) }} className="contrast fileExplorerButton">{fileUploading.icon}</button>
                </ul>
                <ul /** S3 or SFTP radio button */ >
                    <Toggle func={setActiveConnection} text1={'S3'} text2={'SFTP'} opt1Param={'S3'} opt2Param={'SFTP'} stateVar={connectionType} />
                </ul>
            </nav>

            <hr style={{ marginTop: "0px" }}></hr>

            <div className="filesListed" /** File List */>
                {files /** updated by fileSelector function */}
            </div>

        </div>
    );
};

export default FileExplorer;
