import { Component, Prop, Listen, h, Element } from '@stencil/core';

@Component({
  tag: 'corporate-contact-form',
  styleUrl: 'corporate-contact-form.scss',
  shadow: false,
})
export class CorporateContactForm {
  @Element() host: HTMLCorporateContactFormElement;

  /**
   * Unique identifier for a particular form configuration.
   */
  @Prop() configToken: string;

  /**
   * Fetch API Endpoint url.
   */
  @Prop() apiEndpointUrl: string;

  /**
   * Form Submission Endpoint url.
   */
  @Prop() submissionEndpointUrl: string;

  /**
   * Get all required form inputs and explicitly trigger the validate method
   */
  private validateFormInputs(): void {
    const dropdowns = document.querySelectorAll('corporate-form-dropdown[required]');
    const textarea = document.querySelectorAll('corporate-textarea[required]');
    const textInputs = this.host.querySelectorAll('corporate-input[required]');
    const checkboxes = document.querySelectorAll('corporate-form-checkbox[required]');

    dropdowns.forEach(async input => {
      await (input as HTMLCorporateFormDropdownElement).validate();
    });
    textarea.forEach(async input => {
      await (input as HTMLCorporateTextareaElement).validate(true);
    });
    textInputs.forEach(async input => {
      await (input as HTMLCorporateInputElement).validate(true);
    });
    checkboxes.forEach(async input => {
      await (input as HTMLCorporateFormCheckboxElement).validate(true);
    });
  }

  /**
   * Listen on the formSubmitted event to explicitly trigger the validate method on all required inputs
   */
  @Listen('formSubmitted')
  handleFormSubmitted(): void {
    this.validateFormInputs();
  }

  /**
   * Stop click when editing helix-core-content
   */
  @Listen('click', { capture: true })
  handleClick(event: PointerEvent): void {
    if ((event.target as HTMLElement).tagName !== 'CORPORATE-BUTTON') return;

    const submitButton = this.host.querySelector('#submit') as HTMLCorporateButtonElement;
    submitButton.click();
  }

  render(): JSX.Element {
    return (
      <helix-form-wrapper
        config-token={this.configToken}
        api-endpoint-url={this.apiEndpointUrl}
        submission-endpoint-url={this.submissionEndpointUrl}
        container-visibility="SHOW_ONLY_FORM"
      >
        <slot></slot>
      </helix-form-wrapper>
    );
  }
}
