import { useRef, useState } from 'react';
import localApi from '../../../../utils/apiHanding';

export default function FolderCreateForm({ connectionType, currentDirectory}) {
    const [name, setName] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setIsDirty(true);
    };

    const handleSubmit = async () => {
        setIsDirty(false);

        const editedName = name ? name.replace(/\/+$/, '') : '';

        try {
            console.debug(await localApi.createFolder( currentDirectory + editedName, connectionType ));
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            console.log("Epic request")
        }

    };

    return (
        <div className="container">
            <form>
                <label htmlFor="name">Folder Name:</label>
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