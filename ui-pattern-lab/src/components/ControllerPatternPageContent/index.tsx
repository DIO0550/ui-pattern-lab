import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {controllerPatternEntries} from '@site/src/data/controllerPatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: '何を切り替えるか',
    description:
      'view mode、inline panel、dataset scope、連続値のどれを変えたいかで候補が大きく変わります。',
  },
  {
    title: '候補数と粒度',
    description:
      '候補が 2〜4 個なら segmented switch、section 単位なら tabs、複数 control を束ねるなら toolbar が向きます。',
  },
  {
    title: '即時反映の強さ',
    description:
      '押した直後に画面が切り替わるか、一覧全体へ効くか、drag で連続更新するかを先に決めます。',
  },
  {
    title: '既存カテゴリとの境界',
    description:
      'button の単発 action、selector のフォーム入力、table のレイアウトとは責務を分けて扱います。',
  },
  {
    title: '主要セマンティクス',
    description:
      '`aria-pressed`、`role=\"tablist\"`、`aria-current=\"page\"`、slider label など、control ごとの核となる属性が異なります。',
  },
] as const;

const decisionFlowItems = [
  '同一 view の mode を 2〜4 候補から切り替えるなら `segmented-view-switcher`。',
  '同じページ枠の panel / context を切り替えるなら `tabs-inline-panel-switcher`。',
  '一覧全体の並び替え・絞り込み・active filter をまとめて扱うなら `sort-filter-toolbar`。',
  '結果セットの位置と表示件数を継続的に制御するなら `pagination-and-page-size-controller`。',
  '連続値やしきい値を drag で調整したいなら `range-slider-filter`。',
  '狭い範囲の数値を安全に増減したいなら `quantity-stepper-control`。',
  '迷ったら「view switch → dataset scope → continuous adjustment → 既存カテゴリとの境界」の順で切り分けます。',
] as const;

export default function ControllerPatternPageContent(): ReactNode {
  const patternCount = controllerPatternEntries.length;
  const compareItems = controllerPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/controller/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      backLink={{label: '← 表示制御カテゴリへ戻る', to: '/controller'}}
      summary={
        <>
          <Heading as="h2">どの controller pattern を選ぶか</Heading>
          <p>
            controller 系 UI は「押せるかどうか」ではなく、何を切り替える control なのかで選びます。
            mode switch、inline panel、dataset scope、continuous adjustment
            のどれに当たるかを先に決めると、button や selector との境界も整理しやすくなります。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            一覧では判断材料を短く比較し、detail page で lightweight demo、CSS / TSX
            サンプル、interaction / accessibility 注記をまとめて確認できます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {controllerPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">境界を確認するカテゴリ</Heading>
          <ul className={styles.asideList}>
            <li>
              <Link to="/button">ボタン</Link>
            </li>
            <li>
              <Link to="/selector">セレクタ</Link>
            </li>
            <li>
              <Link to="/checkbox">チェックボックス</Link>
            </li>
            <li>
              <Link to="/progress">プログレス</Link>
            </li>
            <li>
              <Link to="/table">テーブル</Link>
            </li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">表示制御の比較軸</Heading>
          <p className={styles.axisLead}>
            切り替える対象、候補数、即時反映の粒度、既存カテゴリとの境界、主要セマンティクスの 5
            軸で比べると、controller 系 UI の責務がぶれにくくなります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            radio / select / combobox のようなフォーム値入力は{' '}
            <Link to="/selector">セレクタ</Link>、複数選択の input は{' '}
            <Link to="/checkbox">チェックボックス</Link>、一覧レイアウトそのものは{' '}
            <Link to="/table">テーブル</Link> を参照してください。表示制御カテゴリでは「view state
            をその場でどう変えるか」を比較します。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンを比較する</Heading>
          <p>
            一覧では {patternCount} パターンの代表 preview と比較メモを見比べ、detail page で
            state 表現、disabled、keyboard support、boundary note を深掘りします。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
