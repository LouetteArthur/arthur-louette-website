import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import HudCorners from "./HudCorners";
import SkillTag from "./SkillTag";

interface ProjectCardProps {
    title: string;
    codename: string;
    description: string;
    tags: string[];
    image: string | null;
    video?: string | null;
    imageAlt: string;
    status?: string;
    youtubeUrl?: string;
}

export default function ProjectCard({
    title,
    codename,
    description,
    tags,
    image,
    video,
    imageAlt,
    status = "ACTIVE",
    youtubeUrl,
}: ProjectCardProps) {
    return (
        <div className="group relative border border-border bg-card hover:border-accent/40 transition-all duration-300">
            <HudCorners />

            {/* Media — Video or Image */}
            <div className="relative h-48 overflow-hidden border-b border-border">
                {video ? (
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ filter: "saturate(0.7) brightness(0.85)" }}
                    />
                ) : image ? (
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "saturate(0.7) brightness(0.85)" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-accent uppercase">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-glow" />
                    {status}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <p className="font-mono text-[10px] text-muted tracking-widest mb-1 uppercase">
                    {codename}
                </p>
                <h3 className="font-display text-xl font-bold tracking-wide uppercase text-foreground mb-3">
                    {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                        <SkillTag key={tag} label={tag} />
                    ))}
                </div>

                {youtubeUrl && (
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-warning/30 text-warning font-mono text-xs tracking-wider uppercase hover:bg-warning hover:text-background transition-all duration-200"
                    >
                        <Play size={12} />
                        WATCH VIDEO
                        <ExternalLink size={10} className="opacity-60" />
                    </a>
                )}
            </div>
        </div>
    );
}
