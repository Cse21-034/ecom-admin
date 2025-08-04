# Replit.md

## Overview

This is a full-stack e-commerce platform built with React, Express, and PostgreSQL. The application supports multiple user roles (admin, supplier, customer) with role-based dashboards and functionality. It features a modern UI built with shadcn/ui components, real-time product management, order processing, and comprehensive admin tools for managing the entire marketplace.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with CSS variables for theming

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with role-based access control
- **Session-based authentication** using Replit's OpenID Connect integration
- **PostgreSQL sessions** stored in database for persistent authentication
- **Role-based middleware** for protecting routes (admin, supplier, customer)
- **Drizzle ORM** for type-safe database operations and migrations

### Database Design
- **PostgreSQL** as the primary database
- **Neon Database** serverless PostgreSQL hosting
- **Drizzle ORM** schema definitions with relations
- **Session storage** table for authentication persistence
- **Multi-role user system** with role-based permissions
- **E-commerce entities**: users, categories, products, orders, cart items, contact messages

### Authentication & Authorization
- **Replit Auth** integration using OpenID Connect
- **Passport.js** strategy for authentication flow
- **Session-based auth** with PostgreSQL session store
- **Role-based access control** (admin, supplier, customer)
- **Protected routes** with middleware validation

### State Management
- **TanStack Query** for server state with optimistic updates
- **React Hook Form** for form state management with Zod validation
- **Custom hooks** for authentication state and user management
- **Toast notifications** for user feedback

### UI/UX Architecture
- **Mobile-first responsive design** with Tailwind breakpoints
- **Dark/light theme support** via CSS variables
- **Accessible components** using Radix UI primitives
- **Loading states** and error boundaries throughout the application
- **Role-specific dashboards** with different UI layouts per user type

## External Dependencies

### Database & Hosting
- **Neon Database** - Serverless PostgreSQL hosting
- **Replit** - Development and hosting platform with integrated authentication

### Authentication
- **Replit Auth** - OpenID Connect authentication provider
- **Passport.js** - Authentication middleware for Express

### UI & Components
- **Radix UI** - Headless UI component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component library

### Development Tools
- **Drizzle Kit** - Database migration and schema management
- **ESBuild** - Fast JavaScript bundler for production builds
- **TypeScript** - Type safety across the entire stack

### Key Integrations
- **Session persistence** via PostgreSQL using connect-pg-simple
- **File uploads** and image handling for product management
- **Real-time updates** through TanStack Query's background refetching
- **Form validation** using Zod schemas shared between client and server