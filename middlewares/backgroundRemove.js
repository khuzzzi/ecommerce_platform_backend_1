import { removeBackgroundFromImageFile } from "remove.bg";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productImageBackgroundRemove = async (req, res, next) => {
    const productImageFilePath = req.file.path;

    // Define the output directory and file name for the image after background removal
    const outputDir = path.join(__dirname, '../bgremovedfiles');
    const outputFileName = `bg-removed-${Date.now()}.png`;
    const afterRemovingBackgroundImagePathStorageArea = path.join(outputDir, outputFileName);

    // Check if the output directory exists; if not, create it
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        
    }

    // Remove the background from the image
    try {
        await removeBackgroundFromImageFile({
            path: productImageFilePath,
            apiKey: process.env.API_KEY_FOR_BG_REMOVE,
            size: "regular",
            type: "auto",
            scale: "50%",
            outputFile: afterRemovingBackgroundImagePathStorageArea // Specify the output file path
        });


        // Attach the new file path to the request object
        req.file.processedFilePath = afterRemovingBackgroundImagePathStorageArea;
        next();
    } catch (error) {
        console.error("Error removing background:", error);
        return next(error); // Call next with the error to handle it appropriately
    }
};

export default productImageBackgroundRemove;
