import {Component, h} from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})

export class MyParentComponent {
  render () {
    return (
      <div>
        <my-embeded-component color="red"></my-embeded-component>
      </div>
    )
  }
}
