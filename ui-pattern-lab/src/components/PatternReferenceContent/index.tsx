import type {ReactNode} from 'react';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceNote,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';

type PatternReferenceSnippetItem = {
  id: string;
  label: string;
  language: string;
  code: string;
  note?: string;
};

type PatternReferenceSnippets = {
  snippetSummary: string;
  items: readonly PatternReferenceSnippetItem[];
};

type Props = {
  id: string;
  title: string;
  summary: string;
  preview: ReactNode;
  notes: readonly ButtonReferenceNote[];
  snippets?: PatternReferenceSnippets;
  guides?: readonly ButtonReferenceGuide[];
  variantNote?: string;
};

/** Renders a single-pattern reference view using the shared split preview/code layout. */
export default function PatternReferenceContent({
  id,
  title,
  summary,
  preview,
  notes,
  snippets,
  guides,
  variantNote,
}: Props): ReactNode {
  const variants = [
    {
      id,
      name: title,
      description: summary,
      preview,
      tabs:
        snippets?.items.map((item) => ({
          id: item.id,
          label: item.label,
          code: item.code,
          language: item.language,
          note: item.note,
        })) ?? [],
    },
  ] satisfies readonly ButtonReferenceVariant[];

  return (
    <ButtonReferenceLayout
      guides={guides}
      notes={notes}
      variantNote={variantNote ?? snippets?.snippetSummary}
      variants={variants}
    />
  );
}
