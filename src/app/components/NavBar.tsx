"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "publications", label: "Publications" },
    { id: "news", label: "News" },
    { id: "education", label: "Education" },
    { id: "teaching", label: "Teaching" },
    { id: "hobbies", label: "Passions" },
    { id: "contact", label: "Contact" },
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-bg-dark/90 backdrop-blur-md border-b border-border-dark"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
                {/* Name */}
                <a
                    href="#"
                    className="font-display font-bold text-lg tracking-wide text-text-primary hover:text-accent transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    A. Louette
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={`text-sm tracking-wide px-4 py-2 transition-colors duration-200 cursor-pointer ${activeSection === item.id
                                ? "text-accent"
                                : "text-text-secondary hover:text-text-primary"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <a
                        href="mailto:arthur.louette@uliege.be"
                        className="ml-4 px-5 py-2 bg-accent text-bg-dark text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors duration-200"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-text-primary p-2 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-bg-dark/95 backdrop-blur-md border-b border-border-dark">
                    <div className="px-6 py-6 flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`text-sm tracking-wide px-4 py-3 text-left transition-colors duration-200 cursor-pointer ${activeSection === item.id
                                    ? "text-accent"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <a
                            href="mailto:arthur.louette@uliege.be"
                            className="mt-4 px-5 py-3 bg-accent text-bg-dark text-sm font-medium tracking-wide text-center hover:bg-accent-hover transition-colors duration-200"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
