import extension from '../utils/extensiontools.js';
import axios from 'axios';
import { useState, useRef } from 'react';

// Wrapper component to handle button click and render FileListBlock
export default function FileListBlockWrapper() {
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
            <button aria-busy={listButton} onClick={handleButtonClick} class="contrast">List Files</button>

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

// Component to display the file list
function FileListBlock({ files }) {

    const updateSelected = function () {
        
    }

    return /* Render file button elements */ (

        <div class="grid">
            {files.map((fileName, index) => (
                <a href="" role="button" class="filesListed contrast" id={fileName}>
                    <div class="thumbnail">

                        {extension.getThumbnail(fileName)}
                        <button class="secondary outline filesAdd" key={index} onClick={() => {updateSelected({fileName})}}>+</button>
                        

                    </div>
                    <p class="filesListed">{fileName}</p>
                </a>
            ))}
        </div>

    );
}
