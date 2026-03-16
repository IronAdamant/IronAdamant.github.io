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
 *   featured: true|false,            // Whether to show on homepage
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
        id: "stele",
        title: "Stele",
        category: "ai",
        featured: true,
        shortDescription: "A local context cache for LLM agents with semantic chunking, HNSW vector search, multi-agent safety, and a real MCP server — zero required dependencies.",
        fullDescription: "Stele helps LLM agents avoid re-reading unchanged files by caching chunk data with semantic search. Documents are routed through modality-specific chunkers (code, text, images, PDFs, audio, video), stored in SQLite, and an HNSW vector index enables fast O(log n) retrieval. Features include symbol graph with cross-file impact analysis, multi-agent safety with per-document locking and conflict audit logs, change detection via SHA-256 hashing, session rollback, and both MCP (stdio) and HTTP REST server modes. Built for solo developers running multiple LLM agents on the same local machine. Runs 100% offline with zero required dependencies — pure Python stdlib.",
        imageSrc: "https://raw.githubusercontent.com/IronAdamant/IronAdamant.github.io/main/images/stele-mcp-demo.png",
        imageAlt: "Stele MCP server running stats and indexing in Claude Code",
        techTags: ["Python", "MCP", "SQLite", "Vector Search", "AI Tooling", "Multi-Agent"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/IronAdamant/Stele",
                external: true
            }
        ]
    },
    {
        id: "windows-sound-tracker",
        title: "Windows Sound Tracker",
        category: "tracking",
        featured: true,
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
        featured: true,
        shortDescription: "MDWord is a live web application that converts between Markdown and Word documents. Deployed and running on Netlify with continuous integration.",
        fullDescription: "MDWord is a production web application that provides seamless conversion between Markdown files and Word documents. Unlike local GitHub repositories, this is a fully deployed application running on Netlify's cloud platform, offering real-time document conversion capabilities accessible from anywhere.",
        imageSrc: "https://github.com/IronAdamant/Markdown-Word-Converter/blob/444c58f3e5513f2a3002371d3b31166ad54b9f94/images/screencapture-mdword-ironadamant-2025-07-03-12_11_28.png?raw=true",
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
        featured: false,
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
        featured: false,
        shortDescription: "A time tracking application that logs and analyzes task durations.",
        fullDescription: "The Simple Time Tracker is an efficient tool for monitoring time spent on various tasks. It provides detailed logging and analysis of time allocation, helping users optimize their productivity.",
        imageSrc: "https://github.com/IronAdamant/Simple-Time-Tracker-for-Tasks/blob/master/images/Simple_Time_Tracker_front.png?raw=true",
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
        featured: false,
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

    // Get projects by category
    getProjectsByCategory: (category) => {
        if (category === 'all') return projectData;
        return projectData.filter(project => project.category === category);
    },

    // Get project by ID
    getProjectById: (id) => projectData.find(project => project.id === id),

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
            'web': 'Web Artifacts',
            'game': 'Interactive Constructs',
            'ai': 'AI Tools',
            'browser': 'Browser Extensions'
        };

        return categoryNames[categoryCode] || categoryCode;
    }
};
