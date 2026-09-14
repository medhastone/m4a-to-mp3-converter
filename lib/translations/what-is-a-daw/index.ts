import { DawArticleContent } from './types';
import { enDawContent } from './en';
import { esDawContent } from './es';
import { frDawContent } from './fr';
import { deDawContent } from './de';
import { ptDawContent } from './pt';
import { ruDawContent } from './ru';

export * from './types';

const contentMap: Record<string, DawArticleContent> = {
  en: enDawContent,
  es: esDawContent,
  fr: frDawContent,
  de: deDawContent,
  pt: ptDawContent,
  ru: ruDawContent,
};

export function getDawArticleContent(locale: string): DawArticleContent {
  return contentMap[locale] || enDawContent;
}
