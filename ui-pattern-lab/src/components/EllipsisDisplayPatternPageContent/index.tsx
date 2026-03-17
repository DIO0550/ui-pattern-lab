import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import EllipsisDisplayPatternGallery from '@site/src/components/EllipsisDisplayPatternGallery';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';

import styles from './styles.module.css';

export default function EllipsisDisplayPatternPageContent(): ReactNode {
  return (
    <div className={styles.root}>
      <section className={`container margin-vert--xl ${styles.introSection}`}>
        <div className={styles.heroGrid}>
          <div className={styles.introCopy}>
            <Heading as="h2">このページで比較できること</Heading>
            <p>
              ここでは、テーブル専用の `cell-truncation` を置き換えるのではなく、
              list / card / summary / disclosure を横断する generic な省略表示の
              ルールを比較します。各パターンごとに preview、設計メモ、CSS / TSX
              例をまとめて確認できます。
            </p>
            <ul className={styles.bulletList}>
              <li>固定幅でも可変幅でも1行のまま密度を保つ基本形</li>
              <li>3行程度の要約を残す複数行 clamp</li>
              <li>要約の近くに全文を補足する構成</li>
              <li>キーボードで開閉できる disclosure</li>
              <li>`overflow-wrap: anywhere` と全文到達導線の考え方</li>
            </ul>
          </div>

          <aside className={styles.summaryCard}>
            <Heading as="h3">初回収録パターン</Heading>
            <ul className={styles.patternList}>
              {ellipsisDisplayPatternEntries.map((entry) => (
                <li key={entry.id}>{entry.title}</li>
              ))}
            </ul>
            <p className={styles.summaryNote}>
              一覧では比較を優先してコード例を折りたたみ、詳細ページでは preview と
              CSS / TSX 例を常時展開で確認できます。テーブル専用の具体例は
              {' '}
              <Link to="/table/cell-truncation">cell-truncation</Link>
              {' '}を参照してください。
            </p>
          </aside>
        </div>
      </section>

      <section className={`container margin-bottom--xl ${styles.guideSection}`}>
        <Heading as="h2">省略表示の選び分けガイド</Heading>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <Heading as="h3">1行省略</Heading>
            <p>
              ラベル列や通知一覧に加えて、横幅が変わる分割ビューやサイドパネルでも
              `min-width: 0` を組み合わせると 1 行省略を保ちやすくなります。
            </p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">複数行 clamp</Heading>
            <p>
              2〜3行の文脈を残したいカード一覧で有効です。`-webkit-line-clamp`
              は見た目の強化として使い、全文導線を別に用意します。
            </p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">全文補足</Heading>
            <p>
              要約と原文の両方が重要なときは、近接した補足面で全文を失わない構成にします。
            </p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">アクセシブルな開閉</Heading>
            <p>
              hover 依存を避け、利用者が必要なときだけキーボード操作で全文を開けるようにします。
            </p>
          </article>
        </div>
      </section>

      <section className="container margin-bottom--xl">
        <Heading as="h2">パターンを比較する</Heading>
        <p className={styles.compareLead}>
          下のカードから、各パターンの preview、課題、解決方法、CSS / TSX
          例をまとめて確認できます。長文セルをテーブル密度の観点で扱う具体例は
          {' '}
          <Link to="/table/cell-truncation">/table/cell-truncation</Link>
          {' '}に残し、このページでは generic な意思決定ガイドに絞っています。
        </p>
        <EllipsisDisplayPatternGallery
          density="list"
          entries={ellipsisDisplayPatternEntries}
        />
      </section>
    </div>
  );
}
