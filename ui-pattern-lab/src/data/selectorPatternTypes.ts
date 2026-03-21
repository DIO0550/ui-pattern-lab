export type SelectorPatternEntryId =
  | 'radio-group-single-selection'
  | 'selectable-radio-cards'
  | 'native-select-compact-options'
  | 'custom-select-outline-listbox'
  | 'custom-select-soft-options'
  | 'custom-select-card-options'
  | 'combobox-search-and-filter'
  | 'combobox-grouped-results'
  | 'combobox-empty-and-loading-states'
  | 'states-and-validation';

export type SelectorEntryType = 'pattern' | 'reference';

export type SelectorDemoKind = SelectorPatternEntryId;

export type SelectorPatternCategoryId =
  | 'radio'
  | 'native-select'
  | 'custom-select'
  | 'combobox'
  | 'reference';

export type SelectorContextNoteKey =
  | 'button-toggle'
  | 'checkbox'
  | 'selector-reference';

export type SelectorPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'comparison'
  | 'layout'
  | 'state'
  | 'accessibility';

export type SelectorPatternMetadataItem = {
  label: string;
  value: string;
  tone: SelectorPatternMetadataTone;
};

export type SelectorPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type SelectorPatternSnippets = {
  snippetSummary: string;
  items: SelectorPatternSnippetItem[];
};

export type SelectorPatternEntry = {
  id: SelectorPatternEntryId;
  entryType: SelectorEntryType;
  category: SelectorPatternCategoryId;
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
  demoKind: SelectorDemoKind;
  contextNoteKey: SelectorContextNoteKey;
  snippets?: SelectorPatternSnippets;
};
