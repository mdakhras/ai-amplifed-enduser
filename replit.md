# AI Amplified IOM Project Cycle

## Overview
This is a React application for managing IOM (International Organization for Migration) project cycles. The application provides an AI-amplified interface for project conceptualization, proposal development, and endorsement workflows.

## Recent Changes
- **2025-09-24**: Initial project import and setup completed
  - Configured Vite for Replit environment compatibility (host: 0.0.0.0, port: 5000)
  - Installed missing Shadcn/ui components (button, input, textarea, label, card)
  - Created utils library for component styling
  - Configured deployment for autoscale with build and preview commands
  - Set up development workflow on port 5000

## Project Architecture
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS v4 with Shadcn/ui components
- **UI Library**: Radix UI primitives with custom styling
- **Build Tool**: Vite with React plugin and Tailwind integration
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM v7
- **Charts**: Recharts for data visualization

## Development Setup
- Development server runs on port 5000 with host 0.0.0.0 for Replit compatibility
- HMR configured for client port 443 to work with Replit's proxy
- Workflow configured as "Frontend Server" running `npm run dev`

## Deployment Configuration
- Target: Autoscale (stateless frontend)
- Build: `npm run build`
- Run: `npm run preview`

## Key Features
- Project conceptualization workflow
- Proposal development tools
- Donor intelligence and scoping
- Document upload and management
- AI-generated content support
- Endorsement workflow

## File Structure
```
src/
├── App.jsx           # Main application component with view management
├── main.jsx          # React entry point
├── index.css         # Empty (styles in App.css)
├── App.css           # Tailwind CSS v4 configuration with custom variables
├── components/ui/    # Shadcn/ui components
│   ├── button.jsx
│   ├── input.jsx
│   ├── textarea.jsx
│   ├── label.jsx
│   └── card.jsx
└── lib/
    └── utils.js      # Utility functions for styling (cn function)
```