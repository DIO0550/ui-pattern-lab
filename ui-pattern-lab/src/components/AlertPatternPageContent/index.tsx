import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {alertPatternEntries} from '@site/src/data/alertPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    description:
      'info / success / warning / error / neutral は意味の分類です。背景色や影の強さとは分けて判断します。',
    title: 'severity は何を伝えるか',
  },
  {
    description:
      'base / outlined / elevated / compact は画面上の圧を調整するための style です。重要度そのものとは直交させます。',
    title: 'visual style の強さ',
  },
  {
    description:
      '本文だけ、action 付き、dismissible を分けると、Alert が通知なのか次の行動の入口なのかが明確になります。',
    title: 'behavior の責務',
  },
  {
    description:
      'toast は一時通知、Alert は文脈内に残る message です。見返す必要がある情報は Alert に寄せます。',
    title: '表示寿命',
  },
  {
    description:
      'フォーム全体、設定ブロック、危険操作の直前など、読むべき文脈の近くに置くと判断が途切れません。',
    title: '配置スコープ',
  },
] as const;

const decisionFlowItems = [
  '後から見返す必要がない短い通知なら toast を優先する。',
  'フォーム、設定、危険操作などの文脈に残すなら Alert を候補にする。',
  'まず info / success / warning / error / neutral の severity を決める。',
  '次に base / outlined / elevated / compact で画面上の強さを調整する。',
  'action button や close button が必要なら本文のみの Alert と別 variant として扱う。',
] as const;

/** Renders the alert compare page content. */
export default function AlertPatternPageContent(): ReactNode {
  const compareItems = alertPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/alert/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← アラートカテゴリへ戻る', to: '/alert'}}
      summary={
        <>
          <Heading as="h2">どの alert を選ぶか</Heading>
          <p>
            Alert はページ内に残る feedback です。severity は意味、visual style は見た目の強さ、behavior
            は操作や dismiss の有無として分けると、toast や dialog との境界が崩れにくくなります。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            detail page では base / outlined / elevated / compact / action / dismissible を 1 variant
            block : 1 code panel で分離し、preview と CSS / TSX サンプルを見比べられます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {alertPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">責務境界の参照先</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/button">ボタン</Link>
            </li>
            <li>
              <Link to="/controller">表示制御</Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">Alert の比較軸</Heading>
          <p className={styles.axisLead}>
            severity、visual style、behavior、表示寿命、配置スコープの 5 軸で整理すると、ページ内 feedback
            の役割を保ったまま使い分けられます。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            短時間だけ見せる通知は toast、ユーザーの確認をブロックする判断は dialog 側へ寄せます。Alert compare
            では「文脈内に残る message」を扱います。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では Alert の役割と比較メモを短く見比べ、detail page で severity ごとの preview とコードを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
