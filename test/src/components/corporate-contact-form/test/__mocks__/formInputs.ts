export const formInputs = `
<div class="corporate-contact-form">
<div class="corporate-contact-form__section corporate-contact-form__subject">
  <corporate-form-dropdown class="corporate-contact-form__input--short" id="subject" name="subject" prompt="Select" required>
    <h6 class="corporate-contact-form__label">Subject *</h6>
    <helix-core-icon slot="chevron" size="3" icon-name="chevron_right"></helix-core-icon>
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
  <corporate-form-dropdown class="corporate-contact-form__input corporate-contact-form__input--short" id="country" name="country" prompt="Select" required>
    <h6 class="corporate-contact-form__label">Country *</h6>
    <helix-core-icon slot="chevron" size="3" icon-name="chevron_right"></helix-core-icon>
  </corporate-form-dropdown>
  <corporate-input class="corporate-contact-form__input corporate-contact-form__input--medium" name="phone" placeholder="Phone"></corporate-input>
  <corporate-input class="corporate-contact-form__input" name="email" type="email" placeholder="Email Address *" required></corporate-input>
</div>

<div class="corporate-contact-form__section corporate-contact-form__self-description">
  <corporate-form-dropdown class="corporate-contact-form__input" name="self_description" id="self_description" options="{countryOptions}" prompt="Select">
    <h6 class="corporate-contact-form__label">How would you best describe yourself?</h6>
    <helix-core-icon slot="chevron" size="3" icon-name="chevron_right"></helix-core-icon>
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

<corporate-button disabled id="submit" name="submit" class="corporate-contact-form__submit-btn" target="_self" size="small"> Send Email </corporate-button>
</div>
`;
