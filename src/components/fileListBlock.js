import extension from '../utils/extensiontools.js';
import axios from 'axios';
import { useState } from 'react';

// Wrapper component to handle button click and render FileListBlock
export default function FileListBlockWrapper() {
    const [showFiles, setShowFiles] = useState(false); // State to track button click
    const [showWaiting, setShowWaiting] = useState(false);
    const [files, setFiles] = useState([]); // State to store fetched files

    // Function to fetch files from the server
    const fetchData = async () => {
        try {
            // Make an API call to get the list of files
            const response = await axios.get('http://localhost:3000/listFiles');
            const fileList = response.data;

            // Pass the retrieved list to get sorted out to only list valid file names
            let validFiles = extension.returnValidFileNames(fileList);


            setFiles(validFiles); // Update state with valid file names
            setShowWaiting(false);

        } catch (error) {
            console.log(error);
        }
    };

    // Handler for button click
    const handleButtonClick = () => {
        setShowFiles(true); // Set showFiles to true when button is clicked
        setShowWaiting(true);
        fetchData(); // Fetch data when the button is clicked
    };

    return (
        <div>
            {/* Show button if files are not displayed */}
            {!showFiles && (
                <button onClick={handleButtonClick}>List Files</button>
            )}

            {/* Show FileListBlock component if button is clicked */}
            {showFiles && (
                <FileListBlock files={files} />
            )}

            {/* Don't show waiting if not waiting */}
            {!showWaiting && (<p></p>)}

            {/* Show waiting if waiting */}
            {showWaiting && (<p>Waiting on file list...</p>)}
        </div>
    );
}

// Component to display the file list
function FileListBlock({ files }) {
    return (
        <div>
            <div>
                {/* Render file names */}
                {files.map((fileName, index) => (
                    <p key={index}>{fileName}</p>
                ))}
            </div>
        </div>
    );
}
