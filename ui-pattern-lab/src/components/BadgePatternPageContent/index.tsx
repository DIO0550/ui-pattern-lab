import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {badgePatternEntries} from '@site/src/data/badgePatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    description:
      'クリックや削除などの操作を持たせず、補足情報ラベルとして使うと badge の責務がぶれにくくなります。',
    title: '補足ラベルか操作要素か',
  },
  {
    description:
      'Filled / Outlined / Soft / Surface は、同じ情報でも視覚的な強さが異なります。画面の圧に合わせて選びます。',
    title: '見た目の強さ',
  },
  {
    description:
      '標準 / 主要 / 成功 / 警告 / エラー / 情報の色は意味づけの補助に使い、テキストでも内容が分かるようにします。',
    title: '色で何を補足するか',
  },
  {
    description:
      '0 / 8 / 24 / 99+ のような桁数差を前提にし、数字が増えても 1 行 compact を保てるかを確認します。',
    title: '件数表示の収まり',
  },
  {
    description:
      '本文より軽い情報として添えるため、カード、一覧、テーブル周辺で主役を奪わない面積とコントラストに保ちます。',
    title: '密度と可読性',
  },
] as const;

const decisionFlowItems = [
  '押せる要素に見せたいなら badge ではなく button / icon action を優先する。',
  '本文より軽い補足ラベルとして添えたいなら badge を候補にする。',
  '意味を強く伝えたいなら Filled、軽く添えたいなら Soft / Surface、境界だけ示したいなら Outlined を選ぶ。',
  '数字だけで意味が伝わらない場合は、近くの見出しやテキストと組み合わせる。',
  '長い文言や複数操作を詰め込みたくなった時点で badge の責務を見直す。',
] as const;

/** Renders the badge compare page content. */
export default function BadgePatternPageContent(): ReactNode {
  const compareItems = badgePatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/badge/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← バッジカテゴリへ戻る', to: '/badge'}}
      summary={
        <>
          <Heading as="h2">どの badge variation を選ぶか</Heading>
          <p>
            バッジは「強い操作」ではなく「軽い補足情報」を置くための小さな surface です。まずは
            variant の圧、色の意味、件数表示の収まりを切り分けると、button や tag button との境界が崩れにくくなります。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            detail page では Filled / Outlined / Soft / Surface を 1 variant block : 1 code panel
            で分離し、プレビューと CSS / TSX サンプルを見比べられます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {badgePatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">責務境界の参照先</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/button">ボタン</Link>
            </li>
            <li>
              <Link to="/button/icon-and-compound-actions">アイコン・複合アクション</Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">バッジの比較軸</Heading>
          <p className={styles.axisLead}>
            補足ラベルか操作要素か、variant の圧、色の意味、件数表示の収まり、密度と可読性の 5
            軸で整理すると、badge を無理なく配置できます。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            押下・削除・メニュー展開などの操作を持たせたい場合は <Link to="/button">ボタン</Link>{' '}
            側へ寄せてください。Badge compare では「補足情報ラベルをどう軽く見せるか」に絞って扱います。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧ではバッジの役割と比較メモを短く見比べ、detail page で variant ごとの preview とコードを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
