export type ControllerPatternEntryId =
  | 'segmented-view-switcher'
  | 'tabs-inline-panel-switcher'
  | 'sort-filter-toolbar'
  | 'pagination-and-page-size-controller'
  | 'range-slider-filter'
  | 'quantity-stepper-control';

export type ControllerPatternFamily =
  | 'view-switch'
  | 'scope-control'
  | 'continuous-adjustment';

export type ControllerDemoKind = ControllerPatternEntryId;

export type ControllerPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'comparison'
  | 'interaction'
  | 'accessibility'
  | 'future';

export type ControllerPatternMetadataItem = {
  label: string;
  value: string;
  tone: ControllerPatternMetadataTone;
};

export type ControllerPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type ControllerPatternSnippets = {
  snippetSummary: string;
  items: ControllerPatternSnippetItem[];
};

export type ControllerPatternEntry = {
  id: ControllerPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  comparisonTip: string;
  interactionNotes: string;
  accessibilityNotes: string;
  futureExtensions?: string;
  tags: string[];
  controllerFamily: ControllerPatternFamily;
  demoKind: ControllerDemoKind;
  snippets?: ControllerPatternSnippets;
};
