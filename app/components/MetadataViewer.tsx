"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, Music, Tag, Copy, Share2, Info, RefreshCw } from 'lucide-react';

export default function MetadataViewer() {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).jsmediatags) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsScriptLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
      script.async = true;
      script.onload = () =>  
        setIsScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  const processFile = (file: File) => {
    setFile(file);
    setLoading(true);
    setError(null);
    setWarning(null);
    setTags(null);

    const jsmediatags = (window as any).jsmediatags;
    if (!jsmediatags) { 
      setError('Library not loaded. Please wait a moment and try again.'); 
      setLoading(false); 
      return; 
    }

    jsmediatags.read(file, {
      onSuccess: function(tag: any) {
        setTags(tag.tags);
        setLoading(false);
      },
      onError: function(err: any) {
        console.warn('Metadata not found:', err.info);
        if (err && err.type === 'tagFormat') {
          setWarning('No embedded metadata tags found (or format unsupported). Showing basic file info.');
          setTags({}); // Set empty tags so UI still shows file name and size
        } else {
          setError('Failed to extract metadata: ' + (err.info || 'Unknown error.'));
        }
        setLoading(false);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isScriptLoaded) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!tags) return;
    const metadataText = `
Title: ${tags.title || t('mv_unknown')}
Artist: ${tags.artist || t('mv_unknown')}
Album: ${tags.album || t('mv_unknown')}
Year: ${tags.year || t('mv_unknown')}
Genre: ${tags.genre || t('mv_unknown')}
Track: ${tags.track || t('mv_unknown')}
    `.trim();
    navigator.clipboard.writeText(metadataText);
    alert('Metadata copied to clipboard!');
  };

  const handleShare = async () => {
    if (!tags) return;
    const metadataText = `Check out this audio metadata:\nTitle: ${tags.title || t('mv_unknown')}\nArtist: ${tags.artist || t('mv_unknown')}\nAlbum: ${tags.album || t('mv_unknown')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Audio Metadata',
          text: metadataText,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const reset = () => {
    setFile(null);
    setTags(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  let pictureUrl = null;
  if (tags && tags.picture) {
    const { data, format } = tags.picture;
    let base64String = "";
    for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
    }
    pictureUrl = `data:${format};base64,${window.btoa(base64String)}`;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Upload Box */}
      {!file && (
        <div 
          className={`w-full bg-surface-container/80 backdrop-blur-2xl rounded-2xl border-2 border-dashed ${!isScriptLoaded ? 'opacity-50 cursor-not-allowed border-outline-variant' : isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-outline-variant hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10'} p-10 md:p-16 text-center transition-all duration-300 flex flex-col items-center justify-center gap-4`}
          onDragOver={(e) => { e.preventDefault(); if (isScriptLoaded) setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => { if (isScriptLoaded) fileInputRef.current?.click(); }}
          style={{ cursor: isScriptLoaded ? 'pointer' : 'not-allowed' }}
          title={isScriptLoaded ? 'Click to select audio file' : 'Wait for engine loading'}
        >
          <input 
            type="file" 
            accept="audio/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => e.target.files && processFile(e.target.files[0])} 
            onClick={(e) => e.stopPropagation()}
            disabled={!isScriptLoaded}
          />
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {isScriptLoaded ? <Upload className="w-8 h-8 text-primary" /> : <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
          </div>
          <h3 className="text-2xl font-bold text-on-surface">
            {isScriptLoaded ? t('mv_upload_title') : t('mv_loading_engine')}
          </h3>
          <p className="text-on-surface-variant max-w-sm">
            {isScriptLoaded 
              ? t('mv_drag_drop')
              : t('mv_please_wait')}
          </p>
        </div>
      )}

      {loading && (
        <div className="w-full p-12 flex flex-col items-center justify-center bg-surface-container rounded-2xl border border-outline-variant/10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-on-surface-variant">{t('mv_extracting')}</p>
        </div>
      )}

      {error && (
        <div className="w-full p-6 bg-error/10 rounded-2xl border border-error/20 flex flex-col items-center justify-center gap-4 text-center">
          <Info className="w-10 h-10 text-error" />
          <div>
            <h3 className="text-lg font-bold text-on-surface mb-1">{t('mv_error_title')}</h3>
            <p className="text-on-surface-variant text-sm">{error}</p>
          </div>
          <button onClick={reset} className="px-4 py-2 bg-surface-bright rounded-lg text-sm font-medium mt-2 hover:bg-surface-dim transition-colors">{t('mv_try_another')}</button>
        </div>
      )}

      
      {warning && (
        <div className="w-full p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 flex items-center gap-3 text-sm">
          <Info className="w-5 h-5 shrink-0" />
          <p>{warning}</p>
        </div>
      )}
      {tags && (

        <div className="w-full bg-surface-container/80 backdrop-blur-2xl rounded-2xl border border-outline-variant/10 shadow-2xl overflow-hidden p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Artwork */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="aspect-square bg-surface-dim rounded-xl overflow-hidden border border-outline-variant/10 flex items-center justify-center relative shadow-inner">
                {pictureUrl ? (
                  <img src={pictureUrl} alt="Album Art" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-on-surface-variant/50">
                    <Music className="w-16 h-16 mb-2 opacity-50" />
                    <span className="text-sm">{t('mv_no_artwork')}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-bright hover:bg-surface-dim text-on-surface rounded-lg transition-colors text-sm font-medium border border-outline-variant/10">
                  <Copy className="w-4 h-4" /> {t('mv_copy_details')}
                </button>
                <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium">
                  <Share2 className="w-4 h-4" /> {t('mv_share')}
                </button>
              </div>
            </div>

            {/* Metadata Details */}
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/10">
                <div className="overflow-hidden">
                  <h2 className="text-2xl font-bold text-on-surface truncate pr-4" title={file?.name}>{file?.name}</h2>
                  <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                    <Tag className="w-3.5 h-3.5" /> {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0)} MB • {file?.type || t('mv_unknown_type')}
                  </p>
                </div>
                <button onClick={reset} className="p-2 hover:bg-surface-bright rounded-full transition-colors shrink-0" title={t('mv_upload_another')}>
                  <RefreshCw className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_title')}</span>
                  <span className="text-on-surface font-medium truncate" title={tags.title || t('mv_unknown')}>{tags.title || t('mv_unknown')}</span>
                </div>
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_artist')}</span>
                  <span className="text-on-surface font-medium truncate" title={tags.artist || t('mv_unknown')}>{tags.artist || t('mv_unknown')}</span>
                </div>
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_album')}</span>
                  <span className="text-on-surface font-medium truncate" title={tags.album || t('mv_unknown')}>{tags.album || t('mv_unknown')}</span>
                </div>
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_year')}</span>
                  <span className="text-on-surface font-medium truncate">{tags.year || t('mv_unknown')}</span>
                </div>
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_genre')}</span>
                  <span className="text-on-surface font-medium truncate">{tags.genre || t('mv_unknown')}</span>
                </div>
                <div className="flex flex-col p-3 bg-surface-dim/50 rounded-lg border border-outline-variant/10 overflow-hidden">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono mb-1">{t('mv_tag_track')}</span>
                  <span className="text-on-surface font-medium truncate">{tags.track || t('mv_unknown')}</span>
                </div>
              </div>

              {/* Advanced Tags Dropdown/List */}
              <div className="mt-6 pt-4 border-t border-outline-variant/10">
                <h4 className="text-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" /> {t('mv_advanced_tags')}
                </h4>
                <div className="bg-black/20 p-4 rounded-lg overflow-x-auto max-h-48 custom-scrollbar border border-outline-variant/10">
                  <pre className="text-xs text-on-surface-variant font-jb-mono">
                    {JSON.stringify(
                      Object.fromEntries(
                        Object.entries(tags).filter(([key]) => key !== 'picture')
                      ),
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
