import { newE2EPage } from '@stencil/core/testing';

describe('corporate-subscription-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<corporate-subscription-block></corporate-subscription-block>');

    const element = await page.find('corporate-subscription-block');
    expect(element).toHaveClass('hydrated');
  });
});
