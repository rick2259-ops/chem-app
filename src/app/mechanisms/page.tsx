'use client';
import Link from 'next/link';
import { allMechanisms, getMechanismsByCourse } from '@/data/mechanisms';

const courseConfig = {
  CHEM008A: {
    label: 'CHEM 008A — Organic Chemistry I',
    badge: 'bg-blue-600',
    border: 'border-blue-500/30',
    tag: 'bg-blue-500/20 text-blue-300',
  },
  CHEM008B: {
    label: 'CHEM 008B — Organic Chemistry II',
    badge: 'bg-green-600',
    border: 'border-green-500/30',
    tag: 'bg-green-500/20 text-green-300',
  },
  CHEM008C: {
    label: 'CHEM 008C — Organic Chemistry III',
    badge: 'bg-purple-600',
    border: 'border-purple-500/30',
    tag: 'bg-purple-500/20 text-purple-300',
  },
} as const;

type CourseId = keyof typeof courseConfig;

export default function MechanismsPage() {
  const courseIds: CourseId[] = ['CHEM008A', 'CHEM008B', 'CHEM008C'];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reaction Mechanisms</h1>
        <p className="text-slate-400">
          Step-by-step animated mechanisms with electron arrow pushing
        </p>
      </div>

      {courseIds.map(courseId => {
        const mechanisms = getMechanismsByCourse(courseId);
        if (mechanisms.length === 0) return null;
        const config = courseConfig[courseId];

        return (
          <div key={courseId} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`${config.badge} text-white text-xs font-bold px-3 py-1.5 rounded-lg`}>
                {courseId}
              </span>
              <h2 className="text-lg font-semibold text-white">{config.label}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mechanisms.map(mechanism => (
                <div
                  key={mechanism.id}
                  className={`bg-slate-800 rounded-xl border ${config.border} p-5 flex flex-col gap-3 hover:bg-slate-750 transition-colors`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-semibold text-base">{mechanism.name}</h3>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{mechanism.overview}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.tag}`}>
                      {mechanism.reactionType.replace(/-/g, ' ')}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {mechanism.steps.length} steps
                    </span>
                  </div>

                  {/* Steps preview */}
                  <div className="flex gap-1.5">
                    {mechanism.steps.map(step => (
                      <div
                        key={step.stepNumber}
                        className="flex-1 h-1 rounded-full bg-slate-600"
                        title={`Step ${step.stepNumber}: ${step.title}`}
                      />
                    ))}
                  </div>

                  <Link
                    href={`/mechanisms/${mechanism.id}`}
                    className={`w-full text-center py-2.5 rounded-lg ${config.badge} hover:opacity-90 text-white text-sm font-medium transition-opacity`}
                  >
                    View Mechanism →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
