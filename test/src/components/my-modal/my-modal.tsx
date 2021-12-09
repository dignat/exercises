import {Component, Method, Element, Prop, h} from '@stencil/core';

@Component({
  tag: 'my-modal',
  shadow: true,
  styleUrl: 'my-modal.css'
})

export class MyModal {
  @Element() modalEl: HTMLElement;
  @Method() open () {
    this.modalEl.style.display = 'block';
  };
  @Prop() title: string;
  @Prop() content: string;
  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <p>{this.content}</p>
      </div>
    )
  }
}
