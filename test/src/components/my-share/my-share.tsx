import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-share',
  styleUrl: 'my-share.scss',
  shadow: true,
})
export class MyShare {

  render() {
    return (
      <Host>
        <div>
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61fc0a45d7e7a110"></script>
           <div class="addthis_toolbox">
          <ul>
            <li><a href="#" class="addthis_button_facebook">Facebook</a></li>
          </ul>
        </div>
        </div>
       
      </Host>
    );
  }

}
