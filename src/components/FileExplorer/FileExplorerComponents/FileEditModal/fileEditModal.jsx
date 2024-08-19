import { useRef, useState, useEffect } from 'react';
import localApi from '../../../../utils/apiHanding';

export default function FileEditForm({ method, fileName, fileDirectory, closeModal, modalMethods }) {

    const [name, setName] = useState(fileName);
    const [isDirty, setIsDirty] = useState(false);
    const [isLoading, setIsLoading] = useState("Submit");

    const [eventInProgress, setEventInProgress] = useState(false);

    
    const inputRef = useRef(null); // Create a ref for the input element

    useEffect(() => {
        inputRef.current.focus(); // Focus on the input element when the component mounts
    }, []);

    const handleNameChange = (event) => {
        const input = event.target.value;

        if (input === "") {
            setIsDirty(false);
        }

        setName(input);
        setIsDirty(true);
    };

    const handleSubmit = async () => {
        if (!isDirty) { 
            modalMethods.createPopUpNotif("No changes detected", "warn");
            return; 
        } else if (eventInProgress) {
            modalMethods.createPopUpNotif("Event in progress", "warn");
            return;
        }
    
        setEventInProgress(true);
        
        // if missing a trailing slash, add it
        const updatedName = !name.endsWith("/") && fileName.endsWith("/") ? name + "/" : name ;
        setName(updatedName);
        
        const formFileProps = {
            fileProperties: {
                name: updatedName,
                directory: "/",
            }
        };
        
        setIsLoading(<>Submitting... <p aria-busy="true"></p></>)
    
        try {

            await localApi.modifyFile(fileName, method, formFileProps);
            closeModal();
    
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            console.log("Epic request, file edited")
            setEventInProgress(false);
        }
    
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };
    
    

    return (
        <div className="container">
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress} // Use onKeyDown instead of onKeyPress
                    ref={inputRef} // Assign the ref to the input element

                />
                    <button type="button" onClick={() => {handleSubmit(fileName)}}>
                        {isLoading}
                    </button>
            </form>
        </div>
    );
}