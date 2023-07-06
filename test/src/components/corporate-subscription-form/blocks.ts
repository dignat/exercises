import { defaultBlockAttributes } from '../defaults';

/**
 * Blocks
 */
const blocks = {
  ...defaultBlockAttributes,
  pluginName: 'corporate-subscription-form',
  content: `
    <corporate-subscription-block>
      <helix-core-heading slot="header" variant="h3">Stay Up-To-Date</helix-core-heading>
      <helix-core-grid variant="2up">
        <helix-core-grid-item>
          <corporate-input name="first_name" id="first_name" placeholder="First name*" type="text"></corporate-input>
        </helix-core-grid-item>
        <helix-core-grid-item>
          <corporate-input name="last_name" id="last_name" placeholder="Last name*" type="text"></corporate-input>
        </helix-core-grid-item>
      </helix-core-grid>
      <helix-core-grid variant="1up-by-2up">
        <helix-core-grid-item>
          <corporate-input name="email" id="email" placeholder="Email*" type="email"></corporate-input>
          <corporate-button-icon size="large" target="_self" id="submit" name="submit">
            <helix-core-icon slot="icon-left" variant="round" icon-name="arrow_forward" size={3}></helix-core-icon>
          </corporate-button-icon>
        </helix-core-grid-item>
      </helix-core-grid>
      <helix-core-content slot="footer">
        <corporate-form-checkbox
          id="confirm"
          name="confirm"
          required-asterix={false}
        >
        </corporate-form-checkbox>
        <p class="cdp-corp-body-copy-s cdp-corp-grey-l4">I would like to receive information and updates regarding Pfizer.com and other Pfizer initiatives in accordance with
        <a class="cdp-corp-link-l cdp-corp-body-copy-s cdp-corp-no-underline cdp-corp-pfizer-secondary-blue" href="/privacy">Pfizer's Privacy Policy</a></p>
      </helix-core-content>
      <helix-core-content slot="message">
      <div class="corporate-subscription-block__message--header">
        <helix-core-heading variant="h3">Thank you!</helix-core-heading>
      </div>
      <helix-core-heading variant="h5">You are now signed up to our newsletter</helix-core-heading>
    </helix-core-content>
    </corporate-subscription-block>`,
  label: 'Subscription Form (Corporate)',
  category: `Corporate Components`,
};

export { blocks };
