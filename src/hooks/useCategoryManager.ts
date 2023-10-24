import Category from "../types/Category.ts";
import { useMemo, useState } from "react";
import Task from "../types/Task.ts";

const useCategoryManager = (tasks: Task[]) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useMemo(() => {
        const categories = tasks.reduce((acc: Category[], task: Task) => {
            if (!task.category) return acc;
            const existingCategory = acc.some((cat) => cat.title === task.category);
            if (existingCategory) return acc;
            return [...acc, { title: task.category }];
        }, []);

        setCategories(categories);
    }, [tasks]);

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