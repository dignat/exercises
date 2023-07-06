import { traits } from "./traits";

/**
 * Components
 */
const components = {
  pluginName: 'corporate-subscription-form',
  isComponent: (el: HTMLElement): boolean => el.tagName === 'CORPORATE-SUBSCRIPTION-BLOCK',
  extend: 'corporate-webcomponent',
  model: {
    defaults: {
      traits,
      name: 'Corporate Subscription Form',
      droppable: 'helix-core-heading, helix-core-content, helix-core-grid',
    },
  },
};

export { components };
