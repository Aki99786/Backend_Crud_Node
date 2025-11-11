import { Request , Response } from "express";
import Category from "../models/category";
import Service from "../models/service";

export async function createCategory(req: Request, res: Response){
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }   

        const category = await Category.create({ name });
        return res.status(201).json(category);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}
export async function getAllCategories(_req: Request, res: Response){
    try {
        const categories = await Category.findAll();
        return res.json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}
export async function updateCategory(req: Request, res: Response){
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name;
        await category.save();
        return res.json(category);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }       
}
export async function deleteCategory(req: Request, res: Response){
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }  
        await category.destroy();
        return res.json({ message: "Category deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}
