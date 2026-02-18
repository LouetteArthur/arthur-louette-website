import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

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
        <div className="group relative h-full border border-border-dark bg-bg-dark-card hover:border-accent/30 transition-all duration-500">
            {/* Media — Video or Image */}
            <div className="relative h-48 overflow-hidden border-b border-border-dark">
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
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-card via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
                    {status}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <span className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">
                    {codename}
                </span>

                <h3 className="font-display text-xl font-bold tracking-tight text-text-primary mt-2 mb-3">
                    {title}
                </h3>

                <p className="text-base text-text-secondary leading-relaxed mb-5">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border border-accent/20 text-accent/80 bg-accent/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {youtubeUrl && (
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-highlight/30 text-highlight font-mono text-xs tracking-wider uppercase hover:bg-highlight hover:text-bg-dark transition-all duration-200"
                    >
                        <Play size={12} />
                        Watch Video
                        <ExternalLink size={10} className="opacity-60" />
                    </a>
                )}
            </div>
        </div>
    );
}
