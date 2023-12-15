const extension = {

    getFromFileName: function (fileName) {
        return (fileName.split('.').pop());
    },

    checkValid: function (fileExtension) {

        const def = (fileExtension === undefined ? true : false)

        if (RegExp((/^(jpg|jpeg|png)$/i)).test(fileExtension) === true || def === true) {
            return ([0, null, "JPG/JPEG/PNG"]) // unsure what other value to return

        } else if (RegExp((/^(gif)$/i)).test(fileExtension) == true) {
            return ([1, null, "GIF"]) // unsure what other value to return

        } else if (RegExp((/^(mov|avi|mp4)$/i)).test(fileExtension) == true) {
            return ([2, null, "MOV/AVI/MP4"]) // unsure what other value to return

        } else {
            return ([99, 99, 99])
        }
    },

    returnValidFileNames: function (fileList) {
        let validFiles = []

        for (let n = 0; n < fileList.length; n++) {
            let fileName = fileList[n];
            let validity = extension.checkValid(extension.getFromFileName(fileName));
            if ([0, 1, 2].includes(validity[0]) === true) {
                validFiles.push(fileName);
            }
        }

        return(validFiles)
    }
};

export default extension;