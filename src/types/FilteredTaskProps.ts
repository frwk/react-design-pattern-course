import Category from "./Category";

export default interface FilteredTaskProps {
    filter: { completed: boolean | null, categories: Category[] }
    dispatch: (action: { type: string, payload: any }) => void;
    categories: Category[];
    children: React.ReactNode;
}
