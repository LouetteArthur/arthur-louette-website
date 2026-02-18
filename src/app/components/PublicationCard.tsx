"use client";

import { useState } from "react";
import {
    ChevronDown,
    ExternalLink,
    FileText,
    Users,
    Award,
    GraduationCap
} from "lucide-react";
import Image from "next/image";

interface PublicationProps {
    title: string;
    authors: string[];
    venue: string;
    year: string;
    abstract: string;
    link: string;
    citations?: number;
    tags: string[];
    isFirstAuthor?: boolean;
    supervisedAuthor?: string; // Name of the supervised student (e.g. "Julien Hansen")
    image?: string;
}

export default function PublicationCard({
    title,
    authors,
    venue,
    year,
    abstract,
    link,
    citations,
    tags,
    isFirstAuthor,
    supervisedAuthor,
    image,
}: PublicationProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Helper to format authors with bolding for "Arthur Louette" and highlighting supervised students
    const formatAuthors = () => {
        return authors.map((author, index) => {
            const isMe = author.includes("Louette");
            const isSupervised = supervisedAuthor && author.includes(supervisedAuthor);

            return (
                <span key={index} className="inline">
                    {index > 0 && ", "}
                    <span
                        className={`
              ${isMe ? "font-bold text-text-primary underline decoration-accent/30 underline-offset-4" : ""}
              ${isSupervised ? "text-accent font-medium" : ""}
            `}
                    >
                        {author}
                        {isSupervised && (
                            <sup className="ml-0.5 text-[0.6em] font-mono text-accent tracking-tighter">
                                (SUPERVISED)
                            </sup>
                        )}
                    </span>
                </span>
            );
        });
    };

    return (
        <div className={`group relative border border-border-light bg-bg-light-card hover:border-accent/40 hover:shadow-lg transition-all duration-500 rounded-sm overflow-hidden flex flex-col ${isExpanded ? 'bg-bg-light-secondary/30' : ''}`}>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header Metadata */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono tracking-wider text-text-tertiary uppercase">
                        <span className="flex items-center gap-1.5 font-bold text-accent">
                            {year}
                        </span>
                        <span className="w-px h-3 bg-border-light/50" />
                        <span>{venue}</span>
                        {citations ? (
                            <>
                                <span className="w-px h-3 bg-border-light/50" />
                                <span className="flex items-center gap-1">
                                    <Users size={12} /> {citations} CITATIONS
                                </span>
                            </>
                        ) : null}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text-dark mb-4 leading-snug group-hover:text-highlight transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Authors */}
                    <div className="text-sm text-text-dark-secondary mb-6 leading-relaxed">
                        {formatAuthors()}
                    </div>

                    {/* Tags & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-border-light text-text-tertiary rounded-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                            {isFirstAuthor && (
                                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 rounded-sm flex items-center gap-1">
                                    <Award size={10} /> First Author
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-tertiary hover:text-accent transition-colors"
                            >
                                {isExpanded ? "Hide Abstract" : "Abstract"}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                />
                            </button>

                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-tertiary hover:text-highlight transition-colors"
                            >
                                Scholar
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Abstract Accordion */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100 border-t border-border-light/50" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-6 md:p-8 bg-bg-light-secondary/50 text-sm md:text-base text-text-dark-secondary leading-relaxed">
                    <p className="max-w-3xl">
                        <span className="font-bold text-text-dark mr-2">Abstract:</span>
                        {abstract}
                    </p>
                </div>
            </div>
        </div>
    );
}
