import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'corporate-addthis',
  styleUrl: 'corporate-addthis.scss',
  shadow: false,
})
export class CorporateAddthis {
  /**
   * @return {*}  {JSX.Element}
   * @memberof CorporateAddthis
   */
  render(): JSX.Element {
    return (
      <Host>
        <div>
          <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57c5c5db0d8f4759"></script>
          <div class="addthis_toolbox">
            <div class="custom_images">
              <ul class="corporate-article-container__list">
                <li class="corporate-article-container__item">
                  <a class="addthis_button_twitter" data-title="twitter" title="Twitter" href="#">
                    <corporate-icon icon-set="corporate-icon-set" icon-name="twitter" size={parseInt('2')}></corporate-icon>
                  </a>
                </li>
                <li class="corporate-article-container__item">
                  <a class="addthis_button_facebook" data-title="facebook" title="Facebook" href="#">
                    <corporate-icon icon-set="corporate-icon-set" icon-name="facebook" slot="facebook" size={parseInt('2')}></corporate-icon>
                  </a>
                </li>
                <li class="corporate-article-container__item">
                  <a class="addthis_button_linkedin" data-title="linkedin" target="_blank" title="LinkedIn" href="#">
                    <corporate-icon icon-set="corporate-icon-set" icon-name="linkedin" slot="linkedin" size={parseInt('2')}></corporate-icon>
                  </a>
                </li>
                <li class="corporate-article-container__item">
                  <a class="addthis_button_email" data-title="email" target="_blank" title="Email" href="#">
                    <helix-core-icon icon-name="email" slot="email" size={parseInt('2')}></helix-core-icon>
                  </a>
                </li>
                <li class="corporate-article-container__item">
                  <a class="addthis_button_email" target="_blank" title="Email" href="#">
                    <helix-core-icon icon-name="launch" slot="email-target" size={parseInt('2')}></helix-core-icon>
                  </a>
                </li>
              </ul>
            </div>
            <div class="atclear"></div>
          </div>
        </div>
      </Host>
    );
  }
}
