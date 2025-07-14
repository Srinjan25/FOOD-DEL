import foodModel from "../models/foodModel.js";
import fs from "fs";

//add fooditem


export const addFood = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file); // multer gives this for 'single'
    
    const { name, description, category, price } = req.body;

    const food = new foodModel({
      name,
      description,
      category,
      price: Number(price),
      image: req.file ? req.file.filename : "", // multer must set this
    });

    await food.save();

    res.status(200).json({ success: true, message: "Food item added" });
  } catch (error) {
    console.log("ERROR ADDING FOOD:", error); // log full stack trace
    res.status(500).json({ success: false, message: "Failed to add food item" });
  }
};

//all food list
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to fetch food items"});
    }
};

//remove food item

export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food item removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to remove food item"});
    }
}

