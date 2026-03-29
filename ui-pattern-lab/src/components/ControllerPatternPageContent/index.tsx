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
    title: '連続値か離散値か',
    description:
      'view mode や section 切り替えではなく、price range や volume のような連続値を動かしたいなら range slider の候補が強くなります。',
  },
  {
    title: '候補数と粒度',
    description:
      '候補が 2〜4 個で同じ view の見え方だけを切り替えるなら segmented switch、section 単位で panel semantics が必要なら tabs、複数 control を束ねるなら toolbar が向きます。',
  },
  {
    title: '即時反映と視覚フィードバック',
    description:
      '押した直後に local UI state と結果 surface が切り替わるのか、drag 中に一覧や preview が連続更新されるのかを先に決めます。',
  },
  {
    title: 'ドラッグ操作の必要性',
    description:
      'pointer でつまんで動かす体験が重要か、ボタンや select の方が理解しやすいかで、continuous adjustment の選択が変わります。',
  },
  {
    title: '既存カテゴリとの境界',
    description:
      'button の単発 action、selector のフォーム入力、tabs の panel switch、table のレイアウトとは責務を分けて扱います。',
  },
  {
    title: '主要セマンティクス',
    description:
      '`aria-pressed` と group label、`role=\"tablist\"`、`aria-current=\"page\"`、slider label など、control ごとの核となる属性が異なります。',
  },
] as const;

const decisionFlowItems = [
  '同一 view の local UI state を 2〜4 候補から即時に切り替えるなら `segmented-view-switcher`。',
  '同じページ枠の panel / context を切り替え、`tablist` / `tabpanel` や arrow key を前提にするなら `tabs-inline-panel-switcher`。',
  '一覧全体の並び替え・絞り込み・active filter をまとめて扱うなら `sort-filter-toolbar`。',
  '結果セットの位置と表示件数を継続的に制御するなら `pagination-and-page-size-controller`。',
  '厳密な数値入力が不要で、視覚的なフィードバックを見ながら連続値やしきい値を drag で調整したいなら `range-slider-filter`。',
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
            のどれに当たるかを先に決め、同じ view の local UI state をその場で切り替えるのか、panel semantics や永続化まで含めるのかを切り分けると、button や selector、tabs との境界も整理しやすくなります。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            一覧では判断材料を短く比較し、detail page で preview demo、CSS / TSX
            サンプル、local UI state としての scope、interaction / accessibility 注記をまとめて確認できます。
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
            連続値かどうか、候補数、即時反映と視覚フィードバック、ドラッグ操作の必要性、既存カテゴリとの境界、主要セマンティクスの
            6 軸で比べると、controller 系 UI の責務がぶれにくくなります。
          </p>
          <PatternComparisonAxisGrid items={axisItems} layout="cards" />
          <p className={styles.axisNote}>
            radio / select / combobox のようなフォーム値入力は{' '}
            <Link to="/selector">セレクタ</Link>、複数選択の input は{' '}
            <Link to="/checkbox">チェックボックス</Link>、一覧レイアウトそのものは{' '}
            <Link to="/table">テーブル</Link> を参照してください。表示制御カテゴリでは「view state
            をその場でどう変えるか」を比較し、panel switch が必要なら tabs、URL 同期や永続化が主体なら別の state
            管理責務へ切り分けます。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンを比較する</Heading>
          <p>
            一覧では {patternCount} パターンの代表 preview と比較メモを見比べ、detail page で
            state 表現、keyboard support、boundary note、スコープ外の前提を深掘りします。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
