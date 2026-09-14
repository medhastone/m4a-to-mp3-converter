'use client';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  const t = useTranslations('error');
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold text-red-500">{t('title')}</h2>
      <p className="text-on-surface-variant max-w-md text-center">{error?.message || t('default_message')}</p>
      <button onClick={() => reset()} className="bg-primary px-6 py-2 rounded-lg text-on-primary font-medium">{t('try_again')}</button>
    </div>
  );
}