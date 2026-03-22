import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: '1行省略',
    description: 'ラベル列や通知一覧など、行の高さを一定に保ちたい場面で密度を優先します。',
  },
  {
    title: '複数行 clamp',
    description: '2〜3行の文脈を残しつつ、カード一覧の高さ差を抑えたいときに向きます。',
  },
  {
    title: '全文補足',
    description: '要約と原文の両方が重要なときは、近接した補足面で全文到達性を確保します。',
  },
  {
    title: 'アクセシブルな開閉',
    description: 'hover 依存を避け、必要なときだけキーボードでも全文を開ける構成にします。',
  },
] as const;

export default function EllipsisDisplayPatternPageContent(): ReactNode {
  const compareItems = ellipsisDisplayPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/ellipsis-display/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      summary={
        <>
          <Heading as="h2">先に省略ルールを比べる</Heading>
          <p>
            table 専用の `cell-truncation` を置き換えるのではなく、list / card / summary /
            disclosure を横断する generic な省略表示ルールを比較します。
          </p>
          <ul>
            <li>固定幅でも可変幅でも 1 行のまま密度を保つ基本形</li>
            <li>2〜3 行の文脈を残す複数行 clamp</li>
            <li>要約の近くに全文を補足する構成</li>
            <li>キーボードで開閉できる disclosure</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul>
            {ellipsisDisplayPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p>
            一覧では判断軸を短く見比べ、詳細ページでは preview と CSS / TSX 例を常時展開で確認できます。
            table 文脈の具体例は <Link to="/table/cell-truncation">cell-truncation</Link>{' '}
            に残しています。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">省略表示の比較軸</Heading>
          <p className={styles.axisLead}>
            まずは「どこまで見せるか」と「全文へどう到達させるか」を整理し、必要な詳細パターンだけを読みます。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            長文セルを table 密度の観点で扱う具体例は{' '}
            <Link to="/table/cell-truncation">/table/cell-truncation</Link>{' '}
            を参照してください。このページでは generic な意思決定ガイドに絞っています。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では全文到達方法の違いを短く見比べ、詳細ページで preview、課題・解決方法、CSS / TSX 例を深掘りします。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
