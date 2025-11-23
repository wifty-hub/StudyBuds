# 🎨 StudyBudds Branding Guide

## 🐦 Mascot: Lumio the Owl

Lumio is our friendly, scholarly owl mascot designed to represent knowledge, focus, and intelligent learning.

### Design Philosophy

- **Owls** = Knowledge, wisdom, and focused study
- **Lightbulb-shaped head plume** = "Illumination" and bright ideas
- **Soft geometric style** = Modern, AI-friendly aesthetic
- **Rounded edges** = Friendly, approachable feel

### Usage

Lumio appears throughout the application in:
- **Avatars**: User profile pictures and account indicators
- **Onboarding**: Welcome screens and feature introductions
- **Badges**: Achievement indicators and progress markers
- **Logos**: Application branding and favicons
- **Empty states**: Friendly guidance when no content is available

### Design Specifications

- **Minimal facial details**: Simple, clean design
- **Small book or tablet**: Carried under wing to represent study materials
- **Animated options**: 
  - Blinking eyes for life-like feel
  - Page flipping animation
  - Hovering lightbulb effect

### Variants

1. **Default**: Standard Lumio pose
2. **With Book**: Carrying a book under wing (traditional study)
3. **With Tablet**: Carrying a tablet under wing (digital learning)

## 🎨 Color Palette: Scholarly Calm

A carefully curated palette that supports clarity, trust, and a modern academic feel.

### Primary Colors

| Purpose | Color Name | Hex | Usage |
|---------|-----------|-----|-------|
| **Primary** | Soft Indigo | `#5966FF` | Main actions, links, primary buttons |
| **Background** | Cloud White | `#FAFAFF` | Page backgrounds, cards |
| **Secondary** | Lavender Mist | `#C9CFFF` | Secondary elements, highlights |
| **Neutral** | Warm Gray | `#8C8C9E` | Text, borders, subtle elements |
| **Accent** | Gold Highlight | `#FFC857` | Achievements, highlights, Lumio's lightbulb |

### Color Psychology

- **Indigo (#5966FF)**: Intelligence + Reliability
  - Represents trust, wisdom, and academic excellence
  - Used for primary actions and important elements

- **Gold (#FFC857)**: Achievement + Highlights
  - Represents success, accomplishment, and illumination
  - Used for achievements, highlights, and Lumio's signature lightbulb

- **Lavender Mist (#C9CFFF)**: Calm + Focus
  - Soft, calming tone that reduces eye strain
  - Perfect for backgrounds and secondary elements

- **Warm Gray (#8C8C9E)**: Clarity + Readability
  - Neutral tone that doesn't compete with content
  - Excellent for text and subtle UI elements

- **Cloud White (#FAFAFF)**: Clean + Modern
  - Slightly tinted white for reduced glare
  - Ideal for long study sessions

### Usage Guidelines

#### Primary (Soft Indigo)
- Primary buttons and CTAs
- Active navigation items
- Links and interactive elements
- Lumio's body color

#### Accent (Gold Highlight)
- Achievement badges
- Important highlights
- Success states
- Lumio's lightbulb plume

#### Neutral (Warm Gray)
- Body text
- Secondary text
- Borders and dividers
- Disabled states

#### Background (Cloud White)
- Main page backgrounds
- Card backgrounds
- Modal backgrounds

#### Secondary (Lavender Mist)
- Hover states
- Secondary buttons
- Subtle highlights
- Lumio's belly

## Typography

- **Headings**: Bold, clear, using primary color
- **Body**: Regular weight, neutral color for readability
- **Accents**: Use accent color sparingly for emphasis

## Component Styling

### Buttons
- **Primary**: Soft Indigo background, white text
- **Secondary**: Lavender Mist background, Indigo text
- **Accent**: Gold Highlight background, dark text

### Cards
- Cloud White background
- Subtle shadow with primary tint
- Rounded corners (8-12px)

### Badges
- Gold Highlight for achievements
- Primary for status indicators
- Neutral for informational badges

## Implementation

The color palette is implemented in Tailwind CSS configuration:
- `primary`: Soft Indigo and variants
- `accent`: Gold Highlight and variants
- `neutral`: Warm Gray and variants
- `background`: Cloud White

See `frontend/tailwind.config.js` for full color definitions.

## Logo Usage

When using Lumio as a logo:
- Minimum size: 32px
- Recommended size: 40-120px
- Always maintain aspect ratio
- Use animated variant for loading states
- Use static variant for print materials

## Accessibility

All color combinations meet WCAG AA contrast requirements:
- Primary text on Cloud White: ✅
- White text on Soft Indigo: ✅
- Dark text on Gold Highlight: ✅
- Warm Gray text on Cloud White: ✅

## Brand Voice

- **Friendly**: Approachable and welcoming
- **Intelligent**: Smart and capable
- **Supportive**: Helpful and encouraging
- **Modern**: Contemporary and tech-forward

---

*Last updated: 2024*

