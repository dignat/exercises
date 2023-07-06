import { html } from 'lit-html';

export default {
  title: 'Corporate Subscription Block',
  component: 'corporate-subscription-block',
  argTypes: {
    configToken: {
      control: { type: 'text' },
      defaultValue: 'corporate-subscription-form-token-denise-a',
      name: 'Config Token',
    },
    apiEndpointUrl: {
      control: { type: 'text' },
      defaultValue: 'https://ms-forms-service-uat.digitalpfizer.com/api/v2/forms',
      name: 'API Endpoint URL',
    },
    apiSubmissionUrl: {
      control: { type: 'text' },
      defaultValue: 'https://ms-forms-service-uat.digitalpfizer.com/api/v2/forms',
      name: 'API Submission URL',
    },
    successMessage: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Toggle thank you message',
    },
  },
};

const CorporateSubscriptionBlockTemplate = ({ configToken, apiEndpointUrl, apiSubmissionUrl, successMessage }) => html`
  <corporate-subscription-block config-token=${configToken} api-endpoint-url=${apiEndpointUrl} .submission-endpoint-url=${apiSubmissionUrl} success-message=${successMessage}>
    <helix-core-heading slot="header" variant="h3">Stay Up-To-Date</helix-core-heading>
    <helix-core-grid variant="2up">
      <helix-core-grid-item>
        <corporate-input id="first_name" name="first_name" required placeholder="First name*"></corporate-input>
      </helix-core-grid-item>
      <helix-core-grid-item>
        <corporate-input id="last_name" name="last_name" required placeholder="Last name*"></corporate-input>
      </helix-core-grid-item>
    </helix-core-grid>
    <helix-core-grid variant="1up-by-2up">
      <helix-core-grid-item>
        <corporate-input id="email" name="email" placeholder="Email*" type="email" required></corporate-input>
        <corporate-button-icon size="large" target="_self" id="submit" name="submit">
          <helix-core-icon slot="icon-left" variant="round" icon-name="arrow_forward" size="{3}"></helix-core-icon>
        </corporate-button-icon>
      </helix-core-grid-item>
    </helix-core-grid>
    <helix-core-content slot="footer">
      <corporate-form-checkbox
        id="confirm"
        name="confirm"
        required
        not-valid-message="Field is required."
        label="I would like to receive information and updates regarding Pfizer.com and other Pfizer initiatives in accordance with"
      >
      </corporate-form-checkbox>
      <a class="cdp-corp-link-l cdp-corp-body-copy-s cdp-corp-no-underline cdp-corp-pfizer-secondary-blue" href="/privacy">Pfizer's Privacy Policy</a>
    </helix-core-content>
    <helix-core-content slot="message">
      <div class="corporate-subscription-block__message--header">
        <helix-core-heading variant="h3">Thank you!</helix-core-heading>
      </div>
      <helix-core-heading variant="h5">You are now signed up to our newsletter</helix-core-heading>
    </helix-core-content>
  </corporate-subscription-block>
`;

export const CorporateSubscriptionBlock = CorporateSubscriptionBlockTemplate.bind({});
