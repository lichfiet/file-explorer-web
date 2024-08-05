import { useRef, useState } from 'react';
import localApi from '../../../../utils/apiHanding';

export default function FolderCreateForm({ connectionType, currentDirectory, closeModal }) {
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
            closeModal();
        }

    };

    return (
        <div className="container">
            <form>
                <label htmlFor="name">Folder Name:</label>
                <input
                    defaultValue="Folder Name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    onFocus={(event) => event.target.value = ''}
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