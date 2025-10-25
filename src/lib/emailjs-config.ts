// EmailJS Configuration Helper
// These should be prefixed with NEXT_PUBLIC_ to be available in the browser

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_impcore',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Bs9xWN6pRhvwVCz3m',
  demoTemplate: process.env.NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE || 'template_demos',
  contactTemplate: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE || 'template_contact',
};

export const isEmailJsConfigured = () => {
  return !!(
    emailjsConfig.serviceId &&
    emailjsConfig.publicKey &&
    emailjsConfig.demoTemplate &&
    emailjsConfig.contactTemplate
  );
};
