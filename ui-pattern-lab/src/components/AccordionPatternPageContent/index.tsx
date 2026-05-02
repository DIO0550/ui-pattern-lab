import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {accordionPatternEntries} from '@site/src/data/accordionPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    description:
      '常に 1 項目だけを開くのか、複数項目を同時に開けるのかで、読む集中度と比較しやすさが変わります。',
    title: '開閉モデル',
  },
  {
    description:
      '見出しは常に読める状態にし、本文だけを開閉します。見出しが曖昧だと隠れた情報の存在に気づきにくくなります。',
    title: '見出しの情報量',
  },
  {
    description:
      'flush、カード型、FAQ 型など、周囲の surface に合わせて境界の強さと余白を調整します。',
    title: '境界と余白',
  },
  {
    description:
      '開閉状態は aria-expanded とアイコンで示し、panel との対応を aria-controls / aria-labelledby で保ちます。',
    title: '状態と支援技術',
  },
  {
    description:
      '本文が長すぎる場合や操作が多い場合は、accordion ではなく詳細ページや tabs への切り分けも検討します。',
    title: '隠しすぎの回避',
  },
] as const;

const decisionFlowItems = [
  '同じ粒度の項目を縦に並べたいなら accordion を候補にする。',
  '読む対象を 1 つに絞りたいなら単一開閉を選ぶ。',
  '複数項目を比較・参照したいなら複数開閉を選ぶ。',
  '設定やカード内では contained、質問回答では FAQ 型の余白に寄せる。',
  '本文内にさらに複雑な操作を入れたい場合はページ分割や tabs を検討する。',
] as const;

/** Renders the accordion compare page content. */
export default function AccordionPatternPageContent(): ReactNode {
  const compareItems = accordionPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/accordion/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← アコーディオンカテゴリへ戻る', to: '/accordion'}}
      summary={
        <>
          <Heading as="h2">どの accordion variation を選ぶか</Heading>
          <p>
            Accordion は、同じ階層の情報を見出し単位で折りたたむ disclosure UI です。
            開閉モデル、見出しの情報量、境界の強さを切り分けると、FAQ や設定画面で情報を隠しすぎず整理できます。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            detail page では単一開閉 / 複数開閉 / カード型 / FAQ 型を 1 variant block : 1 code panel
            で分離し、preview と TSX / CSS サンプルを見比べられます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {accordionPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">近い責務の参照先</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/tabs">タブ</Link>
            </li>
            <li>
              <Link to="/ellipsis-display">表示制限</Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">アコーディオンの比較軸</Heading>
          <p className={styles.axisLead}>
            開閉モデル、見出しの情報量、境界と余白、状態と支援技術、隠しすぎの回避という 5
            軸で整理すると、accordion の適用範囲を判断しやすくなります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            同じページ内の view 全体を切り替える場合は <Link to="/tabs">タブ</Link>、本文の省略や全文補足が主題なら{' '}
            <Link to="/ellipsis-display">表示制限</Link> 側も確認してください。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では accordion の役割を短く確認し、detail page で variant ごとの preview とコードを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
