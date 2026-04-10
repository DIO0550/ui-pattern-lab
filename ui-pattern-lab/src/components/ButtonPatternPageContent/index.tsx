import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: '優先順位',
    description: 'primary を 1 つに絞り、secondary / tertiary / ghost は補助操作として段階的に弱めます。',
  },
  {
    title: '状態設計',
    description: 'focus-visible を消さず、disabled と loading を別の意味として扱い、再実行防止も含めて設計します。',
  },
  {
    title: 'グルーピング',
    description: '関連操作を connected / separated / split のどれで束ねるか、toggle group と action group の責務を分けて設計します。',
  },
  {
    title: '余白・サイズ',
    description: 'compact / default / comfortable で min-height、padding、icon gap を連動させて整合を取ります。',
  },
  {
    title: 'アクセシビリティ',
    description: 'icon-only の accessible name、toggle の `aria-pressed`、danger の明示ラベルを欠かさず扱います。',
  },
] as const;

export default function ButtonPatternPageContent(): ReactNode {
  const compareItems = buttonPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/button/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      summary={
        <>
          <Heading as="h2">先に比較軸を整理する</Heading>
          <p>
            ボタンの見た目そのものではなく、主行動の強さ、グルーピング、状態差分、危険操作、
            icon-only、toggle、余白設計を横断で比較します。
          </p>
          <ul>
            <li>主行動と補助行動の優先順位</li>
            <li>関連操作を group / split / toggle でどこまで束ねるか</li>
            <li>hover / focus-visible / disabled / loading の扱い分け</li>
            <li>destructive / warning / cancel の危険度設計</li>
            <li>padding、min-height、icon gap、touch target の基準</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul>
            {buttonPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p>
            一覧では比較要点を短く見比べ、詳細ページでは preview と CSS / TSX サンプルを常時展開で確認できます。
            ボタングループの境界設計と、余白・サイズの詳細ルールは各 detail ページを正とします。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">ボタンの比較軸</Heading>
          <p className={styles.axisLead}>
            まずは強調度、グルーピング、状態設計の違いを短く整理し、どのパターンを詳細で読むべきかを先に決めます。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            フォーム入力として 1 つの値を選ぶ radio / native select / combobox は{' '}
            <Link to="/patterns/selector-designs">セレクタデザインパターン</Link>{' '}
            を参照してください。button-group は複数 action のまとまりを扱い、button / toggle
            は押した瞬間に状態や表示モードが変わる UI を扱います。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では各パターンの要点だけを短く見比べ、詳細ページで状態差分や preview、CSS / TSX サンプルを掘り下げます。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
