import { Button } from '@mui/material';
import React, { Component, ComponentType } from 'react';

export default function withPagination<WrappedComponentProps extends object>(
    WrappedComponent: ComponentType<WrappedComponentProps>
) {

    return class WithPagination extends Component<WrappedComponentProps & { totalItems: number; itemsPerPage?: number }> {
        static defaultProps = {
            itemsPerPage: 10
        };

        state = {
            currentPage: 1
        };

        get totalPages() {
            const { totalItems, itemsPerPage } = this.props;
            return Math.ceil(totalItems / itemsPerPage!);
        }

        onPageChange = (page: number) => {
            if (page < 1 || page > this.totalPages) return;
            this.setState({ currentPage: page });
        };

        render() {
            const { currentPage } = this.state;
            const { totalItems, itemsPerPage } = this.props;

            return (
                <>
                    <WrappedComponent
                        {...this.props as WrappedComponentProps}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        onPageChange={this.onPageChange}
                    />
                    <div className="flex justify-between items-center w-full">
                        <Button
                            variant='contained'
                            onClick={() => this.onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </Button>
                        <span className='select-none'>{currentPage} sur {this.totalPages}</span>
                        <Button
                            variant='contained'
                            onClick={() => this.onPageChange(currentPage + 1)}
                            disabled={currentPage === this.totalPages}
                        >
                            Suivant
                        </Button>
                    </div>
                </>
            );
        }
    };
}