import { useRef, useState, useEffect } from 'react';

import extension from '../utils/extensiontools.js';
import axios from 'axios';


export default function FileDisplayForm() {
    const imgElement = useRef(null);
    const vidElement = useRef(null);
    const fileNameRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false); // Added state to track component mount status
    const [delIsMounted, setDelIsMounted] = useState(false); // Added state to track component mount status
    const [refInfo, setCurrFile] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Set isMounted to true when component mounts
        return () => setIsMounted(false); // Set isMounted to false when component unmounts
    }, []);

    useEffect(() => {
        setDelIsMounted(true); // Set isMounted to true when component mounts
        return () => setDelIsMounted(false); // Set isMounted to false when component unmounts
    }, []);


    const getFile = async () => {
        setIsLoading(true);
        const fileName = fileNameRef.current.value;

        const ext = extension.getFromFileName(fileName)

        const validity = extension.checkValid(ext);
        console.log(validity)

        if ([0, 1].includes(validity[0]) === true) {
            try {
                const response = await fetch(`http://localhost:3000/getFile/${fileName}`);
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error('Network response was not ok');
                }
                console.log("1")
                const blob = await response.blob();
                if (isMounted) { // Check if component is still mounted
                    const imageUrl = URL.createObjectURL(blob);
                    imgElement.current.src = imageUrl;
                    console.log("2")
                }

            } catch (error) {
                console.error('There was an error:', error);
            }

        } else if ([2].includes(validity[0]) === true) {
            try {
                const response = await fetch(`http://localhost:3000/getFile/${fileName}`);
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error('Network response was not ok');
                }

                const blob = await response.blob();
                if (isMounted) { // Check if component is still mounted
                    const videoUrl = URL.createObjectURL(blob);
                    vidElement.current.src = videoUrl;
                    vidElement.current.autoplay = true;
                }

            } catch (error) {
                console.error('There was an error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        setIsLoading(false);
    };

    const deleteFile = async () => {
        const fileName = fileNameRef.current.value;

        try {
            const response = await axios.delete(`http://localhost:3000/deleteFile/${fileName}`, fileName);

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            }
            console.log("")
            if (delIsMounted) { // Check if component is still mounted
                console.log(response)
            }

        } catch (error) {
            console.error('There was an error:', error);
        }

    }


    const FileListBlockWrapper = () => {
        const [showFiles, setShowFiles] = useState(false); // State to track button click
        const [files, setFiles] = useState([]); // State to store fetched files
        const [listButton, setLoading] = useState([]); // State to store fetched files

        // Function to fetch files from the server
        const fetchData = async () => {
            try {
                // Make an API call to get the list of files
                const response = await axios.get('http://localhost:3000/listFiles');
                const fileList = response.data;

                // Pass the retrieved list to get sorted out to only list valid file names
                let validFiles = extension.returnValidFileNames(fileList);


                setFiles(validFiles); // Update state with valid file names
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        };

        // Handler for button click
        const handleButtonClick = () => {
            setFiles([])
            fetchData(); // Fetch data when the button is clicked
            setShowFiles(true); // Set showFiles to true when button is clicked
            setLoading(true);
        };

        return (
            <div>
                <button aria-busy={listButton} onClick={handleButtonClick} className="contrast">List Files</button>

                {!showFiles && (
                    <></>
                )}{/* Show button if files are not displayed */}
                {showFiles && (

                    <div>
                        <FileListBlock files={files} />
                    </div>

                )}{/* Show FileListBlock component if button is clicked */}

            </div>
        );
    }


    const FileListBlock = ({ files }) => {

        return /* Render file button elements */ (

            <div className="grid">
                {files.map((fileName, index) => (

                    <div className="thumbnail">


                        {extension.getThumbnail(fileName)}
                        <button className="secondary outline filesAdd" onClick={() => { setCurrFile(fileName) }} key={index} value={fileName}>+</button>

                        <p className="filesListed">{fileName}</p>

                    </div>

                ))}
            </div>

        );
    }


    // HTML Form Returned
    return (
        <div>
            <br></br>
            <h3>Fetch Image/Video from SFTP Server</h3>
            <form>
                <label htmlFor="fileName">Image Name:</label>
                <input type="text" id="fileName" name="fileName" ref={fileNameRef} value={refInfo} onChange={e => setCurrFile(e.target.value)}></input>
            </form>
            <div className="container">
                <button onClick={getFile} className="contrast fileDisplay" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Fetch Image/Video'}
                </button>
                <button onClick={() => { deleteFile() }} className="secondary outline fileDisplay">Delete Image/Video</button>
            </div>
            <div style={{ padding: "20px" }}>
                <img ref={imgElement} src="" alt="" style={{ display: "block", padding: "20px" }}></img>
                <video ref={vidElement} src="" autoPlay={true}></video>
            </div>
            <FileListBlockWrapper />
        </div>

    )
}