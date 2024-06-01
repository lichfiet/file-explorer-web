import { useRef, useState } from 'react';
import localApi from '../../utils/apiHanding';

export default function FileEditForm({ method, fileName }) {
    const [fileProperties, setFileProperties] = useState([]);
    const [name, setName] = useState(fileName);
    const [isDirty, setIsDirty] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setIsDirty(true);
    };

    const handleSubmit = async () => {
        setIsDirty(false);

        const formFileProps = {
            fileProperties: {
                name: name,
                director: "/",
            }
        };

        try {
            console.log(method)
            console.log(fileName)
            console.log(await localApi.modifyFile(fileName, method, formFileProps));

        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            console.log("Epic request")
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
                />
                {isDirty && (
                    <button type="button" onClick={handleSubmit}>
                        Submit Changes
                    </button>
                )}
            </form>
        </div>
    );
}