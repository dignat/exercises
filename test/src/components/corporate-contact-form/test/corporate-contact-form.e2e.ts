import { newE2EPage } from '@stencil/core/testing';

describe('corporate-contact-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<corporate-contact-form></corporate-contact-form>');

    const element = await page.find('corporate-contact-form');
    expect(element).toHaveClass('hydrated');
  });
});
