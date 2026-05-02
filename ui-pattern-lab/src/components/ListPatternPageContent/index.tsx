import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {listPatternEntries} from '@site/src/data/listPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: 'style',
    description:
      'plain / divided / card のどれで項目境界を示すかを決めます。枠は情報量と項目の独立性が必要なときだけ強めます。',
  },
  {
    title: 'item content',
    description:
      'title、description、avatar、status、trailing meta の優先順位を決め、1 行で読ませる情報と補足情報を分けます。',
  },
  {
    title: 'behavior',
    description:
      'clickable / selectable / draggable は見た目ではなく振る舞いです。必要な role、focus、hit area を別途設計します。',
  },
  {
    title: 'trailing',
    description:
      'trailing meta は状態や時刻、trailing action は操作です。行末に置くものの意味を混同しないようにします。',
  },
] as const;

export default function ListPatternPageContent(): ReactNode {
  const compareItems = listPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/list/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{to: '/list', label: 'リストカテゴリへ戻る'}}
      summary={
        <>
          <Heading as="h2">リストの判断軸を整理する</Heading>
          <p>
            リストは列比較のための table ではなく、項目単位で読ませる data display です。
            まず style、item content、behavior を分けて考えると、枠線や行末要素の意味が整理しやすくなります。
          </p>
          <ul>
            <li>style は plain / divided / card の視覚的なまとまり方</li>
            <li>item content はタイトル、補足、状態、時刻、末尾情報の優先順位</li>
            <li>behavior は clickable / selectable / draggable などの操作責務</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul>
            {listPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p>
            detail ページでは 1 variant block : 1 code panel の形で、preview と CSS / TSX
            サンプルを対応づけています。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">リストの比較軸</Heading>
          <p className={styles.axisLead}>
            見た目、項目内容、振る舞いを先に分けると、message list / settings list / notification list
            のどれに近いかを判断しやすくなります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            列見出しを使って複数フィールドを横比較する場合は{' '}
            <Link to="/table">テーブル</Link>{' '}
            を使います。リストでは trailing action と trailing meta を混同せず、操作可能な項目だけに明確な
            focus-visible と accessible name を与えます。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            まずは 3 種の見せ方を比較し、detail ページで preview、設計メモ、CSS / TSX サンプルを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
