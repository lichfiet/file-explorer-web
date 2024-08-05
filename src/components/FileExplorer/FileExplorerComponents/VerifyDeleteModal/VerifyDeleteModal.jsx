import { useRef, useState } from 'react';
import localApi from '../../../../utils/apiHanding';

export default function VerifyDeleteForm({ deleteFunction, closeModal }) {

    const handleDelete = async () => {

        try {
            await deleteFunction();
            closeModal();
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            console.log("Epic request")
        }

    };

    return (
        <div className="container">
            <h1>Warning:</h1>
            <p>This file has subfolders/files within it, are you sure you want to delete?</p>
            <button onClick={ handleDelete }>Yes</button><button onClick={ closeModal }>No</button>
        </div>
    );
}