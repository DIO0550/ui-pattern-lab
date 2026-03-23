import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {progressPatternEntries} from '@site/src/data/progressPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: '進捗の確実性',
    description:
      'known total なら linear / circular determinate、unknown total なら indeterminate / spinner / skeleton を選びます。',
  },
  {
    title: 'レイアウト保持',
    description: '最終レイアウトを保ちたいなら skeleton、置き換えてよいなら spinner や indeterminate bar が候補です。',
  },
  {
    title: '適用スコープ',
    description:
      'local wait、section busy、multi-step progress、single KPI status のどこを示すのかで最適なパターンが変わります。',
  },
  {
    title: 'motion 依存度',
    description: 'animation に頼りすぎず、reduced-motion 時も静止表現と visible text で意味を維持します。',
  },
  {
    title: '主要セマンティクス',
    description: '`aria-valuenow`、`aria-busy`、status text、`aria-current=\"step\"` をどこで使うかを先に決めます。',
  },
] as const;

const decisionFlowItems = [
  '複数ステップの現在地を見せたいなら `stepper-status-tracker`。',
  '完了率や件数が分かり、横方向の比較がしやすい方がよいなら `progress-bar-determinate`。',
  '完了率や件数が分かり、割合そのものを compact かつ大きく見せたいなら `circular-progress-determinate`。',
  'total は不明だがレイアウト骨組みを維持したいなら `skeleton-placeholder`。',
  'total は不明で、局所的な待機を compact に示したいなら `loading-spinner`。',
  'total は不明で、セクション全体や主要領域の処理中を示したいなら `progress-bar-indeterminate`。',
  '迷ったら `multi-step` → `known total` → `radial vs linear` → `preserve layout` → `scope` の順で切り分けます。',
] as const;

export default function ProgressPatternPageContent(): ReactNode {
  const patternCount = progressPatternEntries.length;
  const compareItems = progressPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/progress/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← プログレスカテゴリへ戻る', to: '/progress'}}
      summary={
        <>
          <Heading as="h2">どの progress パターンを選ぶか</Heading>
          <p>
            progress 表現は「動いて見えるか」ではなく、known total かどうか、linear と radial のどちらが情報の重みと合うか、
            レイアウトを保つか、local / section / multi-step のどこを示したいかで選びます。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            一覧では判断材料を短く比較し、詳細ページで preview、CSS / TSX サンプル、アクセシビリティ注記をまとめて確認できます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {progressPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">関連ページ</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/button/interactive-states">ボタン / interactive states</Link>
            </li>
            <li>
              <Link to="/selector/combobox-empty-and-loading-states">
                セレクタ / combobox empty and loading states
              </Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">プログレスの比較軸</Heading>
          <p className={styles.axisLead}>
            進捗率の確実性、レイアウト保持、適用スコープ、motion 依存度、主要セマンティクスの 5 軸に加え、
            known total では linear と circular のどちらが向くかを判断します。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            button 内の loading state は{' '}
            <Link to="/button/interactive-states">ボタン / interactive states</Link>
            、候補待ちと empty/loading
            の境界は{' '}
            <Link to="/selector/combobox-empty-and-loading-states">
              セレクタ / combobox empty and loading states
            </Link>{' '}
            を参照してください。progress カテゴリでは「待機の見せ方」そのものを比較します。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンを比較する</Heading>
          <p>
            一覧では {patternCount} パターンの代表 preview と判断メモだけを見比べ、詳細ページで 0% / 100% 境界、
            reduced-motion 方針、`aria-busy` や `aria-current="step"` の扱いを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
