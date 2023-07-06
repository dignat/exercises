import { newSpecPage } from '@stencil/core/testing';
import { MyShare } from '../my-share';

describe('my-share', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyShare],
      html: `<my-share></my-share>`,
    });
    expect(page.root).toEqualHtml(`
      <my-share>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-share>
    `);
  });
});
