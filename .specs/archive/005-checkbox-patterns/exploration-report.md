# Checkbox Pattern Category: Codebase Exploration Report

**Date:** 2025-01-17  
**Scope:** Understanding how pattern categories are structured in ui-pattern-lab and how to add checkbox patterns with comparison/decision guidance.

---

## 1. How Existing Pattern Categories Are Added

### 1.1 Directory & File Structure

All pattern categories follow a **consistent tri-layer architecture**:

```
/workspace/ui-pattern-lab/
 docs/
   ├── {category}.mdx                    # Category overview page
   └── {category}/
       ├── {pattern-id-1}.mdx
       ├── {pattern-id-2}.mdx
       └── {pattern-id-3}.mdx            # Individual pattern detail pages

 src/
   ├── data/
   │   ├── {category}PatternTypes.ts     # Type definitions (EntryId, Entry, Snippets, Metadata)
   │   ├── {category}PatternEntries.ts   # Data: all entries with metadata, problem, solution, etc.
   │   └── {category}PatternSnippets.ts  # Data: CSS/TSX code samples
   │
   ├── components/
   │   ├── {Category}CategoryContent/       # Category landing page component
   │   ├── {Category}PatternPageContent/    # Overview comparison gallery
   │   ├── {Category}PatternDetailContent/  # Individual detail page wrapper
   │   ├── {Category}PatternGallery/        # Main gallery renderer (list + detail density)
   │   ├── {Category}PatternSectionCard/    # Collapsible section for preview/code
   │   ├── {Category}PatternMetadataPanel/  # Metadata display (problem/solution/usage)
   │   ├── {Category}PatternSnippetPanel/   # Code snippet display (CSS/TSX)
   │   └── {Category}PatternMetadataPanel/  # Metadata item render
   │
   └── pages/
       └── patterns/
           └── {category}-designs/
               └── index.tsx             # Docusaurus page for comparison gallery

 sidebars.ts                           # Sidebar navigation structure
```

### 1.2 Data Files

**Pattern Entry Types** (`*PatternTypes.ts`):
- Defines TypeScript types for entries, snippets, metadata
- Example (ButtonPatternTypes.ts):
  ```typescript
  export type ButtonPatternEntryId = 'hierarchy-and-emphasis' | 'interactive-states' | ...;
  export type ButtonPatternEntry = {
    id: ButtonPatternEntryId;
    title: string;
    summary: string;
    problem: string;
    solution: string;
    whenToUse: string;
    layoutNotes: string;
    stateNotes: string;
    accessibilityNotes: string;
    tags: string[];
    demoKind: ButtonDemoKind;
    snippets?: ButtonPatternSnippets;
  };
  ```

**Pattern Entries** (`*PatternEntries.ts`):
- Array of pattern objects matching the Entry type
- Each entry is complete: title, problem statement, solution, when-to-use guidance, layout/state/accessibility notes
- Snippets are attached via a separate map and normalized
- Example structure (6 button patterns):
  - Hierarchy and Emphasis
  - Interactive States
  - Destructive Actions
  - Icon and Compound Actions
  - Toggle and Selection
  - Spacing and Sizing

**Pattern Snippets** (`*PatternSnippets.ts`):
- Record<PatternEntryId, PatternSnippets>
- Each entry maps to CSS and TSX code samples
- Optional notes per snippet
- Example:
  ```typescript
  'hierarchy-and-emphasis': {
    snippetSummary: '主行動と補助行動を同じ行に置く最小構成...',
    items: [
      { id: 'hierarchy-and-emphasis-css', label: 'CSS', language: 'css', code: '...', note: '...' },
      { id: 'hierarchy-and-emphasis-tsx', label: 'TSX', language: 'tsx', code: '...', note: '...' }
    ]
  }
  ```

### 1.3 Components

**Component Hierarchy** (using Button as example):
1. **ButtonPatternPageContent** (`/src/components/ButtonPatternPageContent/index.tsx`)
   - Serves `/patterns/button-designs` page
   - Shows intro text, bullet points, and overview card
   - Renders ButtonPatternGallery with all entries

2. **ButtonCategoryContent** (`/src/components/ButtonCategoryContent/index.tsx`)
   - Serves `/button` category page
   - Two sections:
     - "まず比較一覧を見る" → Link to `/patterns/button-designs`
     - "個別のパターンへ進む" → Grid of all entries linking to `/button/{id}`

3. **ButtonPatternDetailContent** (`/src/components/ButtonPatternDetailContent/index.tsx`)
   - Wraps individual pattern detail pages
   - Finds entry by ID, throws error if not found
   - Renders ButtonPatternGallery with single entry + breadcrumb links

4. **ButtonPatternGallery** (`/src/components/ButtonPatternGallery/index.tsx` - 539 lines)
   - Core renderer for all pattern displays
   - Accepts `entries[]` and `density: 'list' | 'detail'`
   - Renders:
     - Demo component (HierarchyAndEmphasisDemo, etc.)
     - ButtonPatternSectionCard wrapper
     - ButtonPatternSnippetPanel (code samples)
     - ButtonPatternMetadataPanel (problem/solution/usage/notes)
   - Uses demoByKind map to dispatch to correct demo renderer

5. **ButtonPatternSectionCard** (`/src/components/ButtonPatternSectionCard/index.tsx`)
   - Collapsible section wrapper
   - Title + collapsible toggle (expanded in detail density)
   - Used for preview, code, and metadata panels

6. **ButtonPatternSnippetPanel** & **ButtonPatternMetadataPanel**
   - Display code samples and metadata (problem/solution/usage/notes)
   - Styled panels with tone-based coloring (problem, solution, usage, layout, state, accessibility)

### 1.4 Markdown Files (Docs & Routes)

**Category Overview** (`/docs/{category}.mdx`):
```yaml
---
title: ボタン
sidebar_label: ボタン
slug: /button
description: Category description
---
import ButtonCategoryContent from '@site/src/components/ButtonCategoryContent';
<ButtonCategoryContent />
```

**Individual Pattern Pages** (`/docs/{category}/{pattern-id}.mdx`):
```yaml
---
title: Pattern title
sidebar_label: Pattern sidebar label
slug: /button/{pattern-id}
description: Pattern description
---
import ButtonPatternDetailContent from '@site/src/components/ButtonPatternDetailContent';
<ButtonPatternDetailContent entryId="{pattern-id}" />
```

**Docusaurus Pages** (`/src/pages/patterns/{category}-designs/index.tsx`):
- Custom React page rendering the pattern comparison gallery
- Example: `/src/pages/patterns/button-designs/index.tsx`
- Returns Layout with `ButtonPatternPageContent` component

### 1.5 Sidebar Configuration

**File:** `/workspace/ui-pattern-lab/sidebars.ts`

```typescript
{
  type: 'category',
  label: 'ボタン',
  link: { type: 'doc', id: 'button' },  // Links to button.mdx
  collapsible: true,
  collapsed: true,
  items: [
    'button/hierarchy-and-emphasis',
    'button/interactive-states',
    'button/destructive-actions',
    'button/icon-and-compound-actions',
    'button/toggle-and-selection',
    'button/spacing-and-sizing',
  ],
}
```

### 1.6 Home Page (DocsHomeContent)

**File:** `/src/components/DocsHomeContent/index.tsx`

- Centralizes all pattern categories and their links
- Maintains `categoryCards: CategoryCard[]` with id, title, description, links array
- Links include category page, comparison overview, and all individual patterns
- Currently has 3 categories: table, ellipsis-display, button
- **Must be updated to add checkbox category**

---

## 2. Existing Category Comparison: Which is Closest to Checkbox?

### 2.1 Category Profiles

| Category | Type | Focus | # Entries | Metadata Fields |
|----------|------|-------|-----------|-----------------|
| **Button** | Interactive Component | Hierarchy, states, destructiveness, sizing, toggle/selection | 6 | problem, solution, whenToUse, layoutNotes, stateNotes, accessibilityNotes |
| **Table** | Layout/Container | Responsive, scrolling, header, truncation | 4 | problem, solution, whenToUse, accessibilityNotes |
| **Ellipsis Display** | Display Pattern | Text truncation (1-line, multi-line, disclosure, supplement) | 4 | problem, solution, whenToUse, accessibilityNotes |

### 2.2 Button Category is Closest to Checkbox

**Why:**

1. **Button contains toggle-and-selection** (`/docs/button/toggle-and-selection.mdx`)
   - This is the closest existing pattern to checkbox behavior
   - Uses `aria-pressed` for state management
   - Covers segmented controls and single/multiple selection groups
   - Mentions "단독 토글, 복수 선택 그룹" concepts

2. **Richest Metadata Structure**
   - Button has 6 metadata fields (problem, solution, whenToUse, layoutNotes, stateNotes, accessibilityNotes)
   - Supports layout/state/accessibility sections separately
   - Table and EllipsisDisplay only have 4 (no layout/state separation)

3. **Related Control Concerns**
   - Both deal with selection, state, and interaction
   - Both have state variants (default, disabled, focus-visible, etc.)
   - Both need accessibility guidance (aria-checked, aria-disabled, labels)

4. **Decision Framework**
   - Button's `toggle-and-selection` pattern already grapples with: "pressed/unpressed vs selected/unselected"
   - Checkbox will need: "checkbox vs radio vs switch vs select" decision guidance
   - Both require cross-control comparison context

### 2.3 Key Difference: Checkbox Requires Cross-Category Comparison

Unlike Button (which compares variants within one component type), checkbox patterns **must compare multiple component types:**
- Checkbox (multiple/independent selection)
- Radio button (exclusive selection)
- Switch/Toggle (immediate state change)
- Select (dropdown alternative)

This suggests checkbox should **either:**
- Be an independent category at the same level as Button/Table/EllipsisDisplay, **OR**
- Live as a special "control choice" section within Button category

---

## 3. Where Comparison/Decision Guidance Would Live

### 3.1 Current Guidance Pattern: Per-Entry Metadata

Today, guidance lives **per entry** in metadata fields:
- `problem`: What issue does this pattern solve?
- `solution`: How does this pattern solve it?
- `whenToUse`: Specific scenarios where this is the right choice

Example from Toggle-and-Selection:
```
.codex .devcontainer .git .github .gitignore .pnpm-store .specs LICENSE README.md "Ui-Patternecho-Lab 
solution: "トグルは pressed/unpressed、選択群は selected/unselected として意味を分け..."
whenToUse: 表示切替、フィルタ固定、セグメントコントロールなど、実行よ�'EOF' UI に向いています。"
```

### 3.2 Recommended Locations for Checkbox-Specific Guidance

#### Option A: Per-Entry Metadata (Minimal Change)

**Pros:**
- Follows existing pattern architecture
- Each checkbox pattern naturally has its own use cases
- Leverages existing ButtonPatternMetadataPanel rendering

**Cons:**
- Doesn't explicitly compare checkbox vs radio vs switch vs select
- Guidance is scattered across entries
- Hard to answer "should I use a checkbox or switch?" directly

**Example Entry:**
```typescript
{
  id: 'single-choice-checkbox',
  title: 'チェックボックス: 単一選択',
  problem: ','複数オプションの中から 1 つだけ選ぶとき、ラジオボタンとチェックボックスのどちらを選ぶか判断
  whenToUse: 'ページロード後に値を確定する場合、または独立した複数の選択肢がある場合。',
  ...
}
```

#### Option B: Add "Decision Guidance" Field to Entry Type

**Pros:**
- Explicitly supports cross-control comparison
- Structured data for decision support
- Could power a "which control?" filter/comparison table

**Cons:**
- Requires new data structure (breaking change for generator/gallery if not generic)
- More complex to render without custom components
- Potential duplication with whenToUse field

**Example Entry Extension:**
```typescript
export type CheckboxPatternEntry = {
  id: CheckboxPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  comparisonGuidance?: {
    preferOver?: string[];      // ['radio-button', 'switch']
    avoidWhen?: string[];       // ['mutually-exclusive-choice', 'immediate-effect']
    mobileNote?: string;
    accessibilityNote?: string;
  };
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
  snippets?: CheckboxPatternSnippets;
};
```

#### Option C: Category-Level Comparison Gallery

**Pros:**
- Dedicated "Decision Matrix" or "Control Comparison" page
- Could live at `/patterns/control-choice-guide` or `/checkbox/decision-guide`
- Separate from individual patterns, cleaner organization

**Cons:**
- Requires new component architecture (not just Entry + Gallery pattern)
- More implementation effort
- Harder to keep in sync with individual pattern updates

**Sketch:**
```
/docs/checkbox/decision-guide.mdx
 <CheckboxControlComparisonComponent />
  - Shows matrix: Checkbox vs Radio vs Switch vs Select
  - Columns: use case, selection model, immediate effect, mobile, accessibility
  - Cross-links to individual pattern pages
```

#### Option D: Append to ButtonPatternPageContent as "Control Choice Guide"

**Pros:**
- Checkbox becomes part of Button category conceptually (they're related controls)
- Leverage existing ButtonPatternPageContent structure
- Reuses Button metadata structure

**Cons:**
- Checkbox isn't actually a button variant
- Conceptually confusing (Button category mixes buttons and checkboxes)
- Doesn't scale to other controls (switches, toggles, etc.)

### 3.3 Recommendation: **Hybrid Approach**

**Best path forward:**

1. **Create checkbox as independent category** at `/checkbox` (same level as button/table)
2. **Use Option A (Per-Entry Metadata)** for initial implementation
   - Add `whenToUse` and `accessibilityNotes` to capture the key distinction
   - Each pattern entry explains what it's good for and why
3. **Add a "Comparison Decision Matrix" section** to CheckboxPatternPageContent (`/patterns/checkbox-designs`)
   - Not a full separate page, but a structured table/grid
   - Shows: Checkbox vs Radio vs Switch vs Select
   - Appears at top of `/patterns/checkbox-designs` before individual patterns
4. **Plan (future)** for a cross-category "Control Choice Guide" that links all control types

---

## 4. Build/Typecheck/Routing/MDX Constraints

### 4.1 Build System

**Build Command:** `pnpm build`
- Uses Docusaurus 3.9.2 (classic preset)
- Output: `/workspace/ui-pattern-lab/build/` (static files)
- **Status:** ✅ Currently passing (tested)

**Typecheck Command:** `pnpm typecheck`
- Runs `tsc` (TypeScript compiler)
- Uses tsconfig.json (extends @docusaurus/tsconfig)
- Excludes: .docusaurus, build directories
- **Status:** ✅ Currently passing (no errors)

### 4.2 Routing & URL Structure

**Docusaurus Routes by Convention:**

| File Location | Generated Route |
|---------------|-----------------|
| `/docs/index.mdx` | `/` |
| `/docs/button.mdx` | `/button` |
| `/docs/button/toggle-and-selection.mdx` | `/button/toggle-and-selection` |
| `/src/pages/patterns/button-designs/index.tsx` | `/patterns/button-designs` |

**For Checkbox, this would be:**

| File Location | Route |
|---------------|-------|
| `/docs/checkbox.mdx` | `/checkbox` |
| `/docs/checkbox/multiple-independent-selection.mdx` | `/checkbox/multiple-independent-selection` |
| `/docs/checkbox/indeterminate-state.mdx` | `/checkbox/indeterminate-state` |
| `/src/pages/patterns/checkbox-designs/index.tsx` | `/patterns/checkbox-designs` |

**No custom routing needed** — Docusaurus auto-generates based on file structure.

### 4.3 MDX Constraints

**Frontmatter Requirements:**
- Must include `title`, `slug` (or auto-generated from path), `sidebar_label` (for sidebar)
- Optional: `description`, `hide_table_of_contents`

**Component Import Pattern:**
```mdx
---
title: Checkbox Pattern Title
sidebar_label: Pattern Label
slug: /checkbox/{pattern-id}
---
import CheckboxPatternDetailContent from '@site/src/components/CheckboxPatternDetailContent';
<CheckboxPatternDetailContent entryId="{pattern-id}" />
```

**No special MDX features needed** — just import React components and render them.

### 4.4 Type Safety

**Current Setup:**
- TypeScript strict mode (via @docusaurus/tsconfig)
- Entry IDs are literal string unions (e.g., `'hierarchy-and-emphasis' | 'interactive-states'`)
- DetailContent components throw errors if entryId doesn't match
- **No runtime validation** — errors only caught at build/typecheck time

**Critical for Checkbox:**
- **Must add all entry IDs to CheckboxPatternEntryId union** in checkboxPatternTypes.ts
- **Must add MDX files for each entry** with matching entryId
- **Build will fail if:**
  - Entry ID in MDX doesn't exist in the entries array
  - Snippet ID in entries doesn't exist in snippets record
  - Component tries to render unknown entryId (throws error in DetailContent)

---

## 5. Change Impact Surface: Files Needing Add/Update

### 5.1 New Files (Checkbox Category)

```
/workspace/ui-pattern-lab/

docs/
 checkbox.mdx                               [NEW] Category landing page
 checkbox/
    ├── multiple-independent-selection.mdx    [NEW] Pattern details
    ├── indeterminate-state.mdx               [NEW]
    ├── exclusive-choice-alternative.mdx      [NEW]
    └── ...                                   [NEW] ~4-6 patterns total

src/
 data/
   ├── checkboxPatternTypes.ts               [NEW] Type definitions
   ├── checkboxPatternEntries.ts             [NEW] Entry data (title, problem, solution, etc.)
   └── checkboxPatternSnippets.ts            [NEW] Code samples

 components/
   ├── CheckboxCategoryContent/              [NEW] Category page component
   │   ├── index.tsx
   │   └── styles.module.css
   ├── CheckboxPatternPageContent/           [NEW] Overview comparison component
   │   ├── index.tsx
   │   └── styles.module.css
   ├── CheckboxPatternDetailContent/         [NEW] Detail page wrapper
   │   ├── index.tsx
   │   └── styles.module.css
   ├── CheckboxPatternGallery/               [NEW] Main gallery renderer
   │   ├── index.tsx
   │   └── styles.module.css
   ├── CheckboxPatternSectionCard/           [NEW] Collapsible section
   │   ├── index.tsx
   └── styles.module.css   
   ├── CheckboxPatternSnippetPanel/          [NEW] Code snippet display
   │   ├── index.tsx
   │   └── styles.module.css
   ├── CheckboxPatternMetadataPanel/         [NEW] Metadata display
   │   ├── index.tsx
   │   └── styles.module.css
   └── CheckboxPatternSectionCard/           [NEW] Card wrapper
       ├── index.tsx
       └── styles.module.css

 pages/
    └── patterns/
        └── checkbox-designs/                 [NEW] Comparison gallery page
            └── index.tsx
```

### 5.2 Modified Files

```
/workspace/ui-pattern-lab/

sidebars.ts
 ADD checkbox category block (same structure as button/table/ellipsis-display)
 ADD entries array with pattern IDs

src/components/DocsHomeContent/index.tsx
 IMPORT checkboxPatternEntries
 ADD checkboxDetailLinks array (map entries to /checkbox/{id})
 ADD checkbox category to categoryCards array
 ADD checkbox to CategoryId union type
 ADD checkbox to openStates state object

docusaurus.config.ts
 OPTIONAL: No changes needed (auto-discovery works)
```

### 5.3 Ripple Points

**Moderate Impact:**
- **DocsHomeContent** is the main hub; updates here affect homepage discovery
- **Sidebars.ts** affects navigation sidebar; must stay in sync with docs/ structure

**Low Impact:**
- **docusaurus.config.ts** does NOT need updates (Docusaurus auto-discovers docs/ files)
- **tsconfig.json** does NOT need updates (TypeScript in docs/ is optional)
- **Package.json** does NOT need updates (no new dependencies)

**No Impact:**
- Other pattern categories (Button, Table, EllipsisDisplay)
- Existing routes or components

---

## 6. Risks & Open Questions

### 6.1 Risks

#### Risk 1: Type Safety Gaps (Medium Risk)

**Issue:** If checkbox entry data is incomplete:
- Missing entry ID in union type → TypeScript error at build time ✓ (caught early)
- Missing MDX file → 404 at runtime (not caught until test/deploy)
- Missing snippet entry → normalizeSnippets filters silently, but gallery may look incomplete

**Mitigation:**
- Follow button/table/ellipsis-display structure exactly
- Test: `pnpm typecheck && pnpm build` must both pass
- Manual test: Visit `/patterns/checkbox-designs` and click each pattern

#### Risk 2: Data Sync Across Three Layers (Medium Risk)

**Issue:** Three files must stay in sync:
1. checkboxPatternTypes.ts (entry ID union)
2. checkboxPatternEntries.ts (all entries with metadata)
3. checkboxPatternSnippets.ts (code samples for each entry)

If entry ID added to union but no snippet provided → silent failure (no error, just missing code panel)

**Mitigation:**
- Use TypeScript Record<CheckboxPatternEntryId, ...> to force completeness
- Implement normalizeSnippets validation (like buttons do)
- Add console warnings if snippet is missing/empty

#### Risk 3: Cross-Category Comparison Guidance (Medium Risk)

**Issue:** Deciding between "checkbox vs radio vs switch" guidance:
- Current architecture is single-category-focused
- No built-in support for cross-category comparisons
- Guidance scattered across entries makes it hard to compare

**Mitigation (chosen approach):**
- Add comparison matrix section to CheckboxPatternPageContent
- Each entry's `whenToUse` explicitly states when NOT to use alternatives
- Future: plan cross-category "control choice guide" as separate page

#### Risk 4: Demo Component Complexity (Low Risk)

**Issue:** CheckboxPatternGallery demo renderers must handle:
- Indeterminate state
- Disabled/error states
- Multi-line labels
- Mobile tap targets
- Accessibility (aria-checked, aria-disabled, aria-describedby)

Current buttons demo code is ~539 lines for 6 patterns.

**Mitigation:**
- Start with 4-6 core patterns (not all edge cases)
- Reuse existing PreviewCard, DemoFrame structure
- Test accessibility with browser DevTools (Accessibility tab)

#### Risk 5: Documentation Keeping Pace (Low Risk)

**Issue:** Hearing notes request "多選択 vs 単独選択、indeterminate state、disabled/error state、長いラベル、モバイルでのタップ領域、アクセシビリティ表現"

If any of these edge cases are skipped in the first version, it may feel incomplete.

**Mitigation:**
- Commit to at least: single/multi-select, indeterminate, mobile tap, accessibility
- Plan follow-up patterns if needed
- Mark patterns as "初回版" (initial version) to signal iteration

### 6.2 Open Questions

#### Q1: Should checkbox be independent category or part of button?

**Context:** Toggle-and-selection is already in Button category. Checkbox is conceptually related (selection, state, accessibility).

**Decision Options:**
- **A. Independent category** (at `/checkbox`): Clear separation, scalable to switches/radios later
- **B. Part of button** (at `/button/checkbox-patterns`): Reuses button structure, but conceptually odd
- **C. New "form controls" super-category** (at `/form-controls/checkbox`): Future-proof for radios/switches, but overkill now

**Recommendation:** **Option A (Independent)** — cleaner, and future updates won't need to revisit button category.

---

#### Q2: What's the "reference" structure for comparison guidance?

**Issue:** Hearing notes want to show when to use checkbox vs radio vs switch vs select.

**Possible Data Structures:**

Option A: Flat metadata fields in entry
```typescript
whenToUse: "복수 선택이 필요할 때 사용하세요.",
preferOver: ["radio", "switch"],  // When to prefer this over alternatives
avoidWhen: ["single-choice"],     // Scenarios to avoid
```

Option B: Separate comparison table (non-entry data)
```typescript
export const controlComparisonGuide: ControlComparisonRow[] = [
  {
    control: 'checkbox',
    selectionModel: 'multiple independent',
    immediateEffect: false,
    mobileNote: 'Good tap target',
    ...
  },
  { control: 'radio', ... },
  { control: 'switch', ... },
];
```

Option C: Rich structured field (future-proof)
```typescript
export type ControlComparison = {
  against: 'radio' | 'switch' | 'select';
  scenario: string;
  reasoning: string;
};
entry.comparisons?: ControlComparison[];
```

**Recommendation:** Start with **Option A** (add comparison fields to entry type) for simplicity, plus a **static comparison matrix in CheckboxPatternPageContent** for clarity.

---

#### Q3: How many checkbox patterns should be in v1?

**Current Observed Patterns:**
- **Button:** 6 patterns (hierarchy, states, destructive, icon, toggle, sizing)
- **Table:** 4 patterns (responsive, scroll, sticky, truncation)
- **EllipsisDisplay:** 4 patterns (single-line, multi-line, supplement, disclosure)

**Hearing Notes Request:**
- 複数選択と単独選択 (multiple vs single)
- indeterminate state
- disabled/error state
- 長いラベル (long labels)
- モバイルでのタップ領域 (mobile tap)
- アクセシビリティ表現 (accessibility)

**Reasonable v1 Scope:** **4-5 patterns**
1. **Multiple Independent Selection** (multi-select checkbox use case)
2. **Single Checkbox & Indeterminate State** (parent-child, select-all scenario)
3. **States & Accessibility** (disabled, error, focus-visible, aria-checked)
4. **Long Labels & Mobile Tap Targets** (layout, touch-friendly sizing)
5. (Optional) **Comparison: Checkbox vs Radio vs Switch** (decision guidance pattern)

**Recommendation:** Start with **4 core patterns**, plan 5th as follow-up.

---

#### Q4: Should checkbox comparison guidance link to radio/switch patterns?

**Issue:** Hearing notes  checkbox / radio button / switch(toggle) / select を扱える"mention "比較対象として少なく

**Options:**
- **A. Only show checkbox patterns:** Comparison guidance is text-based, no links to other controls
- **B. Link to radio/switch if they exist:** Add future-proof links, but they don't exist yet
- **C. Create placeholder pages for radio/switch:** Full structure but empty entries for now
- **D. Single comparison guide page:** `/patterns/control-choice-guide` that lives outside category structure

**Recommendation:** **Option A for v1**, plan **Option D for v2**. Keep checkbox patterns focused; cross-control comparison is future work.

---

## 7. Mismatches Between Hearing Notes & Current Codebase

### 7.1 Mismatches Identified

#### Mismatch 1: "Decision Guidance" Not a First-Class Concept

**Hearing Note Expectation:**
"

**Current Reality:**
- Pattern entries have `whenToUse` field (text-based)
- No structured comparison matrix
- No explicit "decision axis" data structure
- Gallery is single-category (can't directly compare checkbox vs radio)

**Implication:**
- Will need to add custom "comparison matrix" component to CheckboxPatternPageContent
- Or extend entry type with structured comparison fields
- Current architecture supports this, but doesn't have a built-in pattern

#### Mismatch 2: "Guidance" is Per-Pattern, Not Cross-Pattern

**Hearing Note Expectation:**
.codex .devcontainer .git .github .gitignore .pnpm-store .specs LICENSE README.md ui-pattern-lab "echo

**Current Reality:**
- Architecture is strictly per-category (Button, Table, EllipsisDisplay)
- No cross-category comparison pages
- DocsHomeContent manually adds category entries, not auto-discovered

**Implication:**
- If radio/switch/select are added later, will need new architecture for cross-control guidance
- Current design doesn't scale elegantly to meta-category comparisons
- Checkbox should be independent for now, but plan for future meta-category

#### Mismatch 3: No Built-In "Accessibility Comparison" Framework

**Hearing Note Expectation:**
> "edgecases: 単独選択と複数選択, indeterminate state, disabled/error state, 長いラベル, モバイルでのタップ領域, アクセシビリティ表現"

**Current Reality:**
- Entries have `accessibilityNotes` field (text)
- Some categories separate `layoutNotes`, `stateNotes`, `accessibilityNotes`
- Button does this; Table & EllipsisDisplay only have `accessibilityNotes`

**Implication:**
- Will need CheckboxPatternEntry to include all three: layoutNotes, stateNotes, accessibilityNotes
- This is fine — just follow Button structure, not Table/EllipsisDisplay structure

#### Mismatch 4: Build/Typecheck Constraints Not Explicitly Documented

**Hearing Note Context:**
> "テスト要件: `pnpm typecheck` と `pnpm build` を必須とし..."

**Current Reality:**
- Both commands work today
- But no explicit validation in CI (no GitHub Actions workflow visible)
- Entry IDs are TypeScript unions, so build WILL fail if IDs don't match
- But MDX file mismatches only show 404 at runtime

**Implication:**
- Must run both `pnpm typecheck` and `pnpm build` before considering complete
- Manual testing of all pattern links is necessary
- Could add pre-commit hook or CI, but not required by current setup

### 7.2 Summary of Adjustments Needed

| Hearing Note Aspect | Current Codebase | Adjustment Needed |
|---------------------|------------------|-------------------|
| "Decision guidance" (checkbox vs radio vs switch) | Per-pattern `whenToUse` text | Add comparison matrix component + extend entry type |
| Independent category? | Yes, architecture supports it | Just follow Button/Table/EllipsisDisplay pattern |
| Accessibility guidance | `accessibilityNotes` field | Reuse; extend to layoutNotes + stateNotes per Button pattern |
| Edge cases (indeterminate, disabled, etc.) | Per-pattern in metadata | Covered by rich `problem/solution/whenToUse/stateNotes` fields |
| Build/typecheck mandatory | Both pass today | Will pass if ID/MDX files in sync |

---

## 8. Content Axes for Comparison Guidance

Based on hearing notes and codebase patterns, here are the key dimensions for checkbox decision guidance:

### 8.1 Selection Model

**Axis:** Single vs Multiple vs Exclusive

| Control | Single | Multiple | Exclusive |
|---------|--------|----------|-----------|
| **Checkbox** | ✓ (rare, prefer radio) | ✓✓ (ideal) | ✗ (conflicts with interaction model) |
| **Radio Button** | ✗ (too heavy) | ✗ (impossible) | ✓✓ (ideal) |
| **Switch/Toggle** | ✓ (binary, ideal) | ✗ (confusing) | ✗ |
| **Select Dropdown** | ✓ (ideal) | ✓ (multi-select variant) | ✓ (ideal) |

**For Checkbox Patterns:**
- "Multiple Independent Selection": "複数の独立した選択肢から、どれを選んでもいい"
- "Single Checkbox in Context": "1 つだけの ON/OFF が必要な場面"
- "Indeterminate (Parent-Child)": "複数の子から、一部選んだ状態を表示する"

### 8.2 User Expectation / Interaction Model

**Axis:** How does the user expect this to behave?

| Axis | Checkbox | Radio | Switch | Select |
|------|----------|-------|--------|--------|
| **Immediate Effect** | ✗ (deferred) | ✗ (deferred) | ✓ (immediate) | ✗ (deferred) |
| **Visible State** | ✓ (checkmark shows it's on) | ✓ (filled circle shows choice) | ✓ (toggle shows on/off) | ✓ (label shows selection) |
| **Discoverable?** | ✓ (visible by default) | ✓ (visible) | ✓ (visible) | ✗ (hidden until opened) |
| **"Save" Required?** | Often yes | Often yes | No (live update) | Often yes |

**For Checkbox Patterns:**
- Pattern on "deferred vs immediate effect" (when to use save buttons)
- Pattern on "visible state communication" (when is checkmark enough vs needs label?)

### 8.3 Mobile / Touch Context

**Axis:** Touch target size, density, gesture familiarity

| Control | Touch Target | Mobile Familiar? | Density on Mobile |
|---------|--------------|------------------|-------------------|
| **Checkbox** | ~44px (good) | Medium (standard) | Can be dense |
| **Radio** | ~44px (good) | Medium (standard) | Can be dense |
| **Switch** | ~48px (good) | High (familiar from settings) | Less dense |
| **Select** | ~44px (good) | High (native select is familiar) | Very compact |

**For Checkbox Patterns:**
- "Mobile Tap Targets & Long Labels": "モバイルで大きなタップ領域を確保しながら長いラベルを表示する"
- Pattern on density + touch target trade-offs

### 8.4 Accessibility / Assistive Technology

**Axis:** How screen readers and keyboard users interact

| Control | Keyboard | Screen Reader | Semantic |
|---------|----------|---------------|----------|
| **Checkbox** | Space/Enter to toggle | `role=checkbox` + `aria-checked` | HTML `<input type="checkbox">` |
| **Radio** | Arrow keys to switch | `role=radio` + `aria-checked` | HTML `<input type="radio">` |
| **Switch** | Space/Enter to toggle | `role=switch` + `aria-checked` | ARIA switch role |
| **Select** | Arrow keys to navigate | `<select>` accessible natively | HTML `<select>` |

**For Checkbox Patterns:**
- Pattern on "aria-checked states" (checked, unchecked, indeterminate)
- Pattern on "label association" (explicit <label> vs aria-label vs aria-labelledby)
- Pattern on "error/validation states" (aria-invalid, aria-describedby)
- Pattern on "disabled states" (aria-disabled vs disabled attribute)

### 8.5 Cognitive Load & User Education

**Axis:** How obvious is the control's purpose?

| Control | Clarity | Training Required | Error Risk |
|---------|---------|-------------------|-----------|
| **Checkbox** | Very clear (checkmark = selected) | None | Low |
| **Radio** | Clear (filled circle = selected) | None | Low |
| **Switch** | Very clear (toggle on/off) | None | Low |
| **Select** | Requires opening to see options | Minimal | Medium (options hidden) |

**For Checkbox Patterns:**
- Pattern on "when to use longer descriptive labels vs short labels"
- Pattern on "error messaging" (when validation fails, how to recover?)

### 8.6 Data Flow & Form Submission

**Axis:** How does selection data get submitted?

| Control | Form Reset? | Requires Button? | Validation Timing | Progressive Enhancement |
|---------|-------------|------------------|-------------------|-------------------------|
| **Checkbox** | Yes (value = false) | Usually | On submit | Works without JS |
| **Radio** | Yes (no value selected) | Usually | On submit | Works without JS |
| **Switch** | Yes (but instant) | Often no | Immediate | May not work without JS |
| **Select** | Yes (no selection) | Usually | On submit | Works without JS |

**For Checkbox Patterns:**
- Pattern on "form integration" (how does checkbox value get captured?)
- Pattern on "validation states" (when can user submit with none selected?)

---

## 9. Summary: Recommended Implementation Approach

### 9.1 Architecture Decision

**Create checkbox as independent category** at `/checkbox` (same level as button/table/ellipsis-display)

- ✅ Follows established pattern
- ✅ Future-proof for radio/switch/select additions
- ✅ Clear conceptual boundaries
- ✅ Doesn't require modifying existing categories

### 9.2 Pattern Count & Scope

**v1: 4 Core Patterns**

1. **Multiple Independent Selection**
   - Use case: "複数チェックボックスから自由に組み合わせて選ぶ"
   - Comparisons: vs radio (exclusive), vs select (dropdown)

2. **Single Checkbox & Indeterminate State**
"echo
   - Covers: indeterminate (aria-checked="mixed"), parent-child selection
   - Comparisons: vs switch (state immediacy)

3. **States, Labels & Accessibility**
   - Use case: "チェックボックスのdefault/hover/focus/disabled/error状態を一貫させる"
   - Covers: aria-checked, aria-disabled, aria-invalid, aria-describedby, long labels
   - Comparisons: accessibility parity with radio/switch

4. **Mobile & Touch Targets**
   - Use case: "モバイルでの大きなタップ領域と、長いラベルの両立"
   - Covers: min-height, padding, label spacing
   - Comparisons: touch target consistency with radio/switch

### 9.3 Metadata Structure

```typescript
export type CheckboxPatternEntry = {
  id: CheckboxPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;           // When to use THIS pattern
  comparisonTip?: string;       // When NOT to use (vs radio/switch/select) [OPTIONAL]
  layoutNotes: string;          // Spacing, sizing, touch targets
  stateNotes: string;           // States: default, hover, focus, disabled, error, indeterminate
  accessibilityNotes: string;   // ARIA, keyboard, screen reader
  tags: string[];
  demoKind: CheckboxDemoKind;
  snippets?: CheckboxPatternSnippets;
};
```

### 9.4 Files to Create/Modify

**Create:**
- `/docs/checkbox.mdx`
- `/docs/checkbox/{pattern-id}.mdx` (4 files)
- `/src/data/checkboxPatternTypes.ts`
- `/src/data/checkboxPatternEntries.ts`
- `/src/data/checkboxPatternSnippets.ts`
- `/src/components/CheckboxCategoryContent/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternPageContent/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternDetailContent/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternGallery/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternSectionCard/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternSnippetPanel/{index.tsx, styles.module.css}`
- `/src/components/CheckboxPatternMetadataPanel/{index.tsx, styles.module.css}`
- `/src/pages/patterns/checkbox-designs/index.tsx`

**Modify:**
- `/sidebars.ts` — add checkbox category block
- `/src/components/DocsHomeContent/index.tsx` — add checkbox to categories array

**Total New Files:** 15–17  
**Total Modified Files:** 2  
**Total Lines of Code (estimate):** 1,500–2,000 (mostly copy/adapt from Button)

### 9.5 Validation Checklist

Before considering complete:
- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm build` succeeds (generates `/build` directory)
- [ ] Visit `/checkbox` — category page loads
- [ ] Visit `/patterns/checkbox-designs` — comparison gallery loads
- [ ] Click each pattern link — detail page loads without errors
- [ ] Sidebar shows checkbox + all 4 patterns
- [ ] Homepage (DocsHomeContent) shows checkbox in category list
- [ ] All code snippets (CSS/TSX) render correctly
- [ ] All metadata panels display without truncation
- [ ] Mobile responsive (sidebar collapse, card layout)

---

## Appendix: Key File References

### Pattern Category Structure (for Copy/Adapt)

**Button Category (6 patterns, most complete):**
- Types: `/workspace/ui-pattern-lab/src/data/buttonPatternTypes.ts` (52 lines)
- Entries: `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts` (149 lines)
- Snippets: `/workspace/ui-pattern-lab/src/data/buttonPatternSnippets.ts` (~400 lines)
- Components: 8 files under `/src/components/Button*`
- Pages: `/src/pages/patterns/button-designs/index.tsx`
- Docs: `/docs/button.mdx` + 6 files in `/docs/button/`

**Table Category (4 patterns, simpler structure):**
- Types: `/workspace/ui-pattern-lab/src/data/tablePatternTypes.ts` (34 lines)
- Entries: `/workspace/ui-pattern-lab/src/data/tablePatternEntries.ts` (~130 lines)
- Snippets: `/workspace/ui-pattern-lab/src/data/tablePatternSnippets.ts` (~200 lines)
- Components: 8 files under `/src/components/Table*`
- Pages: `/src/pages/patterns/table-designs/index.tsx`
- Docs: `/docs/table.mdx` + 4 files in `/docs/table/`

### Central Coordination Files

- **Homepage:** `/src/components/DocsHomeContent/index.tsx` (203 lines) — lists all categories
- **Sidebar:** `/sidebars.ts` (71 lines) — navigation structure
- **Config:** `/docusaurus.config.ts` — Docusaurus settings (no changes needed)
- **Build:** `package.json` — scripts: `"typecheck": "tsc"`, `"build": "docusaurus build"`

---

**Report Complete**

This exploration confirms that the existing codebase is well-structured for adding checkbox patterns as an independent category. The main effort is mechanical (copy/adapt existing structures) and requires careful attention to type safety and file sync across the three data layers (types, entries, snippets).

