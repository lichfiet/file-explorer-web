import axios from 'axios'

const apiUrl = "http://localhost:8443"

const localApi = {


    requestFiles: async (connectionType) => {

        try {
            console.log(apiUrl)

            console.log("Getting file list from Backend API");

            const response = await axios.get(`${apiUrl}/listFilesDev/`, {headers: {
                'method': `${connectionType}`,
                'sessionid': 'true',
                'Access-Control-Allow-Credentials': 'true',
            }})

            console.log("Retrieved file list");
            console.log(response.data)

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return response.data
            }
        } catch (error) {
            console.error('There was an error:', error);
            return(undefined);
        } finally {
        }
    },

    uploadFile: async (formData, method) => {
        try {
            console.log("Attempting upload");
            const response = await axios.post(`${apiUrl}/uploadFile/`, formData, {
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'method': method,
                    'sessionid': 'true',
                    'Access-Control-Allow-Credentials': true,
                }
            })

            // Check for valid response
            if (!response.status === 200) {
                throw new Error('Network response was not ok: ' + response.body);
            } else {
                console.log("Uploaded File");
                return {status: response.status, data: response.data}
            }

        } catch (error) {
            console.error('There was an error: ', error);
        } finally {
            console.log("File Upload Request Executed")
        }
    },

    getFile: async (fileName, connectionType) => {

        try {

            console.log("Getting file from FTP Client");
            const response = await axios.get(`${apiUrl}/getFile/${fileName}/`, {
                responseType: 'blob', // Set responseType to 'blob'
                headers: {
                    method: `${connectionType}`,
                    'sessionid': 'true',
                    'Access-Control-Allow-Credentials': 'true',
                }
            });
            console.log("Retrieved file list");

            if (!response.status === 200) {
                throw new Error('Network response was not ok');
            } else {
                return (response)
            }


        } catch (error) {

            console.error('There was an error:', error);

        } finally {

            console.log("Epic request")

        }

    },

    deleteFile: async (fileName, connectionType) => {

        try {

            console.log("Deleting file from client");
            const response = await axios.delete(`${apiUrl}/deleteFile/${fileName}/`, {headers: {
                'method': `${connectionType}`,
                'sessionid': 'true',
                'Access-Control-Allow-Credentials': 'true'
            }});
            console.log("Retrieved response");

            if (!response.status === 200) {

                throw new Error('Network response was not ok');

            } else {

                return (response)

            }


        } catch (error) {

            console.error('There was an error:', error);

        } finally {

            console.log("Epic request")

        }

    }


}





export default localApi;
