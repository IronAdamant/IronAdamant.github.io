/**
 * Project Data for Necron Portfolio
 * 
 * This file contains centralized project information used across the website.
 * Edit this file to modify existing projects or add new ones.
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
        id: "autoclacker",
        title: "AutoClacker",
        category: "application",
        featured: true,
        shortDescription: "A finely crafted automation tool for precise control of input devices, originally built to elevate gaming experiences on Windows 11 platforms.",
        fullDescription: "This expertly engineered automation tool enables seamless manipulation of mouse and keyboard inputs. Forged in the crucible of human innovation for Windows 11 gaming, it stands as a testament to Terran precision, its intricate design worthy of preservation among the finest relics of mortal craftsmanship.",
        imageSrc: "https://raw.githubusercontent.com/TrazynCache/AutoClacker/refs/heads/master/Images/AutoClacker_Not_Running.png",
        imageAlt: "AutoClacker Screenshot",
        techTags: ["C#", ".Net 8", "json"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/TrazynCache/AutoClacker",
                external: true
            }
        ]
    },
    {
        id: "expense-tracker",
        title: "Expense Tracker",
        category: "tracking",
        featured: true,
        shortDescription: "A meticulous monitoring tool that charts resource expenditures, revealing the patterns of human wealth with striking clarity.",
        fullDescription: "This sophisticated monitoring tool, a marvel of Terran ingenuity, records financial expenditures with unparalleled accuracy. By categorizing resources and weaving intricate visual tapestries of spending patterns, it captures the essence of human economic endeavors, a relic radiant with the brilliance of mortal foresight.",
        imageSrc: "https://github.com/TrazynCache/Expense-Tracker-Updated/blob/master/image/Expense%20tracker%20front.png?raw=true",
        imageAlt: "Expense Tracker Interface",
        techTags: ["Python", "HTML", "CSS", "Javascript"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/TrazynCache/Expense-Tracker-Updated",
                external: true
            }
        ]
    },
    {
        id: "time-tracker",
        title: "Simple Time Tracker",
        category: "tracking",
        featured: true,
        shortDescription: "A precise instrument for measuring time spent on tasks, preserving the fleeting moments of human effort with remarkable fidelity.",
        fullDescription: "This time-tracking instrument, wrought from the heights of human intellect, meticulously logs the allocation of temporal resources across tasks. Its elegant design reflects the Terran mastery of fleeting moments, rendering it a cherished artifact that encapsulates the mortal struggle to harness time itself.",
        imageSrc: "https://github.com/TrazynCache/Simple-Time-Tracker-for-Tasks/blob/master/images/Simple_Time_Tracker_front.png?raw=true",
        imageAlt: "Simple Time Tracker Interface",
        techTags: ["Python", "HTML", "CSS", "Javascript"],
        links: [
            {
                text: "GitHub",
                icon: "fab fa-github",
                url: "https://github.com/TrazynCache/Simple-Time-Tracker-for-Tasks",
                external: true
            }
        ]
    }
    // Add new projects here following the same structure
];

// Helper functions for project data
const projectHelpers = {
    // Get all projects
    getAllProjects: () => projectData,
    
    // Get featured projects for homepage
    getFeaturedProjects: () => projectData.filter(project => project.featured),
    
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
            'ai': 'Synthetic Intelligence'
        };
        
        return categoryNames[categoryCode] || categoryCode;
    }
};
