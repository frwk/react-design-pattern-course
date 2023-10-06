import PaginationProps from '../../types/PaginationProps';
import { Button } from '@mui/material';
import { useState } from 'react';

function withPagination<WrappedComponentProps extends object>(
    WrappedComponent: React.ComponentType<WrappedComponentProps>
) {

    const WithPagination = ({ totalItems, itemsPerPage = 10, ...props }: WrappedComponentProps & Partial<PaginationProps>) => {
        const [currentPage, setCurrentPage] = useState(1);

        totalItems = totalItems ?? 0;

        const totalPages = Math.ceil(totalItems! / itemsPerPage);

        const handlePageChange = (page: number) => {
            if (page < 1 || page > totalPages) return;
            setCurrentPage(page);
        };

        return (
            <>
                <WrappedComponent
                    {...props as WrappedComponentProps}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                <div className="flex justify-between items-center w-full">
                    <Button
                        variant='contained'
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </Button>
                    <span className='select-none'>{currentPage} sur {totalPages}</span>
                    <Button
                        variant='contained'
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </Button>
                </div>
            </>
        );
    };

    return WithPagination;
}

export default withPagination;
