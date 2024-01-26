const fs = require('fs');
const path = require('path');

const tmpFolderPath = 'path/to/tmp';
const finalDestinationFolderPath = 'path/to/final-destination';
const fileName = 'file.txt';

// Функція переміщення файлу з папки tmp до місця призначення
function moveFileToFinalDestination() {
    const tmpFilePath = path.join(tmpFolderPath, fileName);
    const finalDestinationFilePath = path.join(finalDestinationFolderPath, fileName);

    fs.rename(tmpFilePath, finalDestinationFilePath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
        } else {
            console.log('File moved to final destination:', finalDestinationFilePath);

            // Після переміщення файлу видаліть його з папки tmp
            deleteFileFromTmpFolder(tmpFilePath);
        }
    });
}

// Функція видалення файлу з папки tmp
function deleteFileFromTmpFolder(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted from tmp folder:', filePath);
        }
    });
}

moveFileToFinalDestination();
