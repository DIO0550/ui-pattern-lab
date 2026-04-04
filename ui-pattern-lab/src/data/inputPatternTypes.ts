export type InputPatternEntryId =
  | 'outline-text-field'
  | 'filled-text-field'
  | 'underline-text-field'
  | 'borderless-text-field'
  | 'pill-text-field';

export type InputPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type InputPatternSnippets = {
  snippetSummary: string;
  items: InputPatternSnippetItem[];
};

export type InputPatternEntry = {
  id: InputPatternEntryId;
  title: string;
  description: string;
  tags: string[];
  comparisonTip?: string;
  snippets?: InputPatternSnippets;
};
