import sharp from "sharp"

const validateProductImageDimensions = async(req,res,next)=>{
    if(!req.file){
        return res.status(401).json({
            msg : "no input files",
            success : false
        })
    }
    const height = 1024
    const width = 768
// 
    const imageMetaData = await sharp(req.file.path).metadata()
    const imageWidth = imageMetaData.width;
    const imageHeight = imageMetaData.height;

    if(imageWidth > width || imageHeight > height){
        sharp(req.file.path)
        .resize(width,height)
        .toFile("new dimensioned file" + req.file.originalname )
    }else{
        next()
    }

    next()   




}
export default validateProductImageDimensions
    