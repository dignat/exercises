import { newE2EPage } from '@stencil/core/testing';

describe('corporate-addthis', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<corporate-addthis></corporate-addthis>');

    const element = await page.find('corporate-addthis');
    expect(element).toHaveClass('hydrated');
  });
});
