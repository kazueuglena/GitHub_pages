import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Header = ({ lang, setLang, content }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navItems = Object.keys(content.nav).map(key => ({
        id: key,
        label: content.nav[key]
    }));

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/50 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <a href="/" className="text-xl font-bold font-['Syne'] tracking-wider z-50 relative group">
                        <span className="text-white group-hover:text-emerald-400 transition-colors">KOMATSU</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 z-50">
                        <button
                            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors bg-black/20 backdrop-blur-sm"
                        >
                            <Globe size={14} className="text-gray-400" />
                            <span className="text-xs font-mono text-gray-300">{lang.toUpperCase()}</span>
                        </button>

                        <button
                            className="md:hidden p-2 text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? 'auto' : 'none' }}
                className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl md:hidden flex items-center justify-center"
            >
                <nav className="flex flex-col items-center gap-8">
                    {navItems.map((item, i) => (
                        <motion.button
                            key={item.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isMenuOpen ? 0 : 20, opacity: isMenuOpen ? 1 : 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => scrollToSection(item.id)}
                            className="text-2xl font-['Syne'] font-bold text-white hover:text-emerald-400 transition-colors"
                        >
                            {item.label}
                        </motion.button>
                    ))}
                </nav>
            </motion.div>
        </>
    );
};

export default Header;
