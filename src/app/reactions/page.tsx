'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { allReactions, ReactionEntry } from '@/data/reactions';

// ─── Types ────────────────────────────────────────────────────────────────────

type CourseFilter = 'ALL' | 'CHEM008A' | 'CHEM008B' | 'CHEM008C';

// ─── Constants ───────────────────────────────────────────────────────────────

const COURSE_CONFIG: Record<string, { label: string; badge: string; border: string; tag: string }> = {
  CHEM008A: {
    label: 'CHEM 008A',
    badge: 'bg-blue-600',
    border: 'border-blue-500/30',
    tag: 'bg-blue-500/20 text-blue-300',
  },
  CHEM008B: {
    label: 'CHEM 008B',
    badge: 'bg-green-600',
    border: 'border-green-500/30',
    tag: 'bg-green-500/20 text-green-300',
  },
  CHEM008C: {
    label: 'CHEM 008C',
    badge: 'bg-purple-600',
    border: 'border-purple-500/30',
    tag: 'bg-purple-500/20 text-purple-300',
  },
};

// ─── Reaction Card ────────────────────────────────────────────────────────────

function ReactionCard({ reaction }: { reaction: ReactionEntry }) {
  const [expanded, setExpanded] = useState(false);
  const config = COURSE_CONFIG[reaction.courseId];

  return (
    <div
      className={`bg-slate-800 rounded-xl border ${config.border} overflow-hidden transition-all`}
    >
      {/* Header row — always visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-start gap-4 p-4 text-left hover:bg-slate-750 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.tag}`}>
              {reaction.courseId}
            </span>
            <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
              {reaction.category}
            </span>
          </div>
          <div className="text-white font-semibold text-sm leading-snug">{reaction.name}</div>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
            <span className="text-slate-400 font-mono">{reaction.substrate}</span>
            <span className="text-slate-500">{reaction.reactionArrow ?? '→'}</span>
            <span className="text-slate-300 font-mono">{reaction.product}</span>
          </div>
        </div>
        <span className="text-slate-500 text-sm flex-shrink-0 mt-0.5">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-slate-700 p-4 space-y-3 animate-fadeInUp">
          {/* Reagents */}
          <div className="flex gap-3">
            <span className="w-28 flex-shrink-0 text-xs font-semibold text-slate-400 uppercase tracking-wide pt-0.5">Reagents</span>
            <span className="text-sm text-emerald-300 font-mono leading-relaxed">{reaction.reagents}</span>
          </div>

          {/* Conditions */}
          {reaction.conditions && (
            <div className="flex gap-3">
              <span className="w-28 flex-shrink-0 text-xs font-semibold text-slate-400 uppercase tracking-wide pt-0.5">Conditions</span>
              <span className="text-sm text-slate-300 leading-relaxed">{reaction.conditions}</span>
            </div>
          )}

          {/* Stereochemistry */}
          {reaction.stereochemistry && (
            <div className="flex gap-3">
              <span className="w-28 flex-shrink-0 text-xs font-semibold text-slate-400 uppercase tracking-wide pt-0.5">Stereo</span>
              <span className="text-sm text-sky-300 leading-relaxed">{reaction.stereochemistry}</span>
            </div>
          )}

          {/* Notes */}
          {reaction.notes && (
            <div className="flex gap-3">
              <span className="w-28 flex-shrink-0 text-xs font-semibold text-slate-400 uppercase tracking-wide pt-0.5">Notes</span>
              <span className="text-sm text-slate-400 leading-relaxed">{reaction.notes}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReactionsPage() {
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('ALL');
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allReactions.filter(r => {
      if (courseFilter !== 'ALL' && r.courseId !== courseFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.reagents.toLowerCase().includes(q) ||
        r.substrate.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        (r.notes?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [courseFilter, search]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, ReactionEntry[]>();
    for (const r of filtered) {
      const existing = map.get(r.category) ?? [];
      existing.push(r);
      map.set(r.category, existing);
    }
    return map;
  }, [filtered]);

  function toggleCategory(cat: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function expandAll() {
    setExpandedCategories(new Set(grouped.keys()));
  }

  function collapseAll() {
    setExpandedCategories(new Set());
  }

  const totalShown = filtered.length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reaction Reference Sheet</h1>
        <p className="text-slate-400">
          Complete reaction summary for UCR CHEM 008A / 008B / 008C — click any reaction to see details.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Course filter */}
        <div className="flex gap-2">
          {(['ALL', 'CHEM008A', 'CHEM008B', 'CHEM008C'] as CourseFilter[]).map(c => (
            <button
              key={c}
              onClick={() => setCourseFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                courseFilter === c
                  ? c === 'ALL'
                    ? 'bg-slate-600 text-white border border-slate-500'
                    : `${COURSE_CONFIG[c].badge} text-white`
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              {c === 'ALL' ? 'All Courses' : c.replace('CHEM', 'CHEM ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reactions, reagents, products..."
            className="w-full bg-slate-800 border border-slate-700 text-white text-sm px-4 py-1.5 rounded-lg placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors"
          />
        </div>

        {/* Expand/Collapse all */}
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Count */}
      <div className="text-slate-500 text-xs mb-6">
        Showing {totalShown} of {allReactions.length} reactions
      </div>

      {/* Groups */}
      {grouped.size === 0 ? (
        <div className="text-center py-16 text-slate-500">
          No reactions match your search.
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([category, reactions]) => {
            const isExpanded = expandedCategories.has(category);
            // Pick a course for the category header color (use the first reaction's course)
            const repCourse = reactions[0].courseId;
            const config = COURSE_CONFIG[repCourse];

            return (
              <div key={category}>
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between mb-3 group"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-semibold text-white group-hover:text-slate-200 transition-colors">
                      {category}
                    </h2>
                    <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                      {reactions.length}
                    </span>
                  </div>
                  <span className="text-slate-500 text-sm">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {isExpanded && (
                  <div className="space-y-2 animate-fadeInUp">
                    {reactions.map(r => (
                      <ReactionCard key={r.id} reaction={r} />
                    ))}
                  </div>
                )}

                {/* Collapsed preview */}
                {!isExpanded && (
                  <div
                    className="grid gap-2 cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {reactions.slice(0, 2).map(r => (
                      <div
                        key={r.id}
                        className={`bg-slate-800/50 rounded-xl border ${config.border} px-4 py-2.5 flex items-center gap-3 text-sm opacity-60`}
                      >
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.tag}`}>
                          {r.courseId}
                        </span>
                        <span className="text-white font-medium">{r.name}</span>
                        <span className="text-slate-500 ml-auto text-xs truncate max-w-[200px]">
                          {r.reagents}
                        </span>
                      </div>
                    ))}
                    {reactions.length > 2 && (
                      <div className="text-xs text-slate-500 pl-2">
                        +{reactions.length - 2} more — click to expand
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer link */}
      <div className="mt-12 text-center">
        <Link href="/mechanisms" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
          Want step-by-step mechanisms? → View Mechanisms
        </Link>
      </div>
    </div>
  );
}
