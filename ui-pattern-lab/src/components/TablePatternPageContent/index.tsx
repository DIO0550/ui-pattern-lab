import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import TablePatternGallery from '@site/src/components/TablePatternGallery';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: 'responsive stack',
    description: '1件ずつ詳細を読む場面で、狭い画面でもラベルと値の対応を保ちます。',
  },
  {
    title: '横スクロール',
    description: '列比較の正確さを優先し、全列を保ったまま必要な範囲だけ横移動で見せます。',
  },
  {
    title: '固定ヘッダー',
    description: '行数が多い表でも、縦スクロール中に列の意味を見失いにくくします。',
  },
  {
    title: '省略表示',
    description: '長文セルで行高を暴れさせず、一覧密度を保ったまま別面で全文を補足します。',
  },
] as const;

export default function TablePatternPageContent(): ReactNode {
  return (
    <PatternComparisonPageShell
      summary={
        <>
          <Heading as="h2">先に見せ方の違いを整理する</Heading>
          <p>
            table そのものの装飾ではなく、情報量の多い表をどう見せるかという設計パターンに絞って比較します。
          </p>
          <ul>
            <li>狭い画面でも意味を失わない見せ方</li>
            <li>列を省かずに比較性を保つ方法</li>
            <li>長い表でヘッダーの文脈を保つ方法</li>
            <li>長文セルを崩さずに扱う方法</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul>
            {tablePatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p>
            一覧では比較要点を先に見て、詳細ページで課題・使いどころ・アクセシビリティ上の注意点とコード例を読み比べられます。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">quick compare</Heading>
          <p className={styles.axisLead}>
            まずは一覧性、比較精度、モバイル適性、長文セル対応の違いを短く整理してからパターン一覧に入ります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="bullets" />
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧ではデモと比較要点を先に見比べ、詳細ページで課題、解決方法、使いどころ、CSS / コード例を確認します。
          </p>
          <TablePatternGallery density="list" entries={tablePatternEntries} />
        </>
      }
    />
  );
}
