export type AlertPatternEntryId = 'contextual-alert';

export type AlertPatternVariantId =
  | 'base'
  | 'outlined'
  | 'elevated'
  | 'compact'
  | 'action'
  | 'dismissible';

export type AlertPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type AlertPatternSnippets = {
  snippetSummary: string;
  items: AlertPatternSnippetItem[];
};

export type AlertPatternEntry = {
  id: AlertPatternEntryId;
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
