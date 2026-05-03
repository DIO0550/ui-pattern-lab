import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {
  type TodoPatternCategoryId,
  todoPatternCategoryMap,
} from '@site/src/data/todoPatternData';

type Props = {
  categoryId: TodoPatternCategoryId;
};

/** Renders the comparison page for a TODO-promoted pattern category. */
export default function TodoPatternComparisonContent({categoryId}: Props): ReactNode {
  const category = todoPatternCategoryMap[categoryId];

  return (
    <PatternComparisonPageShell
      axisSection={
        <section className="container margin-bottom--xl">
          <PatternComparisonAxisGrid items={category.axes} layout="cards" />
        </section>
      }
      backLink={{to: `/${category.slug}`, label: `${category.label}カテゴリへ戻る`}}
      listSection={
        <PatternCompareCardGrid
          items={category.entries.map((entry) => ({
            id: entry.id,
            summary: entry.summary,
            tags: [...entry.tags],
            title: entry.title,
            to: `/${category.slug}/${entry.id}`,
          }))}
        />
      }
      summary={
        <>
          <Heading as="h1">{category.label}パターン比較</Heading>
          <p>{category.summary}</p>
        </>
      }
      summaryAside={
        <ul>
          {category.scope.map((scope) => (
            <li key={scope}>{scope}</li>
          ))}
        </ul>
      }
    />
  );
}
