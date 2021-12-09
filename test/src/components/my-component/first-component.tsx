import {Component, Prop, h} from '@stencil/core';

@Component({
    tag: 'first-component',
    shadow: true,

})

export class FirstComponent {
    @Prop() name: string;

    render() {
        return (
            <p>My name is {this.name}</p>
        )
    }
}