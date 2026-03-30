import type {ReactNode} from 'react';
import ButtonReferenceLayout, {
  type ButtonReferenceCodeTab,
  type ButtonReferenceGuide,
  type ButtonReferenceNote,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';

export type PatternReferenceSnippetItem = {
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

type SharedProps = {
  notes: readonly ButtonReferenceNote[];
  guides?: readonly ButtonReferenceGuide[];
  variantNote?: string;
};

type SingleVariantProps = {
  id: string;
  title: string;
  summary: string;
  preview: ReactNode;
  snippets?: PatternReferenceSnippets;
  variants?: never;
};

type ExplicitVariantsProps = {
  variants: readonly ButtonReferenceVariant[];
  id?: never;
  title?: never;
  summary?: never;
  preview?: never;
  snippets?: never;
};

type Props = SharedProps & (SingleVariantProps | ExplicitVariantsProps);

/** Converts generic snippet items into code tabs for the shared reference layout. */
export function buildReferenceCodeTabs(
  items: readonly PatternReferenceSnippetItem[] | undefined,
): ButtonReferenceCodeTab[] {
  return (
    items?.map((item) => ({
      id: item.id,
      label: item.label,
      code: item.code,
      language: item.language,
      note: item.note,
    })) ?? []
  );
}

/** Renders a single-pattern reference view using the shared split preview/code layout. */
export default function PatternReferenceContent(props: Props): ReactNode {
  const {guides, notes, variantNote} = props;
  const variants =
    'variants' in props
      ? props.variants
      : ([
          {
            id: props.id,
            name: props.title,
            description: props.summary,
            preview: props.preview,
            tabs: buildReferenceCodeTabs(props.snippets?.items),
          },
        ] satisfies readonly ButtonReferenceVariant[]);
  const resolvedVariantNote =
    variantNote ?? ('snippets' in props ? props.snippets?.snippetSummary : undefined);

  return (
    <ButtonReferenceLayout
      guides={guides}
      notes={notes}
      variantNote={resolvedVariantNote}
      variants={variants}
    />
  );
}
