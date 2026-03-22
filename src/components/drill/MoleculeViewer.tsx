'use client';
import { useEffect, useRef } from 'react';

interface Props {
  smiles: string;
  width?: number;
  height?: number;
  label?: string;
}

export default function MoleculeViewer({ smiles, width = 300, height = 180, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !smiles) return;
    let cancelled = false;

    import('smiles-drawer').then((mod) => {
      if (cancelled) return;
      // smiles-drawer v2 exports the module as default or as named exports
      const SD = (mod.default ?? mod) as any;
      const drawer = new SD.Drawer({ width, height });
      SD.parse(
        smiles,
        (tree: any) => {
          if (!cancelled && canvasRef.current) {
            drawer.draw(tree, canvasRef.current, 'dark', false);
          }
        },
        (err: unknown) => console.warn('MoleculeViewer:', err)
      );
    }).catch((e) => console.warn('smiles-drawer load error:', e));

    return () => { cancelled = true; };
  }, [smiles, width, height]);

  return (
    <div className="flex flex-col items-center gap-1">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg bg-slate-900 border border-slate-700"
      />
      {label && <p className="text-xs text-slate-500 italic">{label}</p>}
    </div>
  );
}
