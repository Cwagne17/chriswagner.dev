# Navbar Scroll Behavior - "Option C" Implementation

## 🎯 **What Changed**

### **Behavior Summary**

**When `scrollY < 80` (Top of page)**:
- ✅ Minimal navbar: Brand + Theme toggle only
- ✅ Transparent background (no blur, no border)
- ✅ Nav links hidden
- ✅ Contact button hidden (desktop)
- ✅ Mobile menu button always visible

**When `scrollY >= 80` (After scroll)**:
- ✅ Full navbar: Brand + Links + Theme toggle + Contact
- ✅ Opaque background with backdrop blur
- ✅ Subtle border and shadow
- ✅ Nav links animate in (fade + slide down ~6px)
- ✅ Contact button appears (desktop)

---

## 📊 **Desktop Navigation Structure**

### Primary Links (always in main nav):
- **Projects** → `/projects`
- **Services** → `/services`
- **About** → `/#about`

### "More" Dropdown:
- **Certifications** → `/#certifications`
- **Experience** → `/#experience`

### Always Visible (both states):
- **Brand** (Chris Wagner) → `/`
- **Theme Toggle** (Sun/Moon icon)

### Appears After Scroll:
- **Contact Button** (gradient blue-purple with Mail icon)

---

## 📱 **Mobile Behavior**

### Always Visible:
- Brand
- Theme toggle
- Menu button (hamburger/X)

### Mobile Menu Panel:
When opened, shows ALL links:
- Projects
- Services
- About
- Certifications
- Experience
- Contact

**Features**:
- Staggered fade-in animation (0.05s delay per item)
- Left border highlight on hover
- Closes on link click
- Closes on ESC key

---

## ♿ **Accessibility Features**

### ✅ Skip to Content Link
- Hidden by default
- Appears on keyboard focus (Tab)
- Allows keyboard users to skip navigation
- Links to `#main-content` anchor

### ✅ Keyboard Navigation
- "More" dropdown opens on Enter/Space
- Dropdown items fully keyboard accessible
- All buttons have visible focus rings (blue-500)
- Focus ring offset for better visibility

### ✅ ESC Key Handling
- Closes dropdown
- Closes mobile menu
- Works from anywhere in the nav

### ✅ ARIA Attributes
- `aria-expanded` on menu/dropdown buttons
- `aria-haspopup` on dropdown trigger
- `aria-label` on icon-only buttons
- `role="menu"` and `role="menuitem"` on dropdown

### ✅ Reduced Motion Support
- Checks `prefers-reduced-motion`
- Reduces or disables transition durations
- Disables stagger delays on mobile menu

---

## 🎨 **Visual Design**

### Minimal State (scrollY < 80):
```css
background: transparent
border: transparent
backdrop-filter: none
```

### Full State (scrollY >= 80):
```css
background: background/80 (80% opacity)
backdrop-filter: blur(md)
border-bottom: border/40
box-shadow: subtle shadow-sm
```

### Animations:
- **Nav links**: Fade in + slide down 6px
- **Contact button**: Fade in + scale from 0.9 to 1.0
- **Dropdown**: Fade in + slide down 8px
- **Mobile menu**: Height expand + fade in
- **Duration**: 0.3s (or 0s if reduced motion)

---

## 🛠️ **Technical Implementation**

### New Hook: `useScrollY`
**Location**: `hooks/useScrollY.ts`

**Features**:
- Tracks `window.scrollY` position
- Uses `requestAnimationFrame` for smooth updates
- Throttles updates to prevent jank
- Returns current scroll position as number

**Usage**:
```tsx
const scrollY = useScrollY();
const isScrolled = scrollY >= 80;
```

### Updated Component: `Navbar`
**Location**: `components/Navbar.tsx`

**Key Changes**:
1. Uses `useScrollY()` hook to track scroll
2. Conditional rendering with `AnimatePresence`
3. Dynamic className with `cn()` utility
4. Dropdown state management
5. ESC key listener
6. Click-outside-to-close dropdown

### State Management:
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);           // Mobile menu
const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // Desktop dropdown
const scrollY = useScrollY();                                   // Scroll position
const isScrolled = scrollY >= 80;                              // Scroll threshold
```

---

## 🎬 **Animation Breakdown**

### Nav Links Appear:
```tsx
<motion.nav
  initial={{ opacity: 0, y: -6 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -6 }}
  transition={{ duration: 0.3 }}
>
```

### Contact Button Appear:
```tsx
<motion.button
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3 }}
>
```

### Dropdown Menu:
```tsx
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.15 }}
>
```

### Mobile Menu Items (Staggered):
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.05 }}
>
```

---

## 📐 **Scroll Threshold**

**Current**: `80px`

This value was chosen because:
- User has scrolled past the hero headline
- Enough scroll to indicate intent to navigate
- Not too early (doesn't feel jarring)
- Not too late (nav available when needed)

**To adjust**: Change `const isScrolled = scrollY >= 80;` to a different value.

---

## 🔄 **Works Across All Pages**

The navbar behavior works on:
- ✅ Home page (`/`)
- ✅ Projects page (`/projects`)
- ✅ Services page (`/services`)
- ✅ Project detail pages (`/projects/[slug]`)
- ✅ Admin pages (when logged in)

The scroll detection is page-independent and resets when navigating.

---

## 🎯 **User Experience Flow**

### New Visitor (Top of Page):
1. Sees minimal navbar (brand + theme toggle)
2. Focuses on hero content
3. No visual clutter

### As They Scroll:
1. After 80px, navbar smoothly transitions
2. Links fade in from top
3. Contact button appears
4. Background becomes opaque for readability

### On Mobile:
1. Always see brand + theme + menu button
2. Tap menu to see all links
3. Tap link to navigate + close menu
4. Tap outside or ESC to close

---

## 🐛 **Edge Cases Handled**

### ✅ Dropdown Closes When:
- User clicks outside
- User presses ESC
- User clicks a link inside
- User scrolls (implicitly, as focus shifts)

### ✅ Mobile Menu Closes When:
- User clicks a link
- User presses ESC
- User clicks menu button again

### ✅ Theme Toggle:
- Works in both scroll states
- Icon changes based on current theme
- Mounted check prevents hydration mismatch

### ✅ Reduced Motion:
- All animations respect `prefers-reduced-motion`
- Transitions become instant (0s duration)
- No stagger delays on mobile menu

---

## 📊 **Before vs After**

| Aspect | Before | After |
|--------|--------|-------|
| **Top of page** | Full navbar visible | Minimal navbar (brand + theme only) |
| **Background** | Always opaque with blur | Transparent → Opaque on scroll |
| **Nav links** | Always visible | Hidden → Animate in on scroll |
| **Contact** | In nav as link | Prominent button (appears on scroll) |
| **Mobile** | Same as desktop | Simplified (menu button always visible) |
| **Accessibility** | Basic | Skip link + keyboard nav + ESC handling |

---

## ✨ **Result**

The navbar now:
- ✅ **Feels premium** - Smooth animations, subtle transitions
- ✅ **Doesn't compete** - Minimal when reading hero
- ✅ **Available when needed** - Full nav appears on scroll
- ✅ **Is accessible** - Keyboard nav, skip link, ARIA labels
- ✅ **Respects motion preferences** - Reduced motion support
- ✅ **Works everywhere** - All pages, all screen sizes

The UX is now more intentional: minimal at the top to focus on content, full when navigating! 🚀

---

## 🔧 **Files Modified/Created**

- ✅ `hooks/useScrollY.ts` (NEW - scroll tracking hook)
- ✅ `components/Navbar.tsx` (UPDATED - scroll behavior, dropdown, accessibility)
