# ResearchOS Design System

## Overview

ResearchOS uses the ibl.ai visual system already embedded in the application. The authenticated workspace is a restrained product interface. Public portfolio routes use a more committed brand register while keeping the same type, blue palette, radii, and interaction language.

## Theme

Light-first. Researchers typically read dense evidence in bright offices or classrooms, so the base surface is a cool paper white with ink-like navy text. Deep navy sections create narrative contrast without turning the whole product into a dark developer tool.

## Color

- Primary: `#0058cc`, represented by `--primary`.
- Primary light: `#00b0ef`, represented by `--chart-5`.
- Ink: `oklch(0.22 0.035 258)` for high-emphasis public copy.
- Paper: `oklch(0.985 0.004 255)` for the public canvas.
- Muted text: existing `--muted-foreground`.
- Evidence success: existing `--chart-2`.
- Warning and uncertainty: existing `--chart-4`.

Use blue as a committed structural color on public sections, not as gradient text. Keep application surfaces restrained and inherit the existing shadcn variables.

## Typography

Open Sans remains the single brand family. Distinction comes from deliberate scale and weight contrast rather than adding a decorative display font.

- Hero: fluid `clamp()` scale, tight tracking, 600 weight.
- Section headings: 2rem to 3.5rem, 600 weight.
- Body: 1rem to 1.125rem, 1.65 line height, maximum 70 characters.
- Labels: sentence case, 600 weight. Avoid repeated tracked uppercase labels.

## Layout

Public routes use a visible evidence-led rhythm: asymmetric hero, full-width workflow bands, and alternating paper and ink sections. The primary content width is 1200px. Long-form text remains between 60 and 72 characters. Cards are reserved for literal product objects such as a source, answer, or test result.

Authenticated routes preserve the existing compact workspace shell.

## Components

- Buttons: 8px radius, solid primary or quiet outline, visible focus ring.
- Evidence paper: off-white surface, fine full border, modest shadow, square research-document proportions.
- Workflow steps: numbered rows separated by rules, not equal feature cards.
- Status: icon plus text; never color alone.
- Navigation: compact, sticky only on the public showcase, with a clear workspace action.

## Motion

Motion is optional and restrained. Use opacity and transform only, with exponential ease-out. Disable non-essential motion under `prefers-reduced-motion`. The evidence interaction must remain fully understandable with no animation.
