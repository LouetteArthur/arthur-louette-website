"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trophy,
  Swords,
  Clock,
  Users,
  Crosshair,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

interface Deaths {
  shot_down: number;
  collision: number;
  out_of_bounds: number;
  timeout: number;
}

interface Ranking {
  rank: number;
  name: string;
  elo: number;
  wins?: number;
  losses?: number;
  draws?: number;
  kills?: number;
  deaths?: Deaths;
  avg_survival_time?: number;
  avg_health_remaining?: number;
  total_hits_received?: number;
}

interface RecentMatch {
  player_a: string;
  player_b: string;
  wins_a: number;
  wins_b: number;
  draws: number;
}

interface LeaderboardData {
  last_updated: string;
  total_matches: number;
  total_games: number;
  rankings: Ranking[];
  recent_matches: RecentMatch[];
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500/20 text-yellow-400 font-mono font-bold text-sm border border-yellow-500/30">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-400/20 text-gray-300 font-mono font-bold text-sm border border-gray-400/30">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-700/20 text-amber-600 font-mono font-bold text-sm border border-amber-700/30">
        3
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 text-text-tertiary font-mono text-sm">
      {rank}
    </span>
  );
}

function DeathBar({ deaths }: { deaths: Deaths }) {
  const total =
    deaths.shot_down + deaths.collision + deaths.out_of_bounds + deaths.timeout;
  if (total === 0) return <span className="text-text-tertiary text-xs">--</span>;

  const segments = [
    { count: deaths.shot_down, color: "bg-red-500", label: "Shot down" },
    { count: deaths.collision, color: "bg-orange-500", label: "Collision" },
    { count: deaths.out_of_bounds, color: "bg-blue-500", label: "Out of bounds" },
    { count: deaths.timeout, color: "bg-text-tertiary", label: "Timeout" },
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-2 w-full overflow-hidden bg-bg-dark-elevated">
        {segments.map(
          (seg) =>
            seg.count > 0 && (
              <div
                key={seg.label}
                className={`${seg.color} transition-all`}
                style={{ width: `${(seg.count / total) * 100}%` }}
                title={`${seg.label}: ${seg.count}`}
              />
            )
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {segments.map(
          (seg) =>
            seg.count > 0 && (
              <span key={seg.label} className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 ${seg.color} inline-block`} />
                <span className="font-mono text-[9px] text-text-tertiary">
                  {seg.count}
                </span>
              </span>
            )
        )}
      </div>
    </div>
  );
}

function AgentDetails({ r }: { r: Ranking }) {
  const totalDeaths = r.deaths
    ? r.deaths.shot_down +
      r.deaths.collision +
      r.deaths.out_of_bounds +
      r.deaths.timeout
    : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 bg-bg-dark-elevated/30">
      <div>
        <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1">
          Kills
        </p>
        <p className="font-mono text-sm text-green-400 font-medium">
          {r.kills ?? 0}
        </p>
      </div>
      <div>
        <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1">
          Deaths
        </p>
        <p className="font-mono text-sm text-red-400 font-medium">
          {totalDeaths}
        </p>
      </div>
      <div>
        <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1">
          Avg Survival
        </p>
        <p className="font-mono text-sm text-text-secondary">
          {r.avg_survival_time ?? 0}s
        </p>
      </div>
      <div>
        <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1">
          Avg HP Left
        </p>
        <p className="font-mono text-sm text-text-secondary">
          {((r.avg_health_remaining ?? 0) * 100).toFixed(0)}%
        </p>
      </div>
      {r.deaths && (
        <div className="col-span-2 sm:col-span-4">
          <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1.5">
            Death Causes
          </p>
          <DeathBar deaths={r.deaths} />
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [error, setError] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/leaderboard.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <header className="border-b border-border-dark bg-bg-dark/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
          >
            <ArrowLeft size={14} />
            <span className="font-display font-medium">A. Louette</span>
          </a>
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase hidden sm:block">
            INFO8003 -- Reinforcement Learning
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Title */}
        <AnimatedSection>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                Tournament
              </span>
              <span className="h-px flex-1 bg-border-dark" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Dogfight Leaderboard
            </h1>
            <p className="text-lg mt-4 max-w-2xl leading-relaxed text-text-secondary">
              Elo-rated 1v1 fixed-wing aerial combat. Submit your agents and
              climb the rankings.
            </p>
          </div>
        </AnimatedSection>

        {error && (
          <div className="border border-red-500/30 bg-red-500/10 p-6 text-red-400 text-sm">
            Failed to load leaderboard data.
          </div>
        )}

        {data && (
          <>
            {/* Stats */}
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  {
                    icon: Users,
                    label: "Agents",
                    value: data.rankings.length,
                  },
                  {
                    icon: Swords,
                    label: "Matches",
                    value: data.total_matches,
                  },
                  {
                    icon: Trophy,
                    label: "Games Played",
                    value: data.total_games,
                  },
                  {
                    icon: Clock,
                    label: "Last Updated",
                    value: data.last_updated
                      ? formatDate(data.last_updated)
                      : "--",
                    isText: true,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-border-dark bg-bg-dark-card p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon size={12} className="text-accent" />
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <p
                      className={`font-display font-bold ${
                        stat.isText
                          ? "text-sm text-text-secondary"
                          : "text-2xl text-text-primary"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Rankings Table */}
            <AnimatedSection delay={0.2}>
              <div className="border border-border-dark">
                <div className="bg-bg-dark-card border-b border-border-dark px-6 py-4 flex items-center gap-3">
                  <Trophy size={16} className="text-accent" />
                  <h2 className="font-display text-lg font-bold text-text-primary">
                    Rankings
                  </h2>
                  <span className="font-mono text-[10px] text-text-tertiary ml-auto">
                    Click a row for details
                  </span>
                </div>

                {data.rankings.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <Swords
                      size={32}
                      className="text-text-tertiary mx-auto mb-4"
                    />
                    <p className="text-text-secondary text-sm">
                      No agents submitted yet. The tournament will begin soon.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Table header */}
                    <div className="grid grid-cols-[3rem_1fr_4rem_3rem_3rem_3rem_4rem_4rem_1.5rem] sm:grid-cols-[3rem_1fr_4rem_3rem_3rem_3rem_4rem_4rem_1.5rem] items-center border-b border-border-dark px-6 py-3 gap-2">
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
                        #
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
                        Agent
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right">
                        Elo
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        W
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        L
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        D
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        <Crosshair size={10} className="inline" /> Kills
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        <Shield size={10} className="inline" /> HP
                      </span>
                      <span />
                    </div>

                    {/* Rows */}
                    {data.rankings.map((r, i) => {
                      const isExpanded = expandedAgent === r.name;
                      const totalDeaths = r.deaths
                        ? r.deaths.shot_down +
                          r.deaths.collision +
                          r.deaths.out_of_bounds +
                          r.deaths.timeout
                        : 0;
                      return (
                        <div key={r.name}>
                          <button
                            onClick={() =>
                              setExpandedAgent(isExpanded ? null : r.name)
                            }
                            className={`w-full grid grid-cols-[3rem_1fr_4rem_3rem_3rem_3rem_4rem_4rem_1.5rem] sm:grid-cols-[3rem_1fr_4rem_3rem_3rem_3rem_4rem_4rem_1.5rem] items-center px-6 py-4 gap-2 border-b border-border-dark/50 transition-colors hover:bg-bg-dark-elevated/50 cursor-pointer text-left ${
                              i < 3 ? "bg-accent/[0.03]" : ""
                            }`}
                          >
                            <RankBadge rank={r.rank} />
                            <span className="font-display font-semibold text-text-primary text-sm truncate">
                              {r.name}
                            </span>
                            <span className="font-mono text-sm text-accent font-medium text-right">
                              {r.elo.toFixed(0)}
                            </span>
                            <span className="font-mono text-sm text-green-400 text-right hidden sm:block">
                              {r.wins ?? "--"}
                            </span>
                            <span className="font-mono text-sm text-red-400 text-right hidden sm:block">
                              {r.losses ?? "--"}
                            </span>
                            <span className="font-mono text-sm text-text-tertiary text-right hidden sm:block">
                              {r.draws ?? "--"}
                            </span>
                            <span className="font-mono text-sm text-text-secondary text-right hidden sm:block">
                              {r.kills ?? 0}
                            </span>
                            <span className="font-mono text-sm text-text-secondary text-right hidden sm:block">
                              {((r.avg_health_remaining ?? 0) * 100).toFixed(0)}
                              %
                            </span>
                            <span className="text-text-tertiary">
                              {isExpanded ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </span>
                          </button>
                          {isExpanded && <AgentDetails r={r} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Death Cause Legend */}
            {data.rankings.length > 0 && (
              <AnimatedSection delay={0.25}>
                <div className="flex flex-wrap gap-4 mt-4 px-2">
                  {[
                    { color: "bg-red-500", label: "Shot down" },
                    { color: "bg-orange-500", label: "Collision" },
                    { color: "bg-blue-500", label: "Out of bounds" },
                    { color: "bg-text-tertiary", label: "Timeout" },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className={`w-2 h-2 ${item.color} inline-block`}
                      />
                      <span className="font-mono text-[10px] text-text-tertiary">
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* Recent Matches */}
            {data.recent_matches.length > 0 && (
              <AnimatedSection delay={0.3}>
                <div className="border border-border-dark mt-8">
                  <div className="bg-bg-dark-card border-b border-border-dark px-6 py-4 flex items-center gap-3">
                    <Swords size={16} className="text-accent" />
                    <h2 className="font-display text-lg font-bold text-text-primary">
                      Recent Matches
                    </h2>
                  </div>
                  <div className="divide-y divide-border-dark/50">
                    {data.recent_matches.map((m, i) => {
                      const aWon = m.wins_a > m.wins_b;
                      const bWon = m.wins_b > m.wins_a;
                      return (
                        <div
                          key={i}
                          className="px-6 py-4 flex items-center justify-between gap-4"
                        >
                          <span
                            className={`font-display text-sm font-medium flex-1 text-right ${
                              aWon ? "text-text-primary" : "text-text-tertiary"
                            }`}
                          >
                            {m.player_a}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono text-sm font-bold ${
                                aWon ? "text-green-400" : "text-text-tertiary"
                              }`}
                            >
                              {m.wins_a}
                            </span>
                            <span className="text-text-tertiary text-xs">
                              -
                            </span>
                            <span
                              className={`font-mono text-sm font-bold ${
                                bWon ? "text-green-400" : "text-text-tertiary"
                              }`}
                            >
                              {m.wins_b}
                            </span>
                            {m.draws > 0 && (
                              <span className="font-mono text-[10px] text-text-tertiary">
                                ({m.draws}D)
                              </span>
                            )}
                          </div>
                          <span
                            className={`font-display text-sm font-medium flex-1 ${
                              bWon ? "text-text-primary" : "text-text-tertiary"
                            }`}
                          >
                            {m.player_b}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Info */}
            <AnimatedSection delay={0.4}>
              <div className="mt-12 border border-border-dark bg-bg-dark-card p-6">
                <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                  How it works
                </h3>
                <ul className="text-sm text-text-secondary space-y-2 leading-relaxed">
                  <li>
                    Agents play a round-robin tournament (10 games per pair).
                  </li>
                  <li>
                    Elo ratings start at 1500 and update after each match
                    (K=32).
                  </li>
                  <li>
                    Top 3 receive +1 bonus point, top 5 receive +0.5.
                  </li>
                  <li>
                    Submit your agents via the Montefiore platform as{" "}
                    <code className="font-mono text-xs text-accent bg-accent/10 px-1.5 py-0.5">
                      groupXX_name.py
                    </code>{" "}
                    files.
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </>
        )}

        {!data && !error && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent animate-spin" />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-tertiary">
            INFO8003 -- Reinforcement Learning -- University of Liege
          </p>
          <p className="text-xs text-text-tertiary">
            Academic Year 2025--2026
          </p>
        </div>
      </footer>
    </div>
  );
}
