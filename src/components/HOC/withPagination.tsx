import { Button } from '@mui/material';
import { Component, ComponentType } from 'react';
import PaginationProps from '../../types/PaginationProps';
import PaginationState from '../../types/PaginationState';

export default function withPagination<WrappedComponentProps extends object>(
    WrappedComponent: ComponentType<WrappedComponentProps>,
) {

    return class WithPagination extends Component<WrappedComponentProps & PaginationProps, PaginationState> {
        static defaultProps = {
            itemsPerPage: 10
        };

        constructor(props: WrappedComponentProps & PaginationProps) {
            super(props);
            this.state = {
                currentPage: 1,
            };
        }

        get totalPages() {
            const { totalItems, itemsPerPage } = this.props;
            return Math.ceil(totalItems / itemsPerPage!);
        }

        filterItems = () => {
            const { items } = this.props;
            return items.slice((this.state.currentPage - 1) * this.props.itemsPerPage!, this.state.currentPage * this.props.itemsPerPage!);
          };

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
                        items={this.filterItems()}
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