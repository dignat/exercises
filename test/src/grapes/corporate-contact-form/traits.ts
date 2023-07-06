import { defaultTraitAttributes } from '../defaults';

/**
 * Traits
 */
const traits = [
  ...defaultTraitAttributes,
  {
    label: 'Config Token',
    name: 'config-token',
    default: 'corporate-contact-form-token-paul',
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
];

export { traits };
