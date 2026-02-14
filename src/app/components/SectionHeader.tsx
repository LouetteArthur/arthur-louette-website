interface SectionHeaderProps {
    index: string;
    title: string;
    subtitle?: string;
}

export default function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
                <span
                    className="font-mono text-xs tracking-widest text-accent/60 uppercase"
                    aria-hidden="true"
                >
          // {index}
                </span>
                <span className="h-px flex-1 bg-accent/20" aria-hidden="true" />
                <span
                    className="font-mono text-[10px] tracking-wider text-muted"
                    aria-hidden="true"
                >
                    &#9679; ACTIVE
                </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wider uppercase text-foreground">
                {title}
            </h2>
            {subtitle && (
                <p className="font-mono text-sm text-muted mt-2 tracking-wide">{subtitle}</p>
            )}
        </div>
    );
}
