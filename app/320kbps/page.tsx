import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HighQuality320kbpsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Convert to 320kbps Studio Master MP3</h1>
        <p className="text-neutral-600 mb-8">This page is currently under construction. Check back soon for detailed guides and information.</p>
        <Link href="/" className="inline-flex items-center justify-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Converter</span>
        </Link>
      </div>
    </div>
  );
}
