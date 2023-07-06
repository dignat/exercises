import { newE2EPage } from '@stencil/core/testing';

describe('my-share', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-share></my-share>');

    const element = await page.find('my-share');
    expect(element).toHaveClass('hydrated');
  });
});
