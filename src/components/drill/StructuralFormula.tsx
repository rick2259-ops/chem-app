'use client';

interface Props {
  structural: string;
  label?: string;
}

export default function StructuralFormula({ structural, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="bg-slate-950 border border-slate-700 rounded-xl px-6 py-4 w-full max-w-sm">
        <pre className="font-mono text-sm text-cyan-300 leading-relaxed whitespace-pre text-center">
          {structural}
        </pre>
      </div>
      {label && (
        <p className="text-xs text-slate-500 italic">{label}</p>
      )}
    </div>
  );
}
