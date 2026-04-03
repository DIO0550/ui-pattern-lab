export type InputPatternEntryId =
  | 'basic-input'
  | 'label-helper-input'
  | 'validation-state-input'
  | 'addon-icon-input'
  | 'disabled-readonly-input'
  | 'custom-design-input';

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
