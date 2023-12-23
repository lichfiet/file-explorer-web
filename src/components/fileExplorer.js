import { useState, useEffect } from 'react';
import localApi from '../utils/apiHanding';
import extension from '../utils/extensiontools'

const FileExplorer = function () {

    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        try {

            let fileData

            fileData = await localApi.requestFiles()

            setFiles(fileData);
            console.log("Logging Data")
            console.log(fileData)


        } catch (error) {
            // Handle error if API request fails
            console.error('Error fetching files:', error);
        }

    }


    return (
        <section>
            <button onClick={() => { fetchFiles() }}>List Files</button>
            <div className="filesListed">

                {
                    files.map((obj, index) => (
                        <div className="fileReturned" key={index}>
                            <a href="#" role="button" className="outline secondary">

                                <div className="fileReturned">
                                    {extension.getThumbnail(obj.fileExtensionType, obj.fileType)}
                                </div>


                            </a>
                            <p className="fileReturnedText" extension={obj.fileExtension}>{obj.fileName}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default FileExplorer;
