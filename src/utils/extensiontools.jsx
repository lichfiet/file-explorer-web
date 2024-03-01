const extension = {

    getFromFileName: function (fileName) {
        return (fileName.split('.').pop());
    },

    checkValid: function (fileExtension) {

        const def = (fileExtension === undefined ? true : false)

        if (RegExp((/^(jpg|jpeg|png)$/i)).test(fileExtension) === true || def === true) {
            return ([0, null, "JPG/JPEG/PNG"]) // unsure what other value to return

        } else if (RegExp((/^(gif)$/i)).test(fileExtension) === true) {
            return ([1, null, "GIF"]) // unsure what other value to return

        } else if (RegExp((/^(mov|avi|mp4)$/i)).test(fileExtension) === true) {
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

        return (validFiles)
    },

    getThumbnail: function (fileExtensionType, fileType) {

        const thumbnailImg = () => {
            if (fileType === "d") {
                return(<i className="fileIcon fa fa-solid fa-folder"></i>)
            } else if (fileExtensionType === 0) {
                return(<i className="fileIcon fa fa-file-image"></i>)
            } else if (fileExtensionType === 1) {
                return(<i className="fileIcon fa fa-file-image"></i>)
            } else if (fileExtensionType === 2) {
                return(<i className="fileIcon fa fa-solid fa-film"></i>)
            } else if (fileExtensionType === 3) {
                return(<i className="fileIcon fa fa-file"></i>)
            }
        }

        return(thumbnailImg());
    }
};

export default extension;