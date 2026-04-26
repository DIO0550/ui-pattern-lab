export type PaginationPatternId = 'page-numbers' | 'load-more' | 'infinite-scroll';

export type PaginationComparisonAxisId =
  | 'interaction-model'
  | 'data-fetching'
  | 'ux-fit'
  | 'accessibility'
  | 'performance';

export type PaginationDemoKind =
  | 'page-numbers-search'
  | 'page-numbers-table'
  | 'page-numbers-admin-list'
  | 'load-more-demo'
  | 'infinite-scroll-demo';

export type PaginationPreviewState =
  | 'first-page'
  | 'middle-page'
  | 'last-page'
  | 'after-size-change'
  | 'empty'
  | 'single-page'
  | 'loading'
  | 'error'
  | 'end';

export type PaginationAppendStatus = 'ready' | 'loading' | 'error' | 'end';

export type PaginationPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'comparison'
  | 'accessibility';

export type PaginationPatternMetadataItem = {
  label: string;
  value: string;
  tone: PaginationPatternMetadataTone;
};

export type PaginationCodeSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type PaginationPatternSnippets = {
  snippetSummary: string;
  items: PaginationCodeSnippetItem[];
};

export type PaginationComparisonAxis = {
  id: PaginationComparisonAxisId;
  title: string;
  description: string;
};

export type PaginationPatternEntry = {
  id: PaginationPatternId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  comparisonTip: string;
  accessibilityNotes: string;
  comparisonSummary: Record<PaginationComparisonAxisId, string>;
  demoKinds: PaginationDemoKind[];
  exposesPageSizeControl: boolean;
  tags: string[];
  snippets?: PaginationPatternSnippets;
};

export type PaginationDemoProps = {
  density: 'list' | 'detail';
  previewState?: PaginationPreviewState;
};
