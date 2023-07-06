import { defaultTraitAttributes } from '../defaults';

/**
 * Traits
 */
const traits = [
  ...defaultTraitAttributes,
  {
    label: 'Config Token',
    name: 'config-token',
    default: 'corporate-subscription-form-token-denis',
  },
  {
    label: 'API Endpoint URL',
    name: 'api-endpoint-url',
    default: 'https://ms-forms-service-uat.digitalpfizer.com/api/v2/forms',
  },
  {
    label: 'API Submission URL',
    name: 'submission-endpoint-url',
    default: '',
  },
  {
    label: 'Toggle Thank You Message',
    name: 'success-message',
    default: false,
    type: 'checkbox',
  },
];

export { traits };
