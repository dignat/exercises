
import { Component, State, Prop, Host, Event,  h, EventEmitter,} from '@stencil/core';

@Component({
    tag: 'my-pagination',
    styleUrl: 'my-pagination.scss',
    shadow: true,
})

export class MyPagination {

    @State() currentPage = 1;
    
    @Prop() totalPages: number;

    @Prop() count: number;
    
    @Prop() perPage: number;

    @Event() paging: EventEmitter;

    //private pageCount = 0;

    private handleSelect(event, index:number) {
        event.preventDefault()
        this.paging.emit(index);
    }

    private handlePrevious(event) {
        if (this.currentPage !== 1) {
            this.handleSelect(event, this.currentPage - 1)
        }
    }

    private handleNext(event) {
        if (this.currentPage !== this.totalPages) {
            this.handleSelect(event, this.currentPage + 1)
        }
    }

    

    render (): JSX.Element {
        let pages = [];
        for (let i = 0; i < Math.floor(this.count / this.perPage); i++) {
            pages.push(i);
        }
        
        return (
            <Host>
               <ul>
                 <li onClick={(event) => this.handlePrevious(event)}>Previous</li>
                 {pages.map(index => 
                    (<li onClick={(event) => this.handleSelect(event, index)}>{index + 1}{this.currentPage === index ? 'active': ''}</li>)
                    )}
                    <li onClick={(event) => this.handleNext(event)}>Next</li>
               </ul>
            </Host>
            
        )
    }
}