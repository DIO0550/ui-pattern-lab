export type TabsPatternId = 'underline-tabs' | 'pill-tabs' | 'boxed-tabs' | 'vertical-tabs';

export type TabsComparisonAxisId =
  | 'visual-emphasis'
  | 'layout-fit'
  | 'content-density'
  | 'interaction-model'
  | 'accessibility';

export type TabsDemoKind =
  | 'underline-overview'
  | 'pill-dashboard'
  | 'boxed-settings'
  | 'vertical-sections';

export type TabsPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'comparison'
  | 'accessibility';

export type TabsPatternMetadataItem = {
  label: string;
  value: string;
  tone: TabsPatternMetadataTone;
};

export type TabsCodeSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type TabsPatternSnippets = {
  snippetSummary: string;
  items: TabsCodeSnippetItem[];
};

export type TabsComparisonAxis = {
  id: TabsComparisonAxisId;
  title: string;
  description: string;
};

export type TabsPatternEntry = {
  id: TabsPatternId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  comparisonTip: string;
  accessibilityNotes: string;
  comparisonSummary: Record<TabsComparisonAxisId, string>;
  demoKinds: TabsDemoKind[];
  tags: string[];
  snippets?: TabsPatternSnippets;
};

export type TabsDemoProps = {
  density: 'list' | 'detail';
  demoKind: TabsDemoKind;
};
