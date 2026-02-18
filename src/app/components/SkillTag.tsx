interface SkillTagProps {
    label: string;
}

export default function SkillTag({ label }: SkillTagProps) {
    return (
        <span className="inline-flex items-center px-3 py-1.5 font-mono text-xs uppercase tracking-wider border border-accent/25 text-accent bg-accent/5 hover:bg-accent/15 hover:border-accent/40 transition-all duration-200 cursor-default">
            {label}
        </span>
    );
}
