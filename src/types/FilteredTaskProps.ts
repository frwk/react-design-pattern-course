export default interface FilteredTaskProps {
    filter: string;
    setFilter: (filter: string) => void;
    children: React.ReactNode;
}
