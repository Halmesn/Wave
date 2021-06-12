import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  email,
  min,
  max,
  alpha_spaces as alphaSpaces,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('minValue', minValue);
    defineRule('maxValue', maxValue);
    defineRule('email', email);
    defineRule('confirmed', confirmed);
    defineRule('passwordMismatch', confirmed);
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `${ctx.field} is required`,
          min: `${ctx.field} is too short`,
          max: `${ctx.field} is too long`,
          alphaSpaces: `${ctx.field} may only contain alphabetical characters and space`,
          email: `${ctx.field} must be a valid email address`,
          minValue: `${ctx.field} is too low`,
          maxValue: `${ctx.field} is too high`,
          tos: `You must accept the Terms of Service`,
          passwordMismatch: `The passwords don't match.`,
        };

        const message =
          messages[ctx.rule.name] ?? `The field ${ctx.field} is invalid`;

        return message;
      },
    });
  },
};
