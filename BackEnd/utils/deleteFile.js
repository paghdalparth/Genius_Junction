const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
}

const deleteFolder = (folderPath) => {
    fs.rm(folderPath, {recursive: true}, (err) => {
        if (err) {
            throw (err);
        }
    });
}

module.exports = {deleteFile, deleteFolder};