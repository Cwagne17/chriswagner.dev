# Custom Design System Documentation

## Overview

This design system replaces 25+ scattered button definitions with a cohesive, opinionated UI foundation. Built with **class-variance-authority**, **Tailwind CSS**, and **motion** (Framer Motion).

---

## Design Tokens

### CSS Variables (in `globals.css`)

#### Light Theme
- **Backgrounds**: `--bg`, `--bg-elev-1`, `--bg-elev-2` (off-white layered surfaces)
- **Borders**: `--border`, `--border-strong`
- **Text**: `--fg`, `--muted`, `--muted-2`
- **Accent**: `--accent`, `--accent-2`, `--accent-hover` (blue with purple tint)
- **Effects**: `--shadow`, `--shadow-lg`, `--glow`

#### Dark Theme
- More pronounced surfaces with gradient vibe
- Enhanced glow effects for interactive elements
- Maintained accent colors with increased brightness

#### Radius Scale
- `--r-sm`: 0.375rem (6px)
- `--r-md`: 0.5rem (8px)
- `--r-lg`: 0.75rem (12px)
- `--r-xl`: 1rem (16px)

---

## Core Components

### 1. Button (`components/ui/Button.tsx`)

**Replaces**: 25+ button definitions across the app

**Variants**:
- `primary` - Accent gradient with glow border (default)
- `secondary` - Subtle elevated surface
- `ghost` - Transparent with hover
- `outline` - Bordered
- `link` - Text button
- `danger` - For destructive actions

**Sizes**: `sm`, `md`, `lg`, `icon`

**Features**:
- Border glow + lift on hover
- Optional `leftIcon` and `rightIcon` props
- `isLoading` state with spinner
- Consistent focus states across themes
- Active press animation (scale-[0.98])

**Usage**:
```tsx
import { Button } from "@/components/ui";

<Button leftIcon={Plus} variant="primary">
  New Project
</Button>

<Button variant="ghost" size="sm">
  Cancel
</Button>
```

---

### 2. IconButton (`components/ui/IconButton.tsx`)

**Purpose**: Wrapper around Button for icon-only buttons

**Usage**:
```tsx
import { IconButton } from "@/components/ui";

<IconButton
  icon={Edit}
  variant="ghost"
  aria-label="Edit Post"
/>
```

---

### 3. Card (`components/ui/Card.tsx`)

**Purpose**: Custom surface component with layered backgrounds

**Variants**:
- `default` - Elevated surface with border
- `interactive` - Hover lift + border glow
- `subtle` - Minimal styling
- `elevated` - Highest level surface

**Subcomponents**:
- `CardHeader`, `CardTitle`, `CardDescription`
- `CardContent`, `CardFooter`

**Features**:
- Uses `--bg-elev-1` and `--bg-elev-2` for depth
- Interactive cards have hover lift + glow
- Consistent rounded corners

**Usage**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card variant="interactive">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

### 4. Badge (`components/ui/Badge.tsx`)

**Purpose**: Tag/label component for statuses and tech stacks

**Variants**:
- `default` - Standard badge
- `accent` - Accent colored
- `muted` - Subtle
- `outline` - Bordered

**Sizes**: `sm`, `md`

**Options**: `mono` prop for monospace font

**Usage**:
```tsx
import { Badge } from "@/components/ui";

<Badge variant="accent" size="sm">
  AWS
</Badge>

<Badge mono>v1.2.0</Badge>
```

---

### 5. SectionHeader (Signature Component)

**Purpose**: Consistent section headings across pages

**Props**:
- `eyebrow`: Small label (e.g., "Portfolio")
- `title`: Main heading
- `subtitle`: Description text
- `align`: "left" | "center"
- `index`: Optional "01", "02" style index

**Features**:
- Decorative gradient divider line
- Mono index numbers
- Responsive typography

**Usage**:
```tsx
import { SectionHeader } from "@/components/ui";

<SectionHeader
  eyebrow="Portfolio"
  title="All Projects"
  subtitle="Explore my complete portfolio"
  align="center"
  index="01"
/>
```

---

### 6. MetricBanner (Signature Component)

**Purpose**: Status/metric strips for project highlights

**Props**:
- `items`: Array of `{ label: string, icon?: LucideIcon }`
- `shimmer`: Enable hover shimmer effect

**Features**:
- Gradient accent line on top
- Bullet separators
- Optional shimmer animation

**Usage**:
```tsx
import { MetricBanner } from "@/components/ui";
import { Clock, Zap } from "lucide-react";

<MetricBanner
  shimmer
  items={[
    { label: "<1 hour provisioning", icon: Clock },
    { label: "100% self-service", icon: Zap },
    { label: "80% cost reduction" },
  ]}
/>
```

---

### 7. ProjectCard (Composed Component)

**Purpose**: Project listing cards

**Props**:
- `title`, `description`, `technologies[]`
- `impact`: Key metric/impact line
- `href`: Link destination
- `thumbnail`: Optional diagram preview
- `index`: For staggered animations

**Features**:
- Accent corner decoration
- Tech badges (shows first 4, then +N)
- Impact metric highlight box
- Hover animations
- Built on Card + Badge + Button

**Usage**:
```tsx
import { ProjectCard } from "@/components/ui";

<ProjectCard
  title="AWS Cloud Infrastructure"
  description="Enterprise cloud solution"
  technologies={["AWS", "Terraform", "Docker"]}
  impact="50% reduction in deployment time"
  href="/projects/aws-cloud"
  index={0}
/>
```

---

## Interaction Patterns

### Hover States
- **Cards**: `-translate-y-1` + enhanced shadow + accent border
- **Buttons**: Border glow + `-translate-y-0.5`
- **Links**: Accent color + underline

### Focus States
- `ring-2` with `ring-[var(--accent)]`
- Visible in both light/dark themes
- `ring-offset-2` for clear separation

### Active States
- `active:scale-[0.98]` on buttons
- Slight press feedback

---

## Migration Guide

### Before (Old buttons):
```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
  New Post
</button>
```

### After (New system):
```tsx
import { Button } from "@/components/ui";

<Button leftIcon={Plus}>
  New Post
</Button>
```

---

## Completed Refactoring

### ✅ Phase 1: Design Tokens
- Enhanced CSS variables for light/dark themes
- Radius scale
- Shadow/glow system
- Accent colors with purple tint

### ✅ Phase 2: Core Components
- Button (6 variants, 4 sizes)
- IconButton
- Card (4 variants)
- Badge (4 variants, 2 sizes)
- SectionHeader
- MetricBanner
- ProjectCard

### ✅ Phase 3: Page Refactoring (Partial)
- ✅ `/app/admin/blogs/page.tsx`
- ✅ `/app/admin/projects/page.tsx`
- ✅ `/app/admin/requests/page.tsx`
- ✅ `/app/projects/page.tsx`
- 🔄 Remaining: Home, Services, Project Detail pages

---

## Next Steps

1. **Complete Page Refactoring**:
   - Home page: Replace headings with SectionHeader
   - Services page: Use Card variants
   - Project detail pages: Add MetricBanner

2. **Polish & Motion**:
   - Add lift animations to remaining cards
   - Implement press animations on remaining buttons
   - Add subtle shimmer to key CTAs

3. **Documentation**:
   - Create Storybook stories (optional)
   - Add more usage examples
   - Document color customization

---

## Design Philosophy

- **Fewer, Stronger Primitives**: 7 components replace dozens of variants
- **Consistent Interaction Language**: Border glow + lift for interactive elements
- **Layered Surfaces**: Use elevation tokens for depth
- **Accessible by Default**: Proper focus states, ARIA labels
- **Theme-Aware**: All components work in light/dark modes
- **Scalable**: CVA makes adding variants simple

---

## Performance

- **Bundle Size**: CVA adds ~2KB, motion already in use
- **Runtime**: No unnecessary re-renders
- **CSS**: Leverages CSS variables for instant theme switching
- **Animations**: GPU-accelerated transforms (translate, scale)

---

Built with ❤️ using:
- `class-variance-authority` for variants
- `tailwind-merge` + `clsx` for className composition
- `motion` for animations
- Tailwind CSS for styling
