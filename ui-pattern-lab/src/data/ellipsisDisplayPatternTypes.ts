export type EllipsisDisplayPatternEntryId =
  | 'single-line-ellipsis'
  | 'multi-line-clamp'
  | 'full-text-supplement'
  | 'accessible-disclosure';

export type EllipsisDisplayDemoKind = EllipsisDisplayPatternEntryId;

export type EllipsisDisplayPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type EllipsisDisplayPatternSnippets = {
  snippetSummary: string;
  items: EllipsisDisplayPatternSnippetItem[];
};

export type EllipsisDisplayPatternEntry = {
  id: EllipsisDisplayPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  accessibilityNotes: string;
  tags: string[];
  demoKind: EllipsisDisplayDemoKind;
  snippets?: EllipsisDisplayPatternSnippets;
};
