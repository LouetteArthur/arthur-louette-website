"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, GraduationCap, Copy, Check } from "lucide-react";

export default function TerminalContact() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<string[]>([]);
    const [isCopied, setIsCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const SOCIALS = [
        { name: "email", value: "arthur.louette@uliege.be", icon: Mail },
        { name: "linkedin", value: "linked.in/arthur-louette", icon: Linkedin, href: "https://www.linkedin.com/in/arthur-louette/" },
        { name: "github", value: "github.com/LouetteArthur", icon: Github, href: "https://github.com/LouetteArthur" },
        { name: "scholar", value: "google.scholar/arthur", icon: GraduationCap, href: "https://scholar.google.fr/citations?user=P0jRcPkAAAAJ" },
    ];

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("arthur.louette@uliege.be");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto font-mono text-sm shadow-2xl rounded-lg overflow-hidden border border-border-dark bg-bg-dark-card">
            {/* Terminal Header */}
            <div className="bg-[#1a1b1e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 text-center text-text-tertiary text-xs tracking-wider opacity-60">
                    guest@belerion:~/contact
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 bg-[#0d0e11] text-text-secondary min-h-[300px] flex flex-col gap-6">

                {/* Welcome Msg */}
                <div className="space-y-1">
                    <p>Belerion OS [Version 3.0.1]</p>
                    <p>(c) 2025 Arthur Louette. All rights reserved.</p>
                    <br />
                    <p className="text-accent">Accessing contact protocols...</p>
                </div>

                {/* Contact Info Grid */}
                <div className="grid gap-4 mt-2">
                    {SOCIALS.map((social) => {
                        const Icon = social.icon;
                        return (
                            <div key={social.name} className="flex items-center gap-4 group">
                                <span className="text-accent min-w-[20px]">{">"}</span>
                                <div className="flex items-center gap-3 w-32 text-text-tertiary">
                                    <Icon size={14} />
                                    <span className="uppercase tracking-wider text-xs">{social.name}</span>
                                </div>
                                {social.href ? (
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-primary hover:text-accent hover:underline decoration-accent/30 underline-offset-4 transition-colors"
                                    >
                                        {social.value}
                                    </a>
                                ) : (
                                    <button
                                        onClick={handleCopyEmail}
                                        className="text-text-primary hover:text-accent flex items-center gap-2 group/copy text-left"
                                    >
                                        {social.value}
                                        {isCopied ? <Check size={12} className="text-accent" /> : <Copy size={12} className="opacity-0 group-hover/copy:opacity-100 transition-opacity" />}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Fake Input Line */}
                <div className="flex items-center gap-2 mt-auto pt-4 text-text-primary">
                    <span className="text-accent">guest@belerion:~$</span>
                    <span className="w-2.5 h-5 bg-accent/60 animate-pulse block"></span>
                </div>
            </div>
        </div>
    );
}
