import { Category, SubCategory } from "./categoryModel.js"
import multer from "multer";
import { v4 } from 'uuid';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'files');
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      const uuid = v4();
      // console.log(file);
      let origin = file.originalname.split(`.${ext}`)[0];
      let name = origin.replace(/ /g, '_');
      cb(null, `${name}_${uuid}.${ext}`);
    },
  });

const upload = multer({ storage: multerStorage });
export const uploads = upload.single('file');

export const createCategory = async (req, res)=> {
    try {
        const {name, creator, description} = req.body
        let file = req.file
        file ? '' : res.status(404).json({message: 'no file was found'})
        const body = {
            name,
            creator,
            description,
            image: req.file.originalname
        }
        const cat = await Category.create(body)
        cat ? res.status(201).json(cat) : res.status(400).json({message: 'failed to create category'})
    } catch (error) {
        res.status(400).json({message: error?.message})
    }
}

export const getCategories = async (req, res)=>{
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
        return
    } catch (error) {
        res.status(400).json({message: error?.message})
        return
    }
}

export const getCategory = async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            res.status(400).json({message: 'id of category required'})
        }
        const cat = await Category.findById(id)
        cat ? res.status(200).json(cat) : res.status(404).json({message: 'no category with that ID was found'})
    } catch (error) {
        res.status(400).json({message: error?.message})
    }
}