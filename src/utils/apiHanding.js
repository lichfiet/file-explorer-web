import connSettings from '../config/connSettings'
import axios from 'axios'

const localApi = {

    requestFiles: async () => {

        try {


            console.log("Getting file list from FTP Client");
            const response = await axios.get(`${connSettings.host}/listFilesFromDir/`)
            console.log("Retrieved file list");

            // Updates the files returned variable


            if (!response.status === 200) {

                throw new Error('Network response was not ok');

            } else {

                return response.data

            }


        } catch (error) {

            console.error('There was an error:', error);

        } finally {

            console.log("Epic request")

        }

    },

    uploadFile: async (formData) => {

        try {


            console.log("Attempting upload");
            const response = await axios.post(`${connSettings.host}/uploadFile/`, formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })

            // Updates the files returned variable


            if (!response.status === 200) {

                throw new Error('Network response was not ok');

            } else {

                console.log("Uploaded File");

                return {status: response.status, data: response.data}

            }


        } catch (error) {

            console.error('There was an error:', error);

        } finally {

            console.log("Epic request")

        }

    }


}





export default localApi;