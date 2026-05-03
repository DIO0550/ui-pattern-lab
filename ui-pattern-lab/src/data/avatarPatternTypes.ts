export type AvatarPatternEntryId =
  | 'standalone-avatar'
  | 'avatar-group'
  | 'avatar-with-label';

export type AvatarPatternVariantId =
  | 'image'
  | 'initials'
  | 'icon'
  | 'overlap-group'
  | 'stacked-group'
  | 'summary-group'
  | 'inline-label'
  | 'card-label'
  | 'list-label';

export type AvatarPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type AvatarPatternSnippets = {
  snippetSummary: string;
  items: AvatarPatternSnippetItem[];
};

export type AvatarPatternEntry = {
  id: AvatarPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
  variantIds: AvatarPatternVariantId[];
};
