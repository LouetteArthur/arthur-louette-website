interface SectionHeaderProps {
    index: string;
    title: string;
    subtitle?: string;
    light?: boolean;
}

export default function SectionHeader({
    index,
    title,
    subtitle,
    light = false,
}: SectionHeaderProps) {
    return (
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                    {index}
                </span>
                <span
                    className={`h-px flex-1 ${light ? "bg-border-light" : "bg-border-dark"}`}
                    aria-hidden="true"
                />
            </div>
            <h2
                className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${light ? "text-text-dark" : "text-text-primary"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`text-lg mt-4 max-w-2xl leading-relaxed ${light ? "text-text-dark-secondary" : "text-text-secondary"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
