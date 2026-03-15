export type TablePatternEntryId =
  | 'responsive-stack'
  | 'horizontal-scroll'
  | 'sticky-header'
  | 'cell-truncation';

export type DemoKind = TablePatternEntryId;

export type TablePatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type TablePatternSnippets = {
  snippetSummary: string;
  items: TablePatternSnippetItem[];
};

export type TablePatternEntry = {
  id: TablePatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  accessibilityNotes: string;
  tags: string[];
  demoKind: DemoKind;
  snippets?: TablePatternSnippets;
};
