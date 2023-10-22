import Category from "../types/Category.ts";
import {useState} from "react";

const useCategoryManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const addCategory = (category: Category) => {
        const existingCategory = categories.some((cat) => cat.title === category.title);
        if (existingCategory) return existingCategory;
        setCategories([...categories, category]);
    }

    return {
        categories,
        addCategory
    }
}

export default useCategoryManager;