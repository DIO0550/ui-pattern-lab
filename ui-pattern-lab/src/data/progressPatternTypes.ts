export type ProgressPatternEntryId =
  | 'progress-bar-determinate'
  | 'circular-progress-determinate'
  | 'progress-bar-indeterminate'
  | 'loading-spinner'
  | 'skeleton-placeholder'
  | 'stepper-status-tracker';

export type ProgressDemoKind = ProgressPatternEntryId;

export type ProgressPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'accessibility';

export type ProgressPatternMetadataItem = {
  label: string;
  value: string;
  tone: ProgressPatternMetadataTone;
};

export type ProgressPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type ProgressPatternSnippets = {
  snippetSummary: string;
  items: ProgressPatternSnippetItem[];
};

export type ProgressPatternEntry = {
  id: ProgressPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
  demoKind: ProgressDemoKind;
  snippets?: ProgressPatternSnippets;
};
