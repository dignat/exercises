import { html } from 'lit-html';
import subjectOptions from './data/subject.json';
import countryOptions from './data/countries.json';
import ocupationOptions from './data/ocupation.json';

export default {
  title: 'Corporate Contact Form',
  component: 'corporate-contact-form',
  argTypes: {
    configToken: {
      control: { type: 'text' },
      defaultValue: 'corporate-contact-form-token-paul',
      name: 'Config Token',
    },
    apiEndpointUrl: {
      control: { type: 'text' },
      defaultValue: 'https://ms-forms-service-uat.digitalpfizer.com/api/v2/forms',
      name: 'API Endpoint URL',
    },
    submissionEndpointUrl: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'API Submission URL',
    },
  },
};

const DefaultTemplate = ({ configToken, apiEndpointUrl, submissionEndpointUrl }) => html`
  <corporate-contact-form config-token=${configToken} api-endpoint-url=${apiEndpointUrl} .submission-endpoint-url=${submissionEndpointUrl}>
    <div class="corporate-contact-form">
      <div class="corporate-contact-form__section corporate-contact-form__subject">
        <corporate-form-dropdown class="corporate-contact-form__input--short" id="subject" name="subject" empty-option="Select" required>
          <h6 class="corporate-contact-form__label">Subject *</h6>
        </corporate-form-dropdown>
      </div>

      <div class="corporate-contact-form__section corporate-contact-form__questions-answers">
        <corporate-textarea class="corporate-contact-form__input" name="questions_and_answers" id="questions_and_answers" required not-valid-message="This field is required.">
          <h6 slot="label" class="corporate-contact-form__label">Questions & Comment *</h6>
        </corporate-textarea>

        <div class="corporate-contact-form__full-name">
          <corporate-input id="first_name" name="first_name" required placeholder="First Name *"></corporate-input>
          <corporate-input id="last_name" name="last_name" required placeholder="Last Name *"></corporate-input>
        </div>

        <corporate-input
          class="corporate-contact-form__input"
          name="address_1"
          required
          placeholder="Address 1 *"
          not-valid-message="Please enter a valid address"
        ></corporate-input>
        <corporate-input class="corporate-contact-form__input" name="address_2" placeholder="Address 2"></corporate-input>
      </div>

      <div class="corporate-contact-form__section corporate-contact-form__country">
        <corporate-form-dropdown class="corporate-contact-form__input corporate-contact-form__input--short" id="country" name="country" empty-option="Select" required>
          <h6 class="corporate-contact-form__label">Region *</h6>
        </corporate-form-dropdown>
        <corporate-input class="corporate-contact-form__input corporate-contact-form__input--medium" name="phone" placeholder="Phone"></corporate-input>
        <corporate-input class="corporate-contact-form__input" name="email" type="email" placeholder="Email Address *" required></corporate-input>
      </div>

      <div class="corporate-contact-form__section corporate-contact-form__self-description">
        <corporate-form-dropdown class="corporate-contact-form__input" name="self_description" id="self_description" options="{countryOptions}" empty-option="Select" required>
          <h6 class="corporate-contact-form__label">How would you best describe yourself?</h6>
        </corporate-form-dropdown>
      </div>

      <p class="corporate-contact-form__caption">
        By providing your email address, you agree to receive an email response from Pfizer to your inquiry. Your email address will only be used to respond to your inquiry. The
        information you submit will be governed by our <a href="/general/privacy">Privacy Policy</a>
      </p>
      <corporate-form-checkbox
        class="corporate-contact-form__consent"
        name="consent"
        label="Please check here to confirm that you are 18-years of age or older"
        required
      ></corporate-form-checkbox>

      <corporate-button class="corporate-contact-form__submit-btn" target="_self" size="small"><helix-core-content>Send Email</helix-core-content></corporate-button>
      <corporate-button disabled id="submit" name="submit" class="corporate-contact-form__submit-btn corporate-contact-form__submit-btn--hidden" target="_self" size="small"
        ><helix-core-content>Send Email</helix-core-content></corporate-button
      >
    </div>
  </corporate-contact-form>
  <script>
    const subjectDropdown = document.querySelector('#subject');
    const countryDropdown = document.querySelector('#country');
    const occupationDropdown = document.querySelector('#self_description');
    subjectDropdown.options = ${JSON.stringify(subjectOptions)};
    countryDropdown.options = ${JSON.stringify(countryOptions)};
    occupationDropdown.options = ${JSON.stringify(ocupationOptions)};
  </script>
`;
export const Default = DefaultTemplate.bind({});
