import { html } from 'lit-html';

export default {
  title: 'Corporate AddThis',
  component: 'corporate-addthis',
};
const CorporateAddThisTemplate = () => html`<corporate-addthis>
  <helix-core-content>Share</helix-core-content>
</corporate-addthis>`;

export const CorporateAddThis = CorporateAddThisTemplate.bind({});
