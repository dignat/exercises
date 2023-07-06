import { newSpecPage } from '@stencil/core/testing';
import { CorporateContactForm } from '../corporate-contact-form';
import { formInputs } from './__mocks__/formInputs';

describe('corporate-contact-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CorporateContactForm],
      html: `
      <corporate-contact-form>
        ${formInputs}
      </corporate-contact-form>`,
    });
    expect(page.root).toEqualHtml(`
    <corporate-contact-form>
      <helix-form-wrapper container-visibility="SHOW_ONLY_FORM">
        ${formInputs}
      </helix-form-wrapper>
    </corporate-contact-form>
    `);
  });
});
