import { newSpecPage } from '@stencil/core/testing';
import { CorporateSubscriptionBlock } from '../corporate-subscription-block';

describe('corporate-subscription-block', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CorporateSubscriptionBlock],
      html: `<corporate-subscription-block></corporate-subscription-block>`,
    });
    expect(page.root).toEqualHtml(`
      <corporate-subscription-block>
        <div class="corporate-subscription-block">
          <helix-form-wrapper container-visibility="SHOW_BOTH">
            <div class="corporate-subscription-block__header"></div>
            <div class="corporate-subscription-block__body"></div>
            <div class="corporate-subscription-block__footer"></div>
         </helix-form-wrapper>
       </div>
      </corporate-subscription-block>
    `);
  });
});
