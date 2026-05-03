import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {avatarPatternEntries} from '@site/src/data/avatarPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    description:
      '24 / 32 / 40 / 56px など用途別サイズを固定し、画像でも fallback でも同じ領域を維持します。',
    title: 'Size',
  },
  {
    description:
      '円形、角丸、スクエアの shape はブランドや情報密度に合わせます。人物表示では円形を基本にします。',
    title: 'Shape',
  },
  {
    description:
      'image / initials / icon fallback を必ず用意し、画像読み込み失敗や匿名主体でも表示崩れを防ぎます。',
    title: 'Fallback',
  },
  {
    description:
      'status dot や badge は avatar 本体に含めず、オンライン状態や未読などの付随情報として整理します。',
    title: 'Indicator',
  },
  {
    description:
      '複数主体は avatar 本体の variant ではなく、group composition として表示上限や +N を決めます。',
    title: 'Composition',
  },
] as const;

const decisionFlowItems = [
  '主体を 1 人だけ示すなら単体アバターを使う。',
  '画像がない、または失敗する前提で initials / icon fallback を必ず定義する。',
  '複数人を示すなら avatar group として表示上限、重なり幅、summary を決める。',
  '名前や役割まで読ませたいならラベル付きアバターへ切り替える。',
  '状態を伝える場合は avatar 本体ではなく indicator / badge として近接配置する。',
] as const;

/** Renders the avatar compare page content. */
export default function AvatarPatternPageContent(): ReactNode {
  const compareItems = avatarPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/avatar/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← アバターカテゴリへ戻る', to: '/avatar'}}
      summary={
        <>
          <Heading as="h2">どの avatar pattern を選ぶか</Heading>
          <p>
            Avatar は人物、組織、Bot などの主体を小さな視覚要素で表す data display です。単体表示、
            group composition、ラベル付き表示を分けると、一覧やコメント欄の情報階層が安定します。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            detail page では各 variant を 1 variant block : 1 code panel で分離し、画像失敗時の
            fallback と accessible label の note も確認できます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {avatarPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">近いカテゴリ</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/list">リスト</Link>
            </li>
            <li>
              <Link to="/badge">バッジ</Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">アバターの比較軸</Heading>
          <p className={styles.axisLead}>
            size / shape / fallback / indicator / composition の 5 軸で整理すると、avatar
            が主体表示なのか、状態表示なのか、複数人表示なのかを切り分けやすくなります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            status dot や badge は avatar 本体ではなく付随要素として扱います。件数や状態の視覚表現は{' '}
            <Link to="/badge">バッジ</Link> 側も参照してください。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では avatar の責務と使いどころを短く見比べ、detail page で variant ごとの preview とコードを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
