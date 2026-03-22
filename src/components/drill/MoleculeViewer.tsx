'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  smiles: string;
  label?: string;
  width?: number;
  height?: number;
}

export default function MoleculeViewer({ smiles, label, width = 300, height = 220 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !smiles) return;
    let cancelled = false;
    setFailed(false);

    import('smiles-drawer').then((mod) => {
      if (cancelled || !canvasRef.current) return;
      const SD = (mod.default ?? mod) as any;

      const drawer = new SD.Drawer({
        width,
        height,
        bondThickness: 1.5,
        fontSizeLarge: 15,
        fontSizeSmall: 9,
        padding: 24,
        compactDrawing: false,
      });

      SD.parse(
        smiles,
        (tree: any) => {
          if (!cancelled && canvasRef.current) {
            try {
              drawer.draw(tree, canvasRef.current, 'light', false);
            } catch {
              if (!cancelled) setFailed(true);
            }
          }
        },
        () => { if (!cancelled) setFailed(true); }
      );
    }).catch(() => { if (!cancelled) setFailed(true); });

    return () => { cancelled = true; };
  }, [smiles, width, height]);

  if (failed) return null;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-xl overflow-hidden border border-slate-600/40 shadow-sm">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ background: '#ffffff', display: 'block' }}
        />
      </div>
      {label && <p className="text-xs text-slate-400 italic">{label}</p>}
    </div>
  );
}
