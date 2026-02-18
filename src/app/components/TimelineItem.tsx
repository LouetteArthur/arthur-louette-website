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
                    className={`w-2.5 h-2.5 border-2 rounded-full ${isActive
                        ? "border-accent bg-accent/40"
                        : "border-accent/40 bg-transparent"
                        }`}
                />
                {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-accent/30 to-transparent min-h-16" />
                )}
            </div>

            {/* Content */}
            <div className="pb-10">
                <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
                    {period}
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight text-text-dark mt-1">
                    {title}
                </h3>
                <p className="text-sm text-text-dark-secondary mt-0.5">{institution}</p>
                {description && (
                    <p className="text-base text-text-dark-secondary mt-2 leading-relaxed max-w-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
