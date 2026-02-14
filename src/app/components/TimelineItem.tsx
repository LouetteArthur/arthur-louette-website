interface TimelineItemProps {
    period: string;
    title: string;
    institution: string;
    description?: string;
    isActive?: boolean;
    isLast?: boolean;
}

export default function TimelineItem({
    period,
    title,
    institution,
    description,
    isActive = false,
    isLast = false,
}: TimelineItemProps) {
    return (
        <div className="relative flex gap-6">
            {/* Line + Dot */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-3 h-3 border-2 ${isActive
                            ? "border-accent bg-accent/30 animate-pulse-glow"
                            : "border-accent/50 bg-transparent"
                        }`}
                    style={{ borderRadius: 0 }}
                />
                {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-accent/40 to-transparent min-h-16" />
                )}
            </div>

            {/* Content */}
            <div className="pb-10">
                <span className="font-mono text-xs text-accent tracking-widest uppercase">
                    {period}
                </span>
                <h3 className="font-display text-lg font-bold tracking-wide uppercase text-foreground mt-1">
                    {title}
                </h3>
                <p className="font-mono text-sm text-muted mt-0.5">{institution}</p>
                {description && (
                    <p className="text-sm text-muted/80 mt-2 leading-relaxed max-w-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
