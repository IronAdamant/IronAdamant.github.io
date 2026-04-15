/**
 * Project Data for IronAdamant Portfolio
 * 
 * This file contains centralized project information used across the website.
 * Edit this file to modify existing projects or add new ones.
 * 
 * NOTE: Only the first 3 projects (top to bottom) will display as "Recent Acquisitions" 
 * on the homepage. Additional projects will only appear on the projects page.
 * 
 * Structure for each project:
 * {
 *   id: "unique-id",                 // Unique identifier for the project
 *   title: "Project Title",          // Display title
 *   category: "category-name",       // For filtering (application, tracking, etc.)
 *   shortDescription: "Brief text",  // Short description for featured section
 *   fullDescription: "Longer text",  // Full description for project page
 *   imageSrc: "url/to/image.png",    // Main image URL
 *   imageAlt: "Description",         // Image alt text for accessibility
 *   techTags: ["Tag1", "Tag2"],      // Technologies used
 *   links: [                         // Array of related links
 *     {
 *       text: "Link Text",
 *       icon: "font-awesome-class",
 *       url: "https://example.com",
 *       external: true|false
 *     }
 *   ]
 * }
 */

const projectData = [
    {
        id: "coordinationhub",
        title: "Coordination<br>Hub",
        category: "ai",
        shortDescription: "A shared notice-board that stops multiple AI coding assistants from overwriting each other's work — file locks, agent tree, task registry, and a live SVG dashboard. 50 MCP tools, zero dependencies.",
        fullDescription: "CoordinationHub is a local coordination layer for multi-agent AI coding workflows. When several assistants work on the same repo, it tracks who's alive, who holds which file, which tasks are blocked, and where edits are crossing into another agent's territory. Features TTL'd file and region locking (two agents can edit non-overlapping ranges of the same file), scope enforcement with path-prefix boundaries, cascade cleanup when agents die, globally unique hierarchical agent IDs (hub.PID.seq.seq), inter-agent messaging, cross-agent dependencies with auto-satisfy on completion, contention hotspot ranking, and a pure-SVG live dashboard fed by SSE at http://127.0.0.1:9898. Ships with Claude Code hooks out of the box (SessionStart, PreToolUse/PostToolUse for Write/Edit, SubagentStart/Stop, SessionEnd) — every agent self-registers, every edit acquires a lock, nothing is orphaned. 50 MCP tools, 75 CLI commands, 404 tests, SQLite-backed with WAL mode. Zero runtime dependencies — pure Python stdlib. Requires Python 3.10+.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/coordinationhub/main/screenshots/dashboard.png",
        imageAlt: "CoordinationHub dashboard showing agent tree, task registry, work intent board, handoffs, dependencies, and active file locks",
        techTags: ["Python", "MCP", "SQLite", "AI Tooling", "Multi-Agent"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/coordinationhub",
                external: true
            },
            {
                text: "PyPI",
                icon: "fas fa-box",
                url: "https://pypi.org/project/coordinationhub/",
                external: true
            }
        ]
    },
    {
        id: "chisel",
        title: "Chisel",
        category: "ai",
        shortDescription: "A test impact analysis and code intelligence tool for LLM agents — maps tests to code, scores risk, and suggests what to run after every change. 15 MCP tools, 12 languages, zero dependencies.",
        fullDescription: "Chisel is a test impact analysis engine that gives LLM agents precise intelligence about the blast radius of code changes. Instead of running all tests or guessing with -k flags, agents get targeted test suggestions, risk scores, churn analysis, code ownership, and co-change coupling data. Features 15 MCP tools, supports 12 languages (Python, JS/TS, Go, Rust, C#, Java, Kotlin, C/C++, Swift, PHP, Ruby, Dart), auto-detects 13 test frameworks (pytest, Jest, Go test, Rust #[test], Playwright, xUnit/NUnit/MSTest, JUnit, XCTest, PHPUnit, RSpec, Minitest, gtest, Dart test), and runs via CLI, HTTP, or stdio MCP server. Zero runtime dependencies — pure Python stdlib with SQLite persistence. Requires Python 3.11+.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/chisel-demo.png",
        imageAlt: "Chisel analyzing a project showing risk map, test gaps, ownership, and coupling analysis",
        techTags: ["Python", "MCP", "SQLite", "AI Tooling", "Test Intelligence"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Chisel",
                external: true
            },
            {
                text: "PyPI",
                icon: "fas fa-box",
                url: "https://pypi.org/project/chisel-test-impact/",
                external: true
            }
        ]
    },
    {
        id: "stele-context",
        title: "stele-context",
        category: "ai",
        shortDescription: "A local context cache for LLM agents with semantic chunking, hybrid HNSW + BM25 search, multi-agent safety, and 42 MCP tools — 739 tests, zero required dependencies.",
        fullDescription: "stele-context helps LLM agents avoid re-reading unchanged files by caching chunk data with semantic search. Documents are routed through modality-specific chunkers (code with tree-sitter AST support, text, images, PDFs, audio, video), stored in SQLite, and a hybrid HNSW vector + BM25 keyword index enables fast O(log n) retrieval. Features include symbol graph with cross-file impact analysis, multi-agent safety with per-document read-write locking and conflict audit logs, change detection via SHA-256 hashing, session rollback, annotations, configurable via .stele-context.toml, and both MCP (stdio) and HTTP REST server modes with 42 MCP tools. 739 tests. Built for solo developers running multiple LLM agents on the same local machine. Runs 100% offline with zero required dependencies — pure Python stdlib. Requires Python 3.9+.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/stele-context-search-demo.png",
        imageAlt: "stele-context semantic search results with similarity scores across indexed Python source files",
        techTags: ["Python", "MCP", "SQLite", "Vector Search", "AI Tooling", "Multi-Agent"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/stele-context",
                external: true
            },
            {
                text: "PyPI",
                icon: "fas fa-box",
                url: "https://pypi.org/project/stele-context/",
                external: true
            }
        ]
    },
    {
        id: "trammel",
        title: "Trammel",
        category: "ai",
        shortDescription: "A pure-Python planning and execution harness for LLM-assisted coding — decomposes goals into dependency-aware strategies, explores parallel beams, learns from failures, and caches recipes. 27 MCP tools, zero dependencies.",
        fullDescription: "Trammel is a planning and execution harness designed for LLM coding agents. It decomposes multi-file coding goals into dependency-aware step sequences, explores 9 parallel strategy variants via beam search (bottom-up, top-down, risk-first, critical-path, cohesion, minimal-change, and more), runs incremental verification in isolated temp copies, and learns from failures via persistent constraints that prevent known-bad patterns from being re-attempted. Successful strategies are cached as reusable recipes in a local SQLite database with trigram-based retrieval. Features dependency analysis for 10+ languages (Python AST, TypeScript, Go, Rust, C/C++, Java/Kotlin, C#, Ruby, PHP, Swift, Dart, Zig), automatic test discovery and execution, and 27 MCP tools for integration with Claude Code, Cursor, and other AI assistants. 242 tests, zero runtime dependencies — pure Python stdlib. Requires Python 3.10+.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/trammel-demo.png",
        imageAlt: "Trammel planning and execution harness showing dependency-aware strategy decomposition",
        techTags: ["Python", "MCP", "SQLite", "AI Tooling", "Beam Search"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Trammel",
                external: true
            },
            {
                text: "PyPI",
                icon: "fas fa-box",
                url: "https://pypi.org/project/trammel/",
                external: true
            }
        ]
    },
    {
        id: "pythonbol",
        title: "PythonBol Translator",
        category: "ai",
        shortDescription: "An offline, zero-dependency COBOL-to-Python code generator for legacy system modernization — translates enterprise COBOL into valid Python skeletons with 41 intrinsic functions and full middleware support.",
        fullDescription: "PythonBol Translator (cobol-safe-translator) converts enterprise COBOL programs into syntactically valid Python skeleton code. Tested on 5,288 COBOL files across 32 real-world projects with 100% syntax validity and 100% full validation. Features include 41 FUNCTION intrinsics, EXEC SQL to DB-API 2.0 translation, EXEC CICS hints, REPORT WRITER and SCREEN SECTION support, copybook resolution with recursive expansion and REPLACING, nested programs, PII/sensitivity detection, LLM translation briefs, and batch processing. Runtime adapters preserve COBOL semantics (CobolDecimal fixed-point, CobolString, FileAdapter). Includes an MCP server for integration with Claude Code, Cursor, and other AI coding assistants. 1,031 tests, zero runtime dependencies — pure Python stdlib.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/PythonBol-Translator/main/docs/images/validation-report.png",
        imageAlt: "PythonBol validation report showing 5,288 COBOL files translated to valid Python across 32 projects",
        techTags: ["Python", "COBOL", "MCP", "Code Generation", "Legacy Modernization"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/PythonBol-Translator",
                external: true
            },
            {
                text: "PyPI",
                icon: "fas fa-box",
                url: "https://pypi.org/project/cobol-safe-translator/",
                external: true
            }
        ]
    },
    {
        id: "windows-sound-tracker",
        title: "Windows Sound Tracker",
        category: "tracking",
        shortDescription: "A powerful Windows application that tracks and logs ALL system sounds in real-time, helping identify which programs are making sounds on your computer.",
        fullDescription: "Windows Sound Tracker is a sophisticated monitoring tool that captures every sound event from every application on Windows 11. It provides real-time tracking with detailed information including process names, volume levels, and timestamps. The application features smart event batching, automatic CSV logging, and a clean GUI interface with system tray support for background monitoring.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/windows_sound_tracker/refs/heads/master/images/windows_sound_tracker_ui.png",
        imageAlt: "Windows Sound Tracker Interface",
        techTags: ["C++", "Win32 API", "WASAPI", "CMake"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/windows_sound_tracker",
                external: true
            }
        ]
    },
    {
        id: "mdword",
        title: "MDWord",
        category: "application",
        shortDescription: "MDWord is a live web application that converts between Markdown and Word documents. Deployed and running on Netlify with continuous integration.",
        fullDescription: "MDWord is a production web application that provides seamless conversion between Markdown files and Word documents. Unlike local GitHub repositories, this is a fully deployed application running on Netlify's cloud platform, offering real-time document conversion capabilities accessible from anywhere.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/Markdown-Word-Converter/main/images/screencapture-mdword-ironadamant-2025-07-03-12_11_28.png",
        imageAlt: "MDWord Screenshot",
        techTags: ["React", "Tailwind CSS", ".MD", "Word", "Netlify"],
        links: [
            {
                text: "Live App",
                icon: "fas fa-external-link-alt",
                url: "https://mdword.ironadamant.com/",
                external: true
            }
        ]
    },
    {
        id: "expense-tracker",
        title: "Expense Tracker",
        category: "tracking",
        shortDescription: "A live web application for tracking and visualizing spending patterns with category breakdowns and time-based charts.",
        fullDescription: "The Expense Tracker is a comprehensive financial tool deployed on Netlify. It records and categorizes expenditures with search, filtering by category and time period, import/export functionality, and detailed visualizations including spending by category and spending over time charts. All data is stored locally in the browser for privacy.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/expense-tracker-screenshot.png",
        imageAlt: "Expense Tracker Interface showing dashboard with spending categories and time charts",
        techTags: ["HTML", "CSS", "Javascript", "Netlify"],
        links: [
            {
                text: "Live App",
                icon: "fas fa-external-link-alt",
                url: "https://randomexpenstracker.netlify.app/",
                external: true
            },
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Expense-Tracker-Updated",
                external: true
            }
        ]
    },
    {
        id: "time-tracker",
        title: "Simple Time Tracker",
        category: "tracking",
        shortDescription: "A time tracking application that logs and analyzes task durations.",
        fullDescription: "The Simple Time Tracker is an efficient tool for monitoring time spent on various tasks. It provides detailed logging and analysis of time allocation, helping users optimize their productivity.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/Simple-Time-Tracker-for-Tasks/master/images/Simple_Time_Tracker_front.png",
        imageAlt: "Simple Time Tracker Interface",
        techTags: ["Python", "HTML", "CSS", "Javascript"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Simple-Time-Tracker-for-Tasks",
                external: true
            }
        ]
    },
    {
        id: "console-logger",
        title: "Console Logger",
        category: "browser",
        shortDescription: "A Chromium browser extension that captures all JavaScript console messages from any tab, displays them live, and auto-saves to a text file.",
        fullDescription: "Console Logger is a developer-focused browser extension that uses the chrome.debugger API to capture all console messages — including native browser errors that content scripts miss. Features include deep object logging with nested objects and stack traces, live monitoring in a popup window, auto-save to your Downloads folder on a configurable interval, custom save locations, smart file overwrite to prevent clutter, and persistent storage that survives browser restarts. Works on all Chromium browsers including Chrome, Edge, Brave, Opera, Vivaldi, and Arc.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/console-logger-screenshot.png",
        imageAlt: "Console Logger extension capturing live console output alongside a webpage",
        techTags: ["JavaScript", "Chrome Extension", "Debugger API", "Manifest V3"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Console-logger",
                external: true
            }
        ]
    },
    {
        id: "autoclacker",
        title: "AutoClacker",
        category: "application",
        shortDescription: "A cross-platform click and keypress automation tool built with Avalonia UI and .NET, with native platform support for Windows, Linux, and macOS.",
        fullDescription: "AutoClacker is a cross-platform automation tool for repetitive mouse clicks and keyboard presses. It features dual-mode operation (mouse clicks and keyboard key presses), configurable intervals from 10–2000ms, global hotkey support (works even when the app isn't focused), and persistent JSON settings. Built with Avalonia UI for a modern Fluent design, it uses native P/Invoke on Windows, X11/XTest on Linux, and Cocoa APIs on macOS — no wrappers or shims. Self-contained builds require no runtime installation.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/autoclacker-screenshot.png",
        imageAlt: "AutoClacker interface showing mouse and keyboard automation controls with interval slider",
        techTags: ["C#", ".NET", "Avalonia UI", "Cross-Platform", "Native APIs"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/AutoClacker",
                external: true
            }
        ]
    }
    // Add new projects here following the same structure
];

// About section data - modify this to update the about text on the homepage
const aboutData = {
    title: "About the Developer",
    description: "I am a developer focused on creating practical technological solutions. My work combines human creativity with artificial intelligence to build tools that solve real problems and improve workflows. Each project represents a commitment to functional design and user-centered development, crafted through collaborative AI-assisted programming. This collection showcases working applications that demonstrate the potential of thoughtful software development."
};

// Helper functions for project data
const projectHelpers = {
    // Get all projects
    getAllProjects: () => projectData,

    // Get featured projects for homepage (first 3 projects from the top of the array)
    // To add new projects to homepage: add them at the top of projectData array with featured: true
    getFeaturedProjects: () => projectData.slice(0, 3),

    // Get all available categories
    getAllCategories: () => {
        const categories = new Set(projectData.map(project => project.category));
        return ['all', ...Array.from(categories)];
    },

    // Get user-friendly category name
    getCategoryName: (categoryCode) => {
        const categoryNames = {
            'all': 'Complete Collection',
            'application': 'Tool',
            'tracking': 'Tracking Systems',
            'ai': 'AI Tools',
            'browser': 'Browser Extensions'
        };

        return categoryNames[categoryCode] || categoryCode;
    }
};
