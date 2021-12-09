import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'my-embeded-component',
  shadow: false,
})
export class MyEmbededComponent {
  @Prop() color: string = 'blue';


  render () {
    return (
      <div>My favourite color is {this.color}</div>
    )
  }
}
