"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { id: "about", label: "ABOUT" },
    { id: "research", label: "RESEARCH" },
    { id: "news", label: "NEWS" },
    { id: "education", label: "EDUCATION" },
    { id: "teaching", label: "TEACHING" },
    { id: "contact", label: "CONTACT" },
];

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = NAV_ITEMS.map((item) => ({
                id: item.id,
                el: document.getElementById(item.id),
            }));

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = sections[i].el;
                if (el && el.getBoundingClientRect().top <= 120) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/90 backdrop-blur-sm border-b border-border"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
                {/* Logo / Callsign */}
                <a
                    href="#"
                    className="font-display font-bold text-lg tracking-widest text-accent"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    A.LOUETTE<span className="animate-blink">_</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item, i) => (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={`font-mono text-[11px] tracking-widest px-3 py-1.5 transition-colors ${activeSection === item.id
                                ? "text-accent"
                                : "text-muted hover:text-foreground"
                                }`}
                        >
                            <span className="text-accent/40 mr-1" aria-hidden="true">
                                0{i + 1}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-accent p-2"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
                    <div className="px-4 py-4 flex flex-col gap-1">
                        {NAV_ITEMS.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`font-mono text-xs tracking-widest px-3 py-2.5 text-left transition-colors ${activeSection === item.id
                                    ? "text-accent bg-accent/5"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                <span className="text-accent/40 mr-2" aria-hidden="true">
                                    0{i + 1}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
