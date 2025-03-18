import { Scope, TranslateOptions } from 'i18n-js';

jest.mock('expo-localization', () => ({
  getLocales: () => [
    {
      languageCode: 'en',
      countryCode: 'US',
    },
  ],
}));

jest.mock('@/hooks/useTranslation', () => ({
  useTranslation:
    () =>
    (scope: Scope, _options?: TranslateOptions): string =>
      scope as string,
}));

jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => null,
}));
