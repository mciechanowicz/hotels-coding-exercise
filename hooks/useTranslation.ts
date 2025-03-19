import i18n from '@/translations/i18n';
import { Scope, TranslateOptions } from 'i18n-js';

export const useTranslation = () => {
  return (scope: Scope, options?: TranslateOptions) => i18n.t(scope, options);
};
