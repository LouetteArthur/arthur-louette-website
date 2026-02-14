interface SkillTagProps {
    label: string;
    variant?: "default" | "warning";
}

export default function SkillTag({ label, variant = "default" }: SkillTagProps) {
    const base =
        "inline-flex items-center px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-default";

    const variants = {
        default:
            "border border-accent/30 text-accent bg-accent/10 hover:bg-accent hover:text-background hover:shadow-[0_0_12px_var(--color-accent-dim)]",
        warning:
            "border border-warning/30 text-warning bg-warning/10 hover:bg-warning hover:text-background hover:shadow-[0_0_12px_var(--color-warning-dim)]",
    };

    return <span className={`${base} ${variants[variant]}`}>{label}</span>;
}
