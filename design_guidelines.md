# FocusFlow Productivity Dashboard - Design Guidelines

## Design Approach

**Selected Approach**: Design System (Material Design principles + Modern Productivity Patterns)

**References**: Linear (clean hierarchy), Notion (information density), Todoist (task management patterns)

**Core Principles**: 
- Clarity over decoration - every element serves a purpose
- Scannable information hierarchy
- Consistent patterns for repeated actions
- Performance-focused minimal animations

---

## Typography

**Font Family**: Inter or Plus Jakarta Sans from Google Fonts
- **Display/Headers**: Semibold (600) - Dashboard title, page headers
- **Body Text**: Regular (400) - Task descriptions, habit names
- **Labels/Meta**: Medium (500) - Timestamps, priority tags, stats
- **Small Text**: Regular (400) - Helper text, footnotes

**Scale**:
- Page Titles: text-2xl (24px)
- Section Headers: text-xl (20px)
- Card Titles: text-base (16px)
- Body Text: text-sm (14px)
- Labels/Meta: text-xs (12px)

---

## Layout System

**Spacing Units**: Use Tailwind units of **2, 3, 4, 6, 8** for consistency
- Component padding: p-4 or p-6
- Card spacing: gap-4 between cards
- Section margins: mb-6 or mb-8
- Icon-to-text spacing: gap-2

**Grid System**:
- Dashboard: 3-column grid on desktop (grid-cols-3), 1-column mobile
- Task cards: 2-column on tablet (md:grid-cols-2), full-width mobile
- Habit grid: 3-column desktop, 2-column tablet, 1-column mobile

**Container**: max-w-7xl with px-4 on mobile, px-6 on desktop

---

## Component Library

### Navigation
**Sidebar** (Desktop):
- Fixed left sidebar, w-64
- Logo/brand at top with p-6
- Navigation items with py-3 px-4, icon + label
- Active state: subtle background fill
- Collapsible on tablet (hamburger menu)

**Top Navbar**:
- Sticky header with h-16
- Left: Menu toggle (mobile/tablet)
- Right: Theme toggle + Profile avatar
- Shadow or subtle border bottom

### Cards
**Task Card**:
- Rounded corners (rounded-lg)
- Border with subtle shadow
- Padding: p-4
- Checkbox on left, task title, priority badge on right
- Due date/timestamp below title (text-xs)
- Hover: subtle elevation increase

**Habit Card**:
- Similar structure to task card
- Circular progress indicator (top right or centered)
- Daily checkboxes in grid below habit name
- Streak counter badge

**Stat Card** (Dashboard):
- Compact card with icon, number, label
- Grid of 3-4 cards showing key metrics
- Color-coded icons (tasks=teal, habits=orange, timer=purple)

### Pomodoro Timer
**Timer Display**:
- Large centered circular progress ring
- Time remaining in center (text-4xl)
- Session type label below (Work/Break)
- Control buttons below: Start/Pause (primary), Reset (secondary)
- Session counter: "Session 3 of 4"

### Progress Charts
**Habit Chart**:
- Bar chart showing 7-day or 30-day completion
- Use Recharts with minimal styling
- Height: h-64
- Accent color for completed days
- Grid lines for readability

### Buttons
**Primary**: Teal background, white text, px-4 py-2, rounded-md
**Secondary**: Border with teal color, teal text
**Danger**: Orange/red for delete actions
**Icon Buttons**: Squared (w-10 h-10), centered icon

### Forms/Inputs
**Text Input**:
- Border with focus state (ring-2 ring-teal)
- Padding: px-3 py-2
- Rounded: rounded-md
- Placeholder text in muted color

**Modal**:
- Centered overlay with backdrop blur
- Card-style content area (max-w-md)
- Header with title + close button
- Form body with p-6
- Footer with action buttons (right-aligned)

### Priority/Status Badges
- Small rounded pills (rounded-full px-2 py-1)
- Color-coded: High=orange, Medium=yellow, Low=teal
- Text size: text-xs

---

## Dashboard Layout Structure

**Overview Page**:
1. Welcome header with date and motivational text
2. Stats row: 3-4 metric cards (tasks completed, habits tracked, Pomodoro sessions)
3. Two-column section: Active tasks (left 2/3) + Pomodoro timer (right 1/3)
4. Habits section: Grid of habit cards with today's tracking
5. Weekly progress chart at bottom

**Tasks Page**:
- Top controls: Add task button (right), filter/sort dropdown (left)
- Task list with priority grouping or sorting
- Empty state with illustration placeholder

**Habits Page**:
- Add habit button (top right)
- Grid of habit cards
- Monthly progress calendar/chart below

---

## Dark/Light Mode Specifications

**Light Mode**:
- Background: white or off-white (gray-50)
- Card background: white
- Text: gray-900
- Borders: gray-200
- Sidebar: white with gray-100 hover states

**Dark Mode**:
- Background: gray-900 or gray-950
- Card background: gray-800
- Text: gray-100
- Borders: gray-700
- Sidebar: gray-900 with gray-800 hover states

**Accent Colors** (consistent across modes):
- Primary (Teal): #14B8A6 (teal-500)
- Secondary (Orange): #F97316 (orange-500)
- Success: #22C55E (green-500)
- Danger: #EF4444 (red-500)

---

## Animations

Use sparingly - only for:
- Card hover: subtle scale (scale-102) and shadow increase
- Button press: slight scale down (active:scale-95)
- Modal entrance: fade + scale animation (200ms)
- Timer progress: smooth circular fill animation
- Page transitions: simple fade (150ms)

No scroll animations, parallax, or decorative motion.

---

## Images

This is a data-focused dashboard - **no hero images needed**. Use only:
- Profile avatar placeholder (top right navbar)
- Empty state illustrations (simple SVG placeholders for "No tasks yet")
- Icon library: Heroicons (outline style for navigation, solid for actions)

All imagery should be functional, not decorative.