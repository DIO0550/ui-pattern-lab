import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import PaginationPatternGallery from '@site/src/components/PaginationPatternGallery';
import {
  paginationComparisonAxes,
  paginationPatternEntries,
} from '@site/src/data/paginationPatternEntries';

import styles from './styles.module.css';

const decisionFlowItems = [
  '再訪しやすさと現在位置の把握を優先するなら `page-numbers`。',
  '探索の流れを保ちつつ、追加読込の主導権はユーザーに残したいなら `load-more`。',
  '文脈を切らずに流し読みさせたいが、位置把握や footer 到達性の弱さを許容できるなら `infinite-scroll`。',
  'page size control を user-facing に出すのは v1 では `page-numbers` のみです。',
  '迷ったら「位置を直接選ぶ必要があるか → append の主導権を誰が持つか → footer 到達性を残すか」の順で切り分けます。',
] as const;

export default function PaginationPatternPageContent(): ReactNode {
  const patternCount = paginationPatternEntries.length;

  return (
    <PatternComparisonPageShell
      backLink={{label: '← ページネーションカテゴリへ戻る', to: '/pagination'}}
      summary={
        <>
          <Heading as="h2">どの pagination pattern を選ぶか</Heading>
          <p>
            ページネーションは「何件ずつ読めるか」だけではなく、現在位置をどう把握させ、次の読込を誰が主導するかで選びます。
            classic page numbers、append 型の load more、auto append の infinite scroll を分けて考えると、
            page size control をどこへ置くべきかも整理しやすくなります。
          </p>
          <ol className={styles.flowList}>
            {decisionFlowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className={styles.summaryNote}>
            compare page では 3 方式の判断軸を横断し、detail page で preview state、CSS / TSX サンプル、補助文の置き方まで確認できます。
          </p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">初回収録パターン</Heading>
          <ul className={styles.asideList}>
            {paginationPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <Heading as="h3">scope の注意点</Heading>
          <ul className={styles.asideList}>
            <li>page size control は page numbers のみ</li>
            <li>load more / infinite scroll の chunk size は説明のみ</li>
            <li>free-form のページ番号入力と URL 同期は v1 対象外</li>
          </ul>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">ページネーションの比較軸</Heading>
          <p className={styles.axisLead}>
            まずは操作モデルと読込単位を分け、そのうえで位置把握、footer 到達性、append 時の負荷を比較すると判断しやすくなります。
          </p>

          <PatternComparisonAxisGrid
            items={paginationComparisonAxes.map((axis) => ({
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
                  {paginationPatternEntries.map((entry) => (
                    <th className={styles.columnHeader} key={entry.id} scope="col">
                      <span className={styles.columnTitle}>{entry.title}</span>
                      <span className={styles.columnDescription}>{entry.summary}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginationComparisonAxes.map((axis) => (
                  <tr key={axis.id}>
                    <th className={styles.axisCell} scope="row">
                      {axis.title}
                    </th>
                    {paginationPatternEntries.map((entry) => (
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
            <Heading as="h3">page size control の扱い</Heading>
            <p>
              compare page でも detail page でも、user-facing な page size control を持つのは `page-numbers` のみだと明示します。
              `load-more` と `infinite-scroll` の batch size は、実装や運用の都合として説明文に留めます。
            </p>
          </div>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンの preview を比較する</Heading>
          <p>
            一覧では各 pattern の代表 preview と要点を見比べ、detail page で `first / middle / last / after-size-change`、
            `loading / error / end` などの状態差分をまとめて確認します。
          </p>
          <PaginationPatternGallery density="list" entries={paginationPatternEntries} />

          <section className={styles.comparisonNoteSection}>
            <Heading as="h3">infinite scroll を選ぶ前に確認すること</Heading>
            <ul className={styles.comparisonNoteList}>
              <li>現在位置を再訪しにくくないか</li>
              <li>footer や補足導線へ到達できるか</li>
              <li>自動読込の失敗時に retry を見失わないか</li>
              <li>長い一覧で描画負荷が増えすぎないか</li>
            </ul>
          </section>
        </>
      }
    />
  );
}
