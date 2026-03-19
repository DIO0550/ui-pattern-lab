import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CheckboxPatternGallery from '@site/src/components/CheckboxPatternGallery';
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

const matrixRows = [
  {
    axis: 'Selection model',
    values: {
      checkbox: '0 件以上を自由に組み合わせられる。未選択のままでも成立しやすい。',
      radio: '常に 1 件だけを選ぶ。未選択を許さない前提に向く。',
      switch: '単独設定の ON / OFF。複数候補の列挙には向かない。',
      select: '1 件選択が基本。複数選択は別 UI として設計負荷が増える。',
    },
  },
  {
    axis: 'Immediate effect / submit timing',
    values: {
      checkbox: '送信前の確認やフォーム入力に向く。まとめて反映しやすい。',
      radio: '選択時点で値は決まるが、送信タイミングはフォーム全体に従う。',
      switch: '操作した瞬間に状態が切り替わる文脈と相性が良い。',
      select: '選択後に確定するが、候補確認のための開閉ステップが入る。',
    },
  },
  {
    axis: 'Mobile / touch fit',
    values: {
      checkbox: 'ラベル全体をタップ領域に含めれば長文でも扱いやすい。',
      radio: '単一選択の候補数が少ないときはモバイルでも分かりやすい。',
      switch: '単独設定の切り替えを素早く行う画面に向く。',
      select: '候補数が多いときは一覧密度を保てるが、開閉操作が増える。',
    },
  },
  {
    axis: 'Accessibility semantics',
    values: {
      checkbox: 'フォーム入力として checked / mixed を伝えやすい。親子選択にも対応できる。',
      radio: '同一グループから 1 つを選ぶ semantics が明確。',
      switch: 'ON / OFF の現在状態を即時設定として読ませたいときに明確。',
      select: '候補数や現在選択を圧縮できるが、展開後の移動コストが増える。',
    },
  },
  {
    axis: 'Discoverability / cognitive load',
    values: {
      checkbox: '複数選択可能と未選択状態が見た目だけで伝わりやすい。',
      radio: '選択可能数が 1 件だと理解しやすい。',
      switch: '設定が今すぐ変わると分かりやすいが、確認入力には不向き。',
      select: '初期表示はすっきりするが、候補の全体像は見えにくい。',
    },
  },
] as const satisfies readonly MatrixRow[];

export default function CheckboxPatternPageContent(): ReactNode {
  return (
    <div className={styles.root}>
      <section className={`container margin-vert--xl ${styles.introSection}`}>
        <div className={styles.heroGrid}>
          <div className={styles.introCopy}>
            <Heading as="h2">このページで比較できること</Heading>
            <p>
              ここでは、checkbox そのものの見た目ではなく、radio button /
              switch / select とどう使い分けるべきか、という判断軸を先に整理します。
              そのうえで、個別パターンごとに preview、設計メモ、CSS / TSX
              サンプルを並べて参照できます。
            </p>
            <ul className={styles.bulletList}>
              <li>複数選択か、単一選択か、単独トグルか</li>
              <li>送信前の確認か、操作直後の反映か</li>
              <li>長いラベルとモバイルでの押しやすさ</li>
              <li>checked / mixed / error を支援技術にどう伝えるか</li>
              <li>候補の見えやすさと認知負荷のバランス</li>
            </ul>
          </div>

          <aside className={styles.summaryCard}>
            <Heading as="h3">初回収録パターン</Heading>
            <ul className={styles.patternList}>
              {checkboxPatternEntries.map((entry) => (
                <li key={entry.id}>{entry.title}</li>
              ))}
            </ul>
            <p className={styles.summaryNote}>
              一覧では比較マトリクスと全パターンの preview をまとめて見られます。詳細ページでは
              CSS / TSX サンプルと comparisonTip を常時展開で確認できます。
            </p>
          </aside>
        </div>
      </section>

      <section className={`container margin-bottom--xl ${styles.matrixSection}`}>
        <Heading as="h2">checkbox / radio / switch / select を比較する</Heading>
        <p className={styles.matrixLead}>
          まずは「選択可能数」「反映タイミング」「モバイルでの押しやすさ」の違いを横断で確認し、
          checkbox を選ぶべき理由を明確にします。
        </p>
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
          押下状態のトグル UI を見せたい場合は{' '}
          <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
          を参照してください。checkbox は送信前の確認や複数項目の一括管理に向きます。
        </p>
      </section>

      <section className="container margin-bottom--xl">
        <Heading as="h2">パターンを比較する</Heading>
        <p className={styles.compareLead}>
          下のカードから、各パターンの preview、設計メモ、CSS / TSX サンプルをまとめて確認できます。
          一覧ではサンプルを折りたたみ、詳細ページでは常時展開で参照します。
        </p>
        <CheckboxPatternGallery density="list" entries={checkboxPatternEntries} />
      </section>
    </div>
  );
}
