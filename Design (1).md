# Door Handles Landing Page Design

## Overview
- **Motion Style**: Architectural Fluidity & Kinetic Precision
- **Animation Intensity**: Ultra-Dynamic
- **Technology Stack**: WebGL (Three.js) for specific elements, GSAP for choreography, CSS Custom Properties for reactive layouts

## Brand Foundation
- **Colors**:
  - Primary Black: #1a1a1a
  - White: #ffffff
  - Light Gray: #f5f5f5
  - Dark Gray: #333333
  - Medium Gray: #999999
  - Border Gray: #cccccc
  - Accent Blue: #4a90e2
  - Success Green: #28a745
  - Error Red: #dc3545
- **Typography**: 
  - **Primary**: Manrope (sans-serif)
  - **Secondary**: Inter (sans-serif)
- **Core Message**: Where architectural elegance meets tactile precision.
- **Font Family**: Manrope (Weights: 300-800), Inter (Weights: 400-900)

## Global Motion System

### Animation Timing
- **Easing Library**: 
  - *Cinematic Entrance*: `cubic-bezier(0.16, 1, 0.3, 1)`
  - *Sharp Interaction*: `cubic-bezier(0.25, 1, 0.5, 1)`
  - *Floating Ambient*: `linear`
- **Duration Scale**: 
  - Micro-interactions: 0.3s
  - Layout Shifts: 0.8s
  - Page Transitions: 1.2s
- **Stagger Patterns**: 0.05s per character for text, 0.1s per element for lists

### Continuous Effects
- **Living Whitespace**: Subtle noise textures (opacity 0.03) moving at 12fps to give the white/light gray backgrounds a "paper" feel.
- **Micro-Parallax**: Text and images move at slightly different speeds (delta 0.05 to 0.1) to create subconscious depth.

### Scroll Engine
- **Fluid Momentum**: Smooth scroll with 0.1 damping.
- **Velocity Reactivity**: Elements skew slightly (max 2deg) based on scroll speed.
- **Pinning**: Sections momentarily pin to allow content to "catch up" and unfold.

## Section 1: Navigation

### Layout
**Dynamic Island Header**: The navigation floats 24px from the top, encapsulated in a pill-shaped glass container. On scroll, it compresses into a "magnetic" dot that expands on hover.

#### Spatial Composition
- **Z-Index**: 1000 (Always on top)
- **State A (Top)**: Full width transparent glass.
- **State B (Scrolled)**: Compact "island" mode with logo only, expands on interaction.

### Content
- **Logo**: "DOORHANDLES" (SVG)
- **Links**: Products, About Us, Blog, Contact Us
- **Actions**: Cart (Icon + Badge), Mobile Menu Toggle

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Nav Container | Slide Down | Y: -100% → 0% | 0.8s | 0s | Cinematic |
| Links | Stagger Fade | Opacity: 0 → 1, Y: -10px → 0 | 0.6s | 0.2s | Smooth |

#### Interaction Effects
- **Magnetic Links**: Links attract to cursor position within a 20px radius.
- **Hover Reveal**: Hovering the "Island" expands it back to full width with an elastic spring effect.

## Section 2: Hero Section

### Layout
**Cinematic Split with WebGL Depth**: A 60/40 split where the boundary isn't a straight line but a dynamic, vertical "S" curve that reacts to mouse position. The image sits in a WebGL plane allowing for subtle "liquid displacement" on interaction.

#### Spatial Composition
- **Left (Content)**: Floating in a void of negative space, aligned to the optical center.
- **Right (Visual)**: Full height, bleeding to the edge.
- **Depth**: Text z-index: 10, Image z-index: 5, Background Pattern z-index: 1.

### Content
- **Headline**: "The Art of Entry"
- **Description**: "Precision-engineered door jewelry that transforms spaces into experiences."
- **CTA**: "Explore Collection"

### Images
**Hero Product Image**
- **Resolution:** High-Res
- **Aspect Ratio:** Vertical Portrait
- **Transparent Background:** No
- **Visual Style:** Minimalist modern product photography
- **Subject:** Close-up angled view of matte black door handle on light gray door
- **Color Palette:** Matte black, Light gray, Medium gray
- **Generation Prompt:** "A minimalist, modern door handle made of matte black metal, featuring a sleek cylindrical grip and a square backplate with rounded corners, mounted on a light gray door. The handle is photographed at a close-up, angled perspective, emphasizing its contemporary design and smooth finish. The lighting is soft and diffused, creating gentle shadows and a sophisticated, calm mood. The background is softly blurred, with a subtle, neutral gray wall and a faint geometric pattern, ensuring the focus remains on the handle. The overall color palette is monochromatic, with shades of black, gray, and white. High resolution, portrait orientation, clean and professional commercial photography style."

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Headline | Split-Line Reveal | Y: 100% → 0% (masked) | 1.0s | 0.2s | Cinematic |
| Description | Fade Up | Y: 20px → 0, Opacity: 0 → 1 | 0.8s | 0.4s | Smooth |
| Image | Liquid Materialize | Distortion: 1 → 0, Opacity: 0 → 1 | 1.5s | 0s | Fluid |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Hero Image | Parallax | Top | Bottom | Y: 0 → 150px |
| Scroll | Headline | Blur Fade | Top | 50% | Blur: 0 → 10px, Opacity: 1 → 0 |

#### Continuous Animations
- **Image Breathe**: The WebGL plane hosting the image has a slow, imperceptible "water surface" ripple effect (amplitude 0.02).

#### Interaction Effects
- **Liquid Cursor**: Moving the mouse over the hero image creates a localized liquid distortion trail (radius 100px) that settles calmly.

## Section 3: Products ("The Collection")

### Layout
**Horizontal Drift Gallery**: Instead of a static grid, products are arranged in a horizontal track that the user drifts through via scroll or drag. The cards have a "skew" effect based on velocity.

#### Spatial Composition
- **Container**: Full viewport width, overflow hidden.
- **Cards**: Tall aspect ratio, floating slightly off-axis.
- **Background**: Light Gray #f5f5f5 with a faint, large-scale typographic watermark of the brand name.

### Content
- **Heading**: "Curated Collection"
- **Products**: [Product Cards with Title, Price, Swatches]

### Images
**Product Images**
- **Resolution:** High-Res
- **Aspect Ratio:** 4:5
- **Transparent Background:** No
- **Visual Style:** Modern minimalist product photography
- **Subject:** Door handles in various finishes (matte black, satin nickel, brass)
- **Color Palette:** Matte black, Satin nickel, Brass, Light gray backgrounds

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Product Cards | Staggered Slide | X: 100px → 0, Opacity: 0 → 1 | 0.8s | 0.1s (each) | Cinematic |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Card Container | Horizontal Scroll | Top | Bottom | X: 0 → -100% |
| Scroll | Cards | Velocity Skew | Scroll Start | Scroll End | SkewX: 0 → ±5deg |

#### Interaction Effects
- **3D Tilt**: Cards tilt in 3D space towards the cursor (perspective 1000px).
- **Focus Mode**: Hovering a card dims the others (opacity 0.5) and scales the active card (1.05x).

## Section 4: About Us

### Layout
**The Broken Grid**: Text and image overlap significantly. The image is anchored to the bottom-right, while the text block floats in the top-left, creating a tension-filled diagonal reading path.

#### Spatial Composition
- **Layering**: Text block (z: 2) overlaps the Image (z: 1).
- **Whitespace**: Massive void in the top-right to balance the visual weight.

### Content
- **Heading**: "Forged in Precision"
- **Body**: [Company Story Text]
- **CTA**: "Our Philosophy"

### Images
**About Us Image**
- **Resolution:** High-Res
- **Aspect Ratio:** 4:3
- **Transparent Background:** No
- **Visual Style:** Minimalist modern interior photography
- **Subject:** Matte black door handle on white door
- **Generation Prompt:** "A minimalist, modern interior door with a sleek, matte black door handle. The door is white with subtle paneling, and the handle is a simple, geometric T-bar design, also in matte black. The setting is a bright, contemporary room with soft, natural light streaming in from the left, casting gentle shadows on a clean, light gray concrete wall. The floor is smooth and light-colored, reflecting the natural light. The overall mood is calm, sophisticated, and uncluttered, with a monochromatic color palette of whites, grays, and black. The composition is centered, with the door handle as the focal point, and the background is slightly blurred for emphasis. High resolution, portrait orientation, professional interior photography style."

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Image | Mask Reveal | Clip-path: Inset(100% 0 0 0) → Inset(0) | 1.2s | 0s | Cinematic |
| Text | Character Stagger | Y: 20px → 0, Opacity: 0 → 1 | 0.8s | 0.3s | Smooth |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Image | Scale | Enter | Exit | Scale: 1.1 → 1.0 |
| Scroll | Text Block | Parallax | Enter | Exit | Y: 50px → -50px |

## Section 5: Why Choose Us

### Layout
**Orbiting Features**: The heading is centered. Three feature cards are arranged in a gentle arc. As the user scrolls, the cards rotate slightly along the arc path, simulating a carousel but in a flat 2.5D space.

#### Spatial Composition
- **Central Axis**: Heading and description centered.
- **Radial Distribution**: Feature cards positioned at 120-degree intervals around a virtual circle below the text.

### Content
- **Heading**: "The Difference is in the Details"
- **Subheading**: "Why architects and designers choose us."
- **Features**: 
  1. "Premium Materials" (Brass, Bronze, Steel)
  2. "Handcrafted Quality" (Artisan touch)
  3. "Lifetime Warranty" (Guaranteed)

### Images
**Feature Icons**
- **Style:** Line-art icons
- **Size:** 64x64px
- **Animation:** Stroke-dashoffset draw-on effect.

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Icons | SVG Draw | Stroke-dashoffset: 100 → 0 | 1.5s | 0.2s | Linear |
| Cards | Float Up | Y: 50px → 0, Opacity: 0 → 1 | 0.8s | 0.1s (stagger) | Cinematic |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Feature Arc | Rotation | Enter | Exit | Rotate: -5deg → 5deg |

#### Interaction Effects
- **Icon Morph**: Hovering a card triggers the icon to perform a small animation (e.g., the "Materials" block rotate 360deg).

## Section 6: Testimonials

### Layout
**Infinite Velocity Marquee**: Two rows of testimonials moving in opposite directions. The speed of the marquee increases when the user scrolls down, creating a "warp speed" feeling.

#### Spatial Composition
- **Row 1**: Moves Left.
- **Row 2**: Moves Right.
- **Cards**: Glassmorphism effect (blur background, white border).

### Content
- **Heading**: "Voices of Design"
- **Testimonials**: [Quotes, Names, Titles]

### Images
**Testimonial Photos**
- **Style:** Candid lifestyle portraits
- **Shape:** Circular
- **Size:** 40x40px
- **Effect:** Grayscale → Color on hover.

### Motion Choreography

#### Continuous Animations
- **Marquee Flow**: Constant linear movement (base speed: 20px/s).

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Row 1 | Acceleration | Scroll Start | Scroll End | Speed: 1x → 3x |
| Scroll | Row 2 | Acceleration | Scroll Start | Scroll End | Speed: 1x → 3x (Reverse) |

## Section 7: Blog

### Layout
**Magazine Asymmetry**: A broken grid layout where the first item is a "Feature" (large, left), and subsequent items are stacked vertically on the right but offset horizontally.

#### Spatial Composition
- **Feature Post**: 60% width, full height.
- **Secondary Posts**: 40% width, stacked with negative margin overlap.

### Content
- **Heading**: "Journal"
- **Posts**: [Thumbnails, Titles, Dates]

### Images
**Blog Post Images**
- **Style:** Minimalist modern interior photography
- **Aspect Ratio:** 16:9
- **Transparent Background:** No
- **Subject:** Door handles in situ

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Feature Image | Zoom Out | Scale: 1.2 → 1.0 | 1.0s | 0s | Cinematic |
| Secondary Posts | Slide In | X: 50px → 0, Opacity: 0 → 1 | 0.8s | 0.2s | Smooth |

#### Interaction Effects
- **Focus Mode**: Hovering a post dims all others to 0.3 opacity.
- **Cursor Reveal**: Custom cursor becomes a "Read" circle when hovering the section.

## Section 8: FAQ

### Layout
**Elastic Accordion**: A clean, centered stack. Opening an item doesn't just push content down; it uses a spring physics animation to bounce slightly.

### Content
- **Heading**: "Common Questions"
- **Items**: [Questions & Answers]

### Motion Choreography
- **Open**: Height animates from 0 to auto with an elastic overshoot (using `cubic-bezier(0.68, -0.55, 0.265, 1.55)`).
- **Icon**: Rotates 180deg with a "wobble" effect.

## Section 9: Footer

### Layout
**The Curtain Reveal**: The footer is fixed at the bottom of the page (z-index: -1). The preceding content section has a margin-bottom equal to the footer height. As you scroll the last section, it lifts up like a curtain to reveal the footer behind it.

#### Spatial Composition
- **Background**: Dark #1a1a1a
- **Typography**: White text.

### Content
- **Newsletter**: "Stay in the loop"
- **Links**: [Standard Footer Links]
- **Bottom**: Copyright & Socials.

### Motion Choreography
- **Reveal**: Parallax reveal effect as the user scrolls to the very bottom.
- **Links**: Hovering a link triggers a "strikethrough" line that turns into an underline (animation).

## Technical Implementation Notes

### Required Libraries
- **GSAP (GreenSock)**: Core animation engine (ScrollTrigger, Flip Plugin).
- **Three.js**: For the Hero image liquid distortion effect.
- **Lenis**: For smooth momentum scrolling (critical for the "velocity" effects).

### Critical Performance Rules
- ✅ **Use transform3d()**: Force hardware acceleration.
- ✅ **Virtualize Marquee**: Only render visible testimonial cards.
- ❌ **No Layout Thrashing**: Do not animate width/height on scroll (except accordion, which is interaction-based).
- ❌ **Limit WebGL**: Only the Hero image uses WebGL; everything else is CSS/Canvas.

### Browser Support
- **Progressive Enhancement**: WebGL effects fall back to static images on low-power devices.
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is detected, all parallax and skew effects are disabled, falling back to simple fades.
