"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Trophy,
  Swords,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Heart,
  Cpu,
  Wand2,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

interface Deaths {
  shot_down: number;
  collision: number;
  out_of_bounds: number;
  timeout: number;
  survived?: number;
}

interface PerOpponent {
  opponent: string;
  games: number;
  wins: number;
  losses: number;
  kills: number;
  kill_rate: number;
  win_rate: number;
  avg_damage_dealt: number;
}

interface Ranking {
  rank: number;
  name: string;
  display_name?: string;
  approach?: "heuristic" | "rl" | string;
  description?: string;
  author?: string;
  elo: number;
  wins?: number;
  losses?: number;
  draws?: number;
  kills?: number;
  kill_rate?: number;
  win_rate?: number;
  deaths?: Deaths;
  avg_survival_time?: number;
  avg_health_remaining?: number;
  avg_damage_dealt?: number;
  avg_damage_taken?: number;
  per_opponent?: PerOpponent[];
}

interface RecentMatch {
  player_a: string;
  player_b: string;
  wins_a: number;
  wins_b: number;
  draws?: number;
  mean_reward_a?: number;
  mean_reward_b?: number;
}

interface MatchupCell {
  win_rate: number;
  kill_rate: number;
  games: number;
}

interface LeaderboardData {
  last_updated: string;
  total_matches: number;
  total_games: number;
  rankings: Ranking[];
  matchup_matrix?: Record<string, Record<string, MatchupCell>>;
  recent_matches: RecentMatch[];
}

function displayOf(r: Pick<Ranking, "display_name" | "name">): string {
  return r.display_name || r.name.replace(/^heuristic_/, "");
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

function ApproachBadge({ approach }: { approach?: string }) {
  if (approach === "rl")
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase bg-accent/10 text-accent border border-accent/30">
        <Cpu size={9} /> RL
      </span>
    );
  if (approach === "heuristic")
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase bg-text-tertiary/10 text-text-tertiary border border-text-tertiary/20">
        <Wand2 size={9} /> Rule
      </span>
    );
  return null;
}

function DeathBar({ deaths }: { deaths: Deaths }) {
  const total =
    deaths.shot_down +
    deaths.collision +
    deaths.out_of_bounds +
    deaths.timeout +
    (deaths.survived ?? 0);
  if (total === 0) return <span className="text-text-tertiary text-xs">--</span>;

  const segments = [
    { count: deaths.shot_down, color: "bg-red-500", label: "Shot down" },
    { count: deaths.collision, color: "bg-orange-500", label: "Collision" },
    { count: deaths.out_of_bounds, color: "bg-blue-500", label: "Out of bounds" },
    { count: deaths.timeout, color: "bg-text-tertiary", label: "Timeout" },
    { count: deaths.survived ?? 0, color: "bg-green-500", label: "Survived" },
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
                  {seg.label}: {seg.count}
                </span>
              </span>
            )
        )}
      </div>
    </div>
  );
}

function OpponentBar({
  item,
  nameLookup,
}: {
  item: PerOpponent;
  nameLookup: Record<string, string>;
}) {
  const winPct = Math.round(item.win_rate * 100);
  const killPct = Math.round(item.kill_rate * 100);
  const oppLabel = nameLookup[item.opponent] ?? item.opponent;
  return (
    <div className="grid grid-cols-[8rem_1fr_3.5rem_3.5rem] items-center gap-2">
      <span className="font-mono text-[10px] text-text-secondary truncate">
        {oppLabel}
      </span>
      <div className="relative h-3 bg-bg-dark-elevated overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${
            winPct >= 70
              ? "bg-green-500/70"
              : winPct >= 50
              ? "bg-accent/70"
              : winPct >= 25
              ? "bg-orange-500/70"
              : "bg-red-500/70"
          }`}
          style={{ width: `${winPct}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-text-secondary text-right">
        {item.wins}-{item.games - item.wins - (item.losses > 0 ? 0 : 0)}
      </span>
      <span className="font-mono text-[10px] text-right">
        <span className="text-red-400">{killPct}%</span>
        <span className="text-text-tertiary"> K</span>
      </span>
    </div>
  );
}

function AgentDetails({
  r,
  nameLookup,
}: {
  r: Ranking;
  nameLookup: Record<string, string>;
}) {
  const replayPartner = r.per_opponent?.[0]?.opponent;
  const replayPath = replayPartner
    ? `/replays/${[r.name, replayPartner].sort().join("__vs__")}.gif`
    : null;

  return (
    <div className="bg-bg-dark-elevated/30 px-6 py-5 space-y-5">
      {r.description && (
        <div>
          <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1.5">
            About
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {r.description}
          </p>
          {r.author && (
            <p className="font-mono text-[10px] text-text-tertiary mt-1">
              — {r.author}
            </p>
          )}
        </div>
      )}

      {/* Scalar stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Win Rate" value={`${Math.round((r.win_rate ?? 0) * 100)}%`} accent />
        <Stat label="Kill Rate" value={`${Math.round((r.kill_rate ?? 0) * 100)}%`} />
        <Stat
          label="Avg Dmg Dealt"
          value={`${Math.round((r.avg_damage_dealt ?? 0) * 100)}%`}
        />
        <Stat
          label="Avg HP Left"
          value={`${Math.round((r.avg_health_remaining ?? 0) * 100)}%`}
        />
      </div>

      {/* Replay + opponent bars side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6">
        {replayPath && (
          <div>
            <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1.5">
              Sample Replay {replayPartner && `vs ${nameLookup[replayPartner] ?? replayPartner}`}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={replayPath}
              alt={`Replay of ${displayOf(r)}`}
              className="border border-border-dark w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {r.per_opponent && r.per_opponent.length > 0 && (
          <div>
            <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-2">
              Per-Opponent Breakdown (W–L · kill %)
            </p>
            <div className="space-y-1.5">
              {r.per_opponent.map((p) => (
                <OpponentBar key={p.opponent} item={p} nameLookup={nameLookup} />
              ))}
            </div>
          </div>
        )}
      </div>

      {r.deaths && (
        <div>
          <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1.5">
            Outcomes
          </p>
          <DeathBar deaths={r.deaths} />
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[9px] text-text-tertiary tracking-widest uppercase mb-1">
        {label}
      </p>
      <p
        className={`font-mono text-sm font-medium ${
          accent ? "text-accent" : "text-text-secondary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MatchupMatrix({
  rankings,
  matrix,
  nameLookup,
}: {
  rankings: Ranking[];
  matrix: Record<string, Record<string, MatchupCell>>;
  nameLookup: Record<string, string>;
}) {
  const names = rankings.map((r) => r.name);
  return (
    <div className="border border-border-dark">
      <div className="bg-bg-dark-card border-b border-border-dark px-6 py-4 flex items-center gap-3">
        <Crosshair size={16} className="text-accent" />
        <h2 className="font-display text-lg font-bold text-text-primary">
          Matchup Matrix
        </h2>
        <span className="font-mono text-[10px] text-text-tertiary ml-auto">
          row vs column · win rate
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left font-mono text-[9px] tracking-widest uppercase text-text-tertiary">
                vs
              </th>
              {names.map((n) => (
                <th
                  key={n}
                  className="px-2 py-2 text-center font-mono text-[9px] tracking-widest uppercase text-text-tertiary"
                >
                  {(nameLookup[n] ?? n).slice(0, 4)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {names.map((rowName) => (
              <tr key={rowName} className="border-t border-border-dark/40">
                <td className="px-3 py-1.5 font-mono text-[10px] text-text-secondary whitespace-nowrap">
                  {nameLookup[rowName] ?? rowName}
                </td>
                {names.map((colName) => {
                  if (rowName === colName)
                    return (
                      <td
                        key={colName}
                        className="px-2 py-1.5 text-center text-text-tertiary"
                      >
                        —
                      </td>
                    );
                  const cell = matrix[rowName]?.[colName];
                  if (!cell)
                    return (
                      <td
                        key={colName}
                        className="px-2 py-1.5 text-center text-text-tertiary"
                      >
                        ·
                      </td>
                    );
                  const wr = cell.win_rate;
                  const bg =
                    wr >= 0.7
                      ? "bg-green-500/25"
                      : wr >= 0.5
                      ? "bg-accent/20"
                      : wr >= 0.3
                      ? "bg-orange-500/25"
                      : "bg-red-500/25";
                  return (
                    <td
                      key={colName}
                      className={`px-2 py-1.5 text-center font-mono ${bg}`}
                      title={`${rowName} vs ${colName}: ${Math.round(
                        wr * 100
                      )}% win, ${Math.round(cell.kill_rate * 100)}% kill, ${
                        cell.games
                      } games`}
                    >
                      {Math.round(wr * 100)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  const nameLookup = useMemo(() => {
    const out: Record<string, string> = {};
    if (data) for (const r of data.rankings) out[r.name] = displayOf(r);
    return out;
  }, [data]);

  return (
    <div className="min-h-screen bg-bg-dark">
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
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: Users, label: "Agents", value: data.rankings.length },
                  { icon: Swords, label: "Matches", value: data.total_matches },
                  { icon: Trophy, label: "Games Played", value: data.total_games },
                  {
                    icon: Clock,
                    label: "Last Updated",
                    value: data.last_updated ? formatDate(data.last_updated) : "--",
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
                    <div className="grid grid-cols-[2.5rem_1fr_3.5rem_3rem_3rem_1.5rem] sm:grid-cols-[2.5rem_1fr_3.5rem_3rem_3rem_3rem_1.5rem] items-center border-b border-border-dark px-6 py-3 gap-2">
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">#</span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
                        Agent
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right">
                        Elo
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right">
                        Win%
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        Kill%
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase text-right hidden sm:block">
                        Dmg%
                      </span>
                      <span />
                    </div>

                    {data.rankings.map((r, i) => {
                      const isExpanded = expandedAgent === r.name;
                      const winPct =
                        r.win_rate !== undefined
                          ? Math.round(r.win_rate * 100)
                          : r.wins !== undefined && r.losses !== undefined
                          ? Math.round(
                              (r.wins / Math.max(r.wins + r.losses, 1)) * 100
                            )
                          : 0;
                      const killPct = Math.round((r.kill_rate ?? 0) * 100);
                      const dmgPct = Math.round(
                        (r.avg_damage_dealt ?? 0) * 100
                      );
                      return (
                        <div key={r.name}>
                          <button
                            onClick={() =>
                              setExpandedAgent(isExpanded ? null : r.name)
                            }
                            className={`w-full grid grid-cols-[2.5rem_1fr_3.5rem_3rem_3rem_1.5rem] sm:grid-cols-[2.5rem_1fr_3.5rem_3rem_3rem_3rem_1.5rem] items-center px-6 py-4 gap-2 border-b border-border-dark/50 transition-colors hover:bg-bg-dark-elevated/50 cursor-pointer text-left ${
                              i < 3 ? "bg-accent/[0.03]" : ""
                            }`}
                          >
                            <RankBadge rank={r.rank} />
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-display font-semibold text-text-primary text-sm truncate">
                                {displayOf(r)}
                              </span>
                              <ApproachBadge approach={r.approach} />
                            </div>
                            <span className="font-mono text-sm text-accent font-medium text-right">
                              {r.elo.toFixed(0)}
                            </span>
                            <span className="font-mono text-sm text-green-400 text-right">
                              {winPct}
                            </span>
                            <span className="font-mono text-sm text-red-400 text-right hidden sm:block">
                              {killPct}
                            </span>
                            <span className="font-mono text-sm text-orange-400 text-right hidden sm:block">
                              {dmgPct}
                            </span>
                            <span className="text-text-tertiary">
                              {isExpanded ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </span>
                          </button>
                          {isExpanded && (
                            <AgentDetails r={r} nameLookup={nameLookup} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {data.matchup_matrix && (
              <AnimatedSection delay={0.25}>
                <div className="mt-8">
                  <MatchupMatrix
                    rankings={data.rankings}
                    matrix={data.matchup_matrix}
                    nameLookup={nameLookup}
                  />
                </div>
              </AnimatedSection>
            )}

            {data.recent_matches.length > 0 && (
              <AnimatedSection delay={0.3}>
                <div className="border border-border-dark mt-8">
                  <div className="bg-bg-dark-card border-b border-border-dark px-6 py-4 flex items-center gap-3">
                    <Swords size={16} className="text-accent" />
                    <h2 className="font-display text-lg font-bold text-text-primary">
                      Match Results
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
                            {nameLookup[m.player_a] ?? m.player_a}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono text-sm font-bold ${
                                aWon ? "text-green-400" : "text-text-tertiary"
                              }`}
                            >
                              {m.wins_a}
                            </span>
                            <span className="text-text-tertiary text-xs">-</span>
                            <span
                              className={`font-mono text-sm font-bold ${
                                bWon ? "text-green-400" : "text-text-tertiary"
                              }`}
                            >
                              {m.wins_b}
                            </span>
                          </div>
                          <span
                            className={`font-display text-sm font-medium flex-1 ${
                              bWon ? "text-text-primary" : "text-text-tertiary"
                            }`}
                          >
                            {nameLookup[m.player_b] ?? m.player_b}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.4}>
              <div className="mt-12 border border-border-dark bg-bg-dark-card p-6">
                <h3 className="font-display text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Heart size={14} className="text-accent" />
                  How it works
                </h3>
                <ul className="text-sm text-text-secondary space-y-2 leading-relaxed">
                  <li>
                    Agents play a round-robin tournament (10 games per pair).
                  </li>
                  <li>
                    Winner of a game = higher accumulated PyFlyt reward at the
                    end. Out-of-bounds / collision trigger a −1000 terminal
                    penalty, so crashing almost always loses.
                  </li>
                  <li>
                    Elo ratings start at 1500 and update after each match
                    (K=32).
                  </li>
                  <li>
                    <span className="font-mono text-xs text-accent">Win%</span>{" "}
                    = fraction of games won.{" "}
                    <span className="font-mono text-xs text-red-400">
                      Kill%
                    </span>{" "}
                    = fraction of games ending with the opponent shot down
                    (HP→0 from combat damage).{" "}
                    <span className="font-mono text-xs text-orange-400">
                      Dmg%
                    </span>{" "}
                    = average damage dealt per game.
                  </li>
                  <li>
                    Submit your agents via the Montefiore platform as{" "}
                    <code className="font-mono text-xs text-accent bg-accent/10 px-1.5 py-0.5">
                      groupXX_name.py
                    </code>{" "}
                    files. Your{" "}
                    <code className="font-mono text-xs text-accent bg-accent/10 px-1.5 py-0.5">
                      .zip
                    </code>{" "}
                    must load in the pinned evaluation environment — see{" "}
                    <code className="font-mono text-xs text-accent bg-accent/10 px-1.5 py-0.5">
                      requirements.txt
                    </code>{" "}
                    in the student repo and re-export your model from a venv
                    matching it before submitting (a one-line{" "}
                    <code className="font-mono text-xs">PPO.load().save()</code>{" "}
                    is enough; no retraining needed).
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
