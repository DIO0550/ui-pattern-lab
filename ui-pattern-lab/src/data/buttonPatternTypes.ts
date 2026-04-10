export type ButtonPatternEntryId =
  | 'hierarchy-and-emphasis'
  | 'interactive-states'
  | 'destructive-actions'
  | 'icon-and-compound-actions'
  | 'button-group'
  | 'toggle-and-selection'
  | 'spacing-and-sizing';

export type ButtonDemoKind = ButtonPatternEntryId;

export type ButtonPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'accessibility';

export type ButtonPatternMetadataItem = {
  label: string;
  value: string;
  tone: ButtonPatternMetadataTone;
};

export type ButtonPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type ButtonPatternSnippets = {
  snippetSummary: string;
  items: ButtonPatternSnippetItem[];
};

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
