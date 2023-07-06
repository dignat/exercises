import { newSpecPage } from '@stencil/core/testing';
import { CorporateAddthis } from '../corporate-addthis';

describe('corporate-addthis', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CorporateAddthis],
      html: `<corporate-addthis></corporate-addthis>`,
    });
    expect(page.root).toEqualHtml(`
      <corporate-addthis>
      <div>
      <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57c5c5db0d8f4759"></script>
      <div class="addthis_toolbox">
        <div class="custom_images">
          <ul class="corporate-article-container__list">
            <li class="corporate-article-container__item">
              <a class="addthis_button_facebook" data-title="facebook" title="Facebook" href="#">
              
              </a>
            </li>
            <li>
              <a class="addthis_button_twitter" data-title="twitter" title="Twitter" href="#">
               
              </a>
            </li>
            <li>
              <a class="addthis_button_linkedin" data-title="linkedin" target="_blank" title="LinkedIn" href="#">
                
              </a>
            </li>
            <li>
              <a class="addthis_button_email" data-title="email" target="_blank" title="Email" href="#">
              </a>
            </li>
            <li>
              <a class="addthis_button_email" target="_blank" title="Email" href="#">
              </a>
            </li>
          </ul>
        </div>
        <div class="atclear"></div>
      </div>
    </div>
      </corporate-addthis>
    `);
  });
});
