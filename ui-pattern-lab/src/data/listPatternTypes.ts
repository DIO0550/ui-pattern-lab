export type ListPatternEntryId = 'plain-list' | 'divided-list' | 'card-list';

export type DemoKind = ListPatternEntryId;

export type ListPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type ListPatternSnippets = {
  snippetSummary: string;
  items: ListPatternSnippetItem[];
};

export type ListPatternEntry = {
  id: ListPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  accessibilityNotes: string;
  tags: string[];
  demoKind: DemoKind;
  snippets?: ListPatternSnippets;
};
