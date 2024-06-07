import axios from 'axios'

const apiUrl = "http://localhost:8443"

const localApi = {

    requestFiles: async (connectionType, currentDirectory) => {
        try {
            console.debug(`${apiUrl}/listFiles/${currentDirectory}`)
            console.log("Getting file list from Backend API");

            const response = await axios.get(`${apiUrl}/listFiles/${currentDirectory}`, {
                headers: {
                    'method': `${connectionType}`,
                    'Access-Control-Allow-Credentials': 'true',
                }
            })

            console.debug((response.data.children).map((file) => JSON.stringify(file)))

            if (!response.status === 200 || response === undefined) {
                throw new Error('Network response was not ok');
            } else {
                return response.data.children
            }
        } catch (error) {
            console.error('Error requesting file list from remote: ', error);
            throw new Error('Error requesting file list from remote: ' + error.message);
        }
    },

    uploadFile: async (formData, method) => {
        try {
            console.log("Attempting upload");
            const response = await axios.post(`${apiUrl}/uploadFile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'method': method,
                    'Access-Control-Allow-Credentials': true,
                }});

            if (!response.status === 200) {
                throw new Error('Network response was not ok: ' + response.body);
            } else {
                console.log("Uploaded File");
                return { status: response.status, data: response.data }
            }

        } catch (error) {
            console.error('Error uploading file to remote: ', error);
            throw new Error('Error uploading file to remote: ' + error.message);
        } finally {
            console.debug("File Upload Request Executed")
        }
    },

    getFile: async (fileName, connectionType) => {
        const encodedFileName = encodeURIComponent(fileName);

        try {
            console.debug("Getting file from FTP Client");
            const response = await axios.get(`${apiUrl}/getFile/${encodedFileName}`, {
                responseType: 'blob', // Set responseType to 'blob'
                headers: {
                    method: `${connectionType}`, 
                    'Access-Control-Allow-Credentials': 'true',
                }});
            console.debug("Retrieved file list");

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }

        } catch (error) {
            console.error('There was an error:', error);
            throw new Error('Error requesting file from remote: ' + error.message);
        }
    },

    deleteFile: async (fileName, connectionType) => {
        const encodedFileName = encodeURIComponent(fileName);
        console.log(`${apiUrl}/deleteFile/${encodedFileName}`)

        try {
            console.log("Deleting file from client");
            const response = await axios.delete(`${apiUrl}/deleteFile/${encodedFileName}`, {
                headers: {
                    'method': `${connectionType}`,   
                    'Access-Control-Allow-Credentials': 'true'
                }
            });
            console.log("Retrieved response");

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }
        } catch (error) {
            console.log('Error deleting file from remote: ', error);
            throw new Error('Error deleting file from remote: ' + error.message);
        } finally {
            console.log("Epic request")
        }
    },

    modifyFile: async (fileName, connectionType, fileProperties) => {
        const encodedFileName = encodeURIComponent(fileName);

        try {
            const response = await axios.put(`${apiUrl}/modifyFile/${encodedFileName}`, fileProperties, {
                headers: {
                    'method': `${connectionType}`,
                    'Access-Control-Allow-Credentials': 'true'
                }, 
            });

            console.log(fileProperties)
            response.status != 200 ? () => { throw new Error('Network response was not ok') } : () => { console.log("File modified"); return response };
            
        } catch (err) {
            console.error('Error modifying file from remote: ', err);
            throw new Error('Error modifying file from remote: ' + err.message);
        } finally {
            console.log("Epic request")
        }
    },

    downloadFile: async (fileName, connectionType) => {
        const encodedFileName = encodeURIComponent(fileName);

        try {
            console.log("Downloading file from remote");

            const response = await axios.get(`${apiUrl}/downloadFile/${encodedFileName}/`, {
                responseType: 'blob', // Set responseType to 'blob'
                headers: {
                    method: `${connectionType}`,
                    'Access-Control-Allow-Credentials': 'true',
                }
            });
            
            console.log("Retrieved file");

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }
        } catch (error) {
            console.error('Error downloading file from remote: ', error);
            throw new Error('Error downloading file from remote: ' + error.message);
        } finally {
            console.log("Epic request")
        }
    },

    createFolder: async (folderName, connectionType) => {
        const encodedFolderName = encodeURIComponent(folderName); 

        try {
            console.log("Creating folder");
            const response = await axios.post(`${apiUrl}/createFolder/${encodedFolderName}`, null, {
                headers: {
                    'method': `${connectionType}`,
                    'Access-Control-Allow-Credentials': 'true'
                }
            });

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }
        } catch (error) {
            console.error('Error creating folder from remote: ', error);
            throw new Error('Error creating folder from remote: ' + error.message);
        } finally {
            console.log("Epic request")
        }
    },

    deleteFolder: async (folderName, connectionType) => {
        const encodedFolderName = encodeURIComponent(folderName);

        try {
            console.log("Deleting folder");
            const response = await axios.delete(`${apiUrl}/deleteFolder/${encodedFolderName}`, {
                headers: {
                    'method': `${connectionType}`,
                    'Access-Control-Allow-Credentials': 'true'
                }
            });

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }
        } catch (error) {
            console.error('Error deleting folder from remote: ', error);
            throw new Error('Error deleting folder from remote: ' + error.message);
        } finally {
            console.log("Epic request")
        }
    },
}




export default localApi;
