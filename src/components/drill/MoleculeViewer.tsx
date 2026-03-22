'use client';
import { useState, useEffect } from 'react';

interface Props {
  smiles: string;
  label?: string;
  /** ASCII structural drawing shown if PubChem can't resolve the molecule */
  fallback?: string;
  size?: number;
}

/**
 * Fetches a 2D structural diagram from PubChem REST API (proper CH₃/Br label style).
 * Falls back to the ASCII `fallback` string for reactive species (carbocations, etc.)
 * that PubChem doesn't carry.
 */
export default function MoleculeViewer({ smiles, label, fallback, size = 300 }: Props) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'failed'>('loading');

  const src = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/PNG?image_size=${size}x${size}`;

  useEffect(() => {
    if (!smiles) { setStatus('failed'); return; }
    setStatus('loading');
    const img = new Image();
    img.onload  = () => setStatus('ok');
    img.onerror = () => setStatus('failed');
    img.src = src;
    return () => { img.onload = null; img.onerror = null; };
  }, [src, smiles]);

  // ── Fallback: ASCII structural drawing ──────────────────────────────────────
  if (status === 'failed') {
    if (!fallback) return null;
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="bg-white border border-slate-300 rounded-xl px-8 py-5 w-full max-w-sm">
          <pre className="font-mono text-sm text-slate-800 leading-relaxed whitespace-pre text-center">
            {fallback}
          </pre>
        </div>
        {label && <p className="text-xs text-slate-400 italic">{label}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="rounded-xl overflow-hidden border border-slate-300/30 bg-white flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {status === 'loading' ? (
          <div className="w-full h-full animate-pulse bg-slate-100" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label ?? smiles} width={size} height={size} />
        )}
      </div>
      {label && <p className="text-xs text-slate-400 italic">{label}</p>}
    </div>
  );
}
