import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import TabsPatternGallery from '@site/src/components/TabsPatternGallery';
import {tabsComparisonAxes, tabsPatternEntries} from '@site/src/data/tabsPatternEntries';

import styles from './styles.module.css';

const decisionFlowItems = [
  '本文の流れを崩さず軽く切り替えるなら `下線型タブ`。',
  '少数ビューで現在選択を強く読ませたいなら `ピル型タブ`。',
  '設定やフォーム区画の境界を明確にしたいなら `ボックス型タブ`。',
  '長いラベルや中程度のセクション数を desktop で扱うなら `縦型タブ`。',
  'ページ遷移、form value 選択、toggle button と混同しないことを先に確認します。',
] as const;

export default function TabsPatternPageContent(): ReactNode {
  const patternCount = tabsPatternEntries.length;

  return (
    <PatternComparisonPageShell
      backLink={{label: '← タブカテゴリへ戻る', to: '/tabs'}}
      summary={
        <>
          <Heading as="h2">どの tabs pattern を選ぶか</Heading>
          <p>
            タブは、同一ページ内の panel を切り替えるための navigation です。見た目の好みだけでなく、
            panel との接続、ラベル量、active state の強さ、keyboard semantics から選びます。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            compare page では 4 方式の判断軸を横断し、detail page では preview、CSS / TSX サンプル、
            `tablist` / `tabpanel` の設計メモまで確認できます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {tabsPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">scope の注意点</Heading>
          <ul className={styles.asideList}>
            <li>ページ遷移リンクではなく、同一ページ内 panel 切り替え</li>
            <li>form value 選択なら selector / radio を優先</li>
            <li>単純な押し込み状態なら toggle button を優先</li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">タブの比較軸</Heading>
          <p className={styles.axisLead}>
            まず見た目の強さと置き場所を分け、そのうえでラベル量、panel との接続、accessibility semantics を確認します。
          </p>

          <PatternComparisonAxisGrid
            items={tabsComparisonAxes.map((axis) => ({
              title: axis.title,
              description: axis.description,
            }))}
            layout="cards"
          />

          <div className={styles.matrixWrapper}>
            <table className={styles.matrixTable}>
              <thead>
                <tr>
                  <th className={styles.axisHeader} scope="col">
                    比較軸
                  </th>
                  {tabsPatternEntries.map((entry) => (
                    <th className={styles.columnHeader} key={entry.id} scope="col">
                      <span className={styles.columnTitle}>{entry.title}</span>
                      <span className={styles.columnDescription}>{entry.summary}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabsComparisonAxes.map((axis) => (
                  <tr key={axis.id}>
                    <th className={styles.axisCell} scope="row">
                      {axis.title}
                    </th>
                    {tabsPatternEntries.map((entry) => (
                      <td className={styles.matrixCell} key={`${entry.id}-${axis.id}`}>
                        {entry.comparisonSummary[axis.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.noteBlock}>
            <Heading as="h3">controller 版 tabs との違い</Heading>
            <p>
              既存の「タブ式インラインパネル切り替え」は controller pattern として扱います。このページでは component
              自体の variant、orientation、layout、badge を比較します。
            </p>
          </div>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンの preview を比較する</Heading>
          <p>
            一覧では各 pattern の代表 preview と要点を見比べ、detail page で個別variantの preview と code panel を確認します。
          </p>
          <TabsPatternGallery density="list" entries={tabsPatternEntries} />

          <section className={styles.comparisonNoteSection}>
            <Heading as="h3">tabs を選ぶ前に確認すること</Heading>
            <ul className={styles.comparisonNoteList}>
              <li>切り替える対象は同一ページ内の panel か</li>
              <li>URL が変わるべき page navigation ではないか</li>
              <li>選択値を送信する form control ではないか</li>
              <li>keyboard と focus-visible の設計を見た目と同時に用意できるか</li>
            </ul>
          </section>
        </>
      }
    />
  );
}
