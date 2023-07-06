import { Component, Element, h, Prop, Listen, State } from '@stencil/core';

@Component({
  tag: 'corporate-subscription-block',
  styleUrl: 'corporate-subscription-block.scss',
  shadow: false,
})
export class CorporateSubscriptionBlock {
  /**
   * The host element.
   */
  @Element() host: HTMLCorporateSubscriptionBlockElement;

  /**
   * The form config token.
   */
  @Prop() configToken: string;

  /**
   * The form API Endpoint url.
   */
  @Prop() apiEndpointUrl: string;

  /**
   * The form Submission Endpoint url.
   */
  @Prop() submissionEndpointUrl: string;
  /**
   * property to allow user to edit Thank you message
   */
  @Prop() successMessage = false;
  /**
   * indicates whether the form has been successfully posted
   */
  @State() isSent = false;

  /**
   * Validate the form.
   */
  private validateFormInputs(): void {
    const textInputs = this.host.querySelectorAll('corporate-input[required]');
    const checkboxes = document.querySelectorAll('corporate-form-checkbox[required]');

    textInputs.forEach(async input => {
      await (input as HTMLCorporateInputElement).validate(true);
    });
    checkboxes.forEach(async input => {
      await (input as HTMLCorporateFormCheckboxElement).validate(true);
    });
  }

  private getMessageClass() {
    return {
      'corporate-subscription-block__message': true,
      'corporate-subscription-block__message--display': this.successMessage || this.isSent,
    };
  }

  private getFormInputsClass() {
    return {
      'corporate-subscription-block__form-inputs': true,
      'corporate-subscription-block__form-inputs--no-display': this.isSent,
    };
  }
  private renderFormInputs(): JSX.Element {
    return (
      <div class={this.getFormInputsClass()}>
        <div class="corporate-subscription-block__header">
          <slot name="header"></slot>
        </div>
        <div class="corporate-subscription-block__body">
          <slot></slot>
        </div>
        <div class="corporate-subscription-block__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }

  private renderMessage(): JSX.Element {
    return (
      <div class={this.getMessageClass()}>
        <slot name="message"></slot>
      </div>
    );
  }

  /**
   * Handle the form submitted event.
   */
  @Listen('formSubmitted')
  handleFormSubmitted(event: CustomEvent): void {
    this.validateFormInputs();
    this.isSent = event.detail.success.length ? true : false;
  }

  @Listen('validStateChange')
  handleValidStage(event: CustomEvent): void {
    const corporateButton = this.host.querySelector('corporate-button-icon');
    const button = corporateButton.shadowRoot.querySelector('helix-core-button');
    const checkboxStar = document.querySelector('helix-checkbox').shadowRoot.querySelector<HTMLElement>('.required-marker');
    checkboxStar.style.display = 'none';
    console.log(button, event );
    if (!event.detail) {
      button.toggleAttribute('disabled', true);
    } else {
      button.removeAttribute('disabled');
    }
  }

  public render(): JSX.Element {
    return (
      <helix-form-wrapper
        config-token={this.configToken}
        api-endpoint-url={this.apiEndpointUrl}
        submission-endpoint-url={this.submissionEndpointUrl}
        container-visibility="SHOW_ONLY_FORM"
      >
        <div class="corporate-subscription-block">
          {this.renderFormInputs()}
          {this.renderMessage()}
        </div>
      </helix-form-wrapper>
    );
  }
}
