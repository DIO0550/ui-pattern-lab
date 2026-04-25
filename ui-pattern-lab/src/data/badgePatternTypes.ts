export type BadgePatternEntryId = 'text-and-number-badge';

export type BadgePatternVariantId = 'filled' | 'outlined' | 'soft' | 'surface';

export type BadgePatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'accessibility';

export type BadgePatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type BadgePatternSnippets = {
  snippetSummary: string;
  items: BadgePatternSnippetItem[];
};

export type BadgePatternEntry = {
  id: BadgePatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
};
