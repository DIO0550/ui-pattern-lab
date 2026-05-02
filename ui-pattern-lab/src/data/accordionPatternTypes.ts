export type AccordionPatternEntryId = 'disclosure-accordion';

export type AccordionPatternVariantId = 'single' | 'multiple' | 'contained' | 'faq';

export type AccordionPatternSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

export type AccordionPatternSnippets = {
  snippetSummary: string;
  items: AccordionPatternSnippetItem[];
};

export type AccordionPatternEntry = {
  id: AccordionPatternEntryId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string;
  layoutNotes: string;
  stateNotes: string;
  accessibilityNotes: string;
  tags: string[];
};
