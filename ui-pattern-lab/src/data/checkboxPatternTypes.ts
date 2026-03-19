export type CheckboxPatternEntryId =
  | 'multiple-independent-selection'
  | 'single-checkbox-and-indeterminate'
  | 'states-and-accessibility'
  | 'mobile-and-touch-targets';

export type CheckboxDemoKind = CheckboxPatternEntryId;

export type CheckboxPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'comparison'
  | 'layout'
  | 'state'
  | 'accessibility';

export type CheckboxPatternMetadataItem = {
  label: string;
  value: string;
  tone: CheckboxPatternMetadataTone;
};

export type CheckboxPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type CheckboxPatternSnippets = {
  snippetSummary: string;
  items: CheckboxPatternSnippetItem[];
};

export type CheckboxPatternEntry = {
  id: CheckboxPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  comparisonTip: string;
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
  demoKind: CheckboxDemoKind;
  snippets?: CheckboxPatternSnippets;
};
