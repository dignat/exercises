import { traits } from './traits';

/**
 * Components
 */
const components = {
  pluginName: 'corporate-contact-form',
  isComponent: (el: HTMLElement): boolean => el.tagName === 'CORPORATE-CONTACT-FORM',
  extend: 'corporate-webcomponent',
  model: {
    defaults: {
      traits: traits,
      name: 'Corporate Contact Form',
    },
  },
};

export { components };
