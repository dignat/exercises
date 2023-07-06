import {Component, Prop, h} from '@stencil/core';
import yaml from 'js-yaml';

@Component({
    tag: 'first-component',
    shadow: true,

})

export class FirstComponent {
    @Prop() name: string;

    private toYaml() {
        fetch('./convert.json').then(res => res.json()).then(data => console.log(yaml.dump(data)));
        
    }


    render() {
        return (
            <p>{this.toYaml()}</p>
            
        )
    }
}