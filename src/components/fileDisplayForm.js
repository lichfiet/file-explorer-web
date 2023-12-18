import { useRef, useState, useEffect } from 'react';

import extension from '../utils/extensiontools.js';
import axios from 'axios';


export default function FileDisplayForm() {
    const imgElement = useRef(null);
    const vidElement = useRef(null);
    const fileNameRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false); // Added state to track component mount status
    const [delIsMounted, setDelIsMounted] = useState(false); // Added state to track component mount status

    useEffect(() => {
        setIsMounted(true); // Set isMounted to true when component mounts
        return () => setIsMounted(false); // Set isMounted to false when component unmounts
    }, []);

    useEffect(() => {
        setDelIsMounted(true); // Set isMounted to true when component mounts
        return () => setDelIsMounted(false); // Set isMounted to false when component unmounts
    }, []);

    const getFile = async () => {
        const fileName = fileNameRef.current.value;

        const ext = extension.getFromFileName(fileName)

        const validity = extension.checkValid(ext);
        console.log(validity)

        if ([0, 1].includes(validity[0]) === true) {
            try {
                const response = await fetch(`http://localhost:3000/getFile/${fileName}`);
                if (!response.ok) {
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
            }
        }
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
    

    // HTML Form Returned
    return (
        <div>
            <br></br>
            <h3>Fetch Image/Video from SFTP Server</h3>
            <form>
                <label htmlFor="fileName">Image Name:</label>
                <input type="text" id="fileName" name="fileName" ref={fileNameRef}></input>
            </form>
            <div class="container">
                <button onClick={getFile} class="contrast fileDisplay">Fetch Image/Video</button>
                <button onClick={deleteFile} class="secondary outline fileDisplay">Delete Image/Video</button>
            </div>
            <div style={{padding: "20px"}}>
                <img ref={imgElement} src="" alt="" style={{display: "block", padding: "20px"}}></img>
                <video ref={vidElement} src="" autoPlay={true}></video>
            </div>
        </div>
    )
}