import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';

import styles from './styles.module.css';

type ControlKind = 'checkbox' | 'radio' | 'switch' | 'select';

type MatrixColumn = {
  id: ControlKind;
  label: string;
  description: string;
};

type MatrixRow = {
  axis: string;
  values: Record<ControlKind, string>;
};

const matrixColumns = [
  {
    id: 'checkbox',
    label: 'Checkbox',
    description: '複数選択と確認入力の基本形',
  },
  {
    id: 'radio',
    label: 'Radio button',
    description: '候補の中から 1 つだけ選ぶ',
  },
  {
    id: 'switch',
    label: 'Switch',
    description: '即時に ON / OFF を切り替える',
  },
  {
    id: 'select',
    label: 'Select',
    description: '候補を圧縮して表示密度を保つ',
  },
] as const satisfies readonly MatrixColumn[];

const quickSummaryItems = [
  {
    title: 'Checkbox',
    description: '複数選択や確認入力を扱うときの第一候補です。',
  },
  {
    title: 'Radio',
    description: '常に 1 件だけ選ばせるなら selector 側で比較します。',
  },
  {
    title: 'Switch',
    description: '操作直後に状態が変わる単独設定向けです。',
  },
  {
    title: 'Select',
    description: '候補数が多く、初期表示の密度を優先するときに向きます。',
  },
] as const;

const matrixRows = [
  {
    axis: 'Selection model',
    values: {
      checkbox: '0 件以上を組み合わせる前提。未選択も成立しやすい。',
      radio: '常に 1 件だけ選ぶ。未選択を許さない場面向き。',
      switch: '単独設定の ON / OFF。候補比較には向かない。',
      select: '1 件選択を圧縮表示する。複数選択は別 UI が必要。',
    },
  },
  {
    axis: 'Immediate effect / submit timing',
    values: {
      checkbox: '送信前の確認や、まとめて反映するフォーム向き。',
      radio: '値は即決まるが、送信タイミングはフォーム全体に従う。',
      switch: '操作直後に状態を変える設定向き。',
      select: '開閉して 1 件選ぶぶん、選択まで 1 ステップ増える。',
    },
  },
  {
    axis: 'Mobile / touch fit',
    values: {
      checkbox: 'ラベル全体を押せば長文でも扱いやすい。',
      radio: '候補数が少なければ直接比較しやすい。',
      switch: '単独設定を素早く切り替える画面に向く。',
      select: '候補数が多くても初期表示密度を保てる。',
    },
  },
  {
    axis: 'Accessibility semantics',
    values: {
      checkbox: 'checked / mixed を伝えやすく、親子選択にも対応しやすい。',
      radio: '同一グループから 1 つ選ぶ semantics が明確。',
      switch: '現在状態を即時設定として読ませやすい。',
      select: '候補数や現在値を圧縮できるが、展開後の移動は増える。',
    },
  },
  {
    axis: 'Discoverability / cognitive load',
    values: {
      checkbox: '複数選択可能と未選択状態が見た目で伝わりやすい。',
      radio: '1 件だけ選ぶルールを理解しやすい。',
      switch: '即時反映は明快だが、確認入力には不向き。',
      select: '初期表示はすっきりするが、候補全体像は見えにくい。',
    },
  },
] as const satisfies readonly MatrixRow[];

export default function CheckboxPatternPageContent(): ReactNode {
  const compareItems = checkboxPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/checkbox/${entry.id}`,
  }));

  return (
    <PatternComparisonPageShell
      summary={
        <>
          <Heading as="h2">先に control の役割差を比べる</Heading>
          <p>
            checkbox だけでなく、radio button / switch / select とどう使い分けるべきかを先に整理してから個別パターンへ進みます。
          </p>
          <ul>
            <li>複数選択か、単一選択か、単独トグルか</li>
            <li>送信前の確認か、操作直後の反映か</li>
            <li>カード型にしても checkbox semantics を維持するか</li>
            <li>長いラベルとモバイルでの押しやすさ</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul>
            {checkboxPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p>
            一覧では比較判断を優先し、詳細ページで preview、設計メモ、CSS / TSX サンプルを常時展開で確認できます。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">checkbox / radio / switch / select を比較する</Heading>
          <p className={styles.axisLead}>
            まずは「選択可能数」「反映タイミング」「押しやすさ」の違いを短くつかみ、そのあと semantic table で判断を確認します。
          </p>

          <ul className={styles.quickSummaryList}>
            {quickSummaryItems.map((item) => (
              <li className={styles.quickSummaryItem} key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>

          <div className={styles.matrixWrapper}>
            <table className={styles.matrixTable}>
              <thead>
                <tr>
                  <th className={styles.axisHeader} scope="col">
                    比較軸
                  </th>
                  {matrixColumns.map((column) => (
                    <th className={styles.columnHeader} key={column.id} scope="col">
                      <span className={styles.columnTitle}>{column.label}</span>
                      <span className={styles.columnDescription}>{column.description}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr key={row.axis}>
                    <th className={styles.axisCell} scope="row">
                      {row.axis}
                    </th>
                    {matrixColumns.map((column) => (
                      <td className={styles.matrixCell} key={column.id}>
                        {row.values[column.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.matrixNote}>
            1 つの field value を選ぶ radio / native select / combobox は{' '}
            <Link to="/patterns/selector-designs">セレクタデザインパターン</Link>{' '}
            を参照してください。押下状態のトグル UI を見せたい場合は{' '}
            <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
            を参照してください。checkbox は送信前の確認や複数項目の一括管理に向きます。
          </p>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では比較メモだけを短く見比べ、詳細ページでカード型 UI や mixed state、preview、CSS / TSX サンプルを確認します。
          </p>
          <PatternCompareCardGrid items={compareItems} />
        </>
      }
    />
  );
}
