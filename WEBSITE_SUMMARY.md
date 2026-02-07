# Website Summary: Nāresh Innovations
**Current State Analysis for UI/UX Redesign**

## 1. Brand Identity
*   **Name:** Nāresh Innovations
*   **Core Value Value:** Premium interior solutions, crafting dream interiors.
*   **Visual Style:** Luxury, Modern, Minimalist.
*   **Primary Colors:**
    *   **Accent Green:** `#3D550C` (Dark Olive Green) - Used for "Innovations" in header.
    *   **Light/Lime Green:** Previously used extensively, now shifting towards darker tones.
    *   **Backgrounds:** Black/Dark Grey (Dark Mode), White/Off-White (Light Mode).
*   **Typography:**
    *   Headings: `Playfair Display` (Serif - Luxury feel).
    *   Body: `Inter` (Sans-serif - Clean & Modern).
*   **Logo:** `logo.png` inside a circular container. Fallback to "NI" text.

## 2. Structure & Navigation
*   **Header:**
    *   Logo (Left aligned).
    *   Company Name: "Nāresh" (Thin White) + "Innovations" (Bold #3D550C).
    *   Navigation Links: Home, About, Products, Services, Portfolio, Contact.
    *   Action: "Get Free Consultation" Button (White text, black bg on hover).
    *   Feature: Dark/Light Mode Toggle.

## 3. Page Content Breakdown

### Hero Section (`HeroSection.tsx`)
*   **Goal:** Immediate visual impact and call to action.
*   **Content:**
    *   Headline: "Nāresh Innovations"
    *   Sub-headline: "Crafting Your Dream Interiors"
    *   Description: "Premium glass, plywood, locks, handles, and complete interior solutions in Mysuru. From 2D/3D design plans to turnkey execution."
    *   CTAs: "Explore Our Work", "Get Free Consultation".
*   **Visuals:** Background image with overlay (`hero-bg-green.jpg` or `hero-bg.jpg`).

### About Section (`AboutSection.tsx`)
*   **Goal:** Establish trust and history.
*   **Stats:**
    *   500+ Happy Clients
    *   15+ Years Experience
    *   1000+ Projects Completed
    *   4.9 Customer Rating
*   **Journey/Timeline:**
    *   2008: Founded
    *   2012: Expansion (3D design)
    *   2018: Innovation (Turnkey solutions)
    *   2024: Leadership position in Mysuru.

### Products Section (`ProductsSection.tsx`)
*   **Goal:** Showcase material inventory.
*   **Categories:**
    1.  **Premium Glass Solutions:** Tempered, frosted, decorative, custom.
    2.  **Quality Plywood & Boards:** High-grade plywood, MDF, HDF.
    3.  **Designer Locks & Handles:** Luxury hardware, security locks.
    4.  **Interior Accessories:** Hinges, brackets, sliding systems, lighting.

### Services Section (`ServicesSection.tsx`)
*   **Goal:** Explain the service delivery model.
*   **Offerings:**
    1.  2D/3D Design Planning.
    2.  Space Planning & Consultation.
    3.  Turnkey Execution (Concept to Handover).
    4.  Quality Assurance.
*   **Process Steps:** Consultation -> Design -> Approval -> Execution -> Handover.
*   **Visual:** Uses `hero-bg.jpg` as a background with overlay.

### Contact Section (`ContactSection.tsx`)
*   **Goal:** Lead generation and location info.
*   **Info:**
    *   **Address:** Kuvempu Nagar 1st Stage, Mysore.
    *   **Phone:** +91 9880079820
    *   **Email:** nareshinnovations@yahoo.com
    *   **Hours:** Mon-Sat 9AM-7PM.
*   **Form Features:** Name, Phone, Email, Subject, Message.

### Footer (`Footer.tsx`)
*   **Content:**
    *   Summary of company.
    *   Quick Links & Services lists.
    *   Social Media placeholders (Facebook, Instagram, LinkedIn).
    *   Newsletter Subscription input.
    *   Copyright & Legal links.

## 4. Technical Specifications
*   **Framework:** React + Vite.
*   **Styling:** Tailwind CSS.
*   **Icons:** Lucide React.
*   **Theme:** `next-themes` (Dark/Light mode support).
*   **Responsive:** Mobile-first approach, fully responsive layouts.

## 5. Design Considerations for Redesign
*   **Luxury Focus:** The brand leans heavily into "Luxury" keywords (gold, black, premium materials).
*   **Color Palette:** The specific green `#3D550C` must be integrated intelligently without overpowering the luxury aesthetic.
*   **Readability:** Ensure high contrast for text, especially with the new darker green accent on dark backgrounds.
*   **Imagery:** Heavy reliance on high-quality interior photography to sell the "Dream Interior" concept.
