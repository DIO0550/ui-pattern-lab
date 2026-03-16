import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import ButtonPatternGallery from '@site/src/components/ButtonPatternGallery';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';

import styles from './styles.module.css';

export default function ButtonPatternPageContent(): ReactNode {
  return (
    <div className={styles.root}>
      <section className={`container margin-vert--xl ${styles.introSection}`}>
        <div className={styles.heroGrid}>
          <div className={styles.introCopy}>
            <Heading as="h2">このページで比較できること</Heading>
            <p>
              ここでは、ボタンそのものの装飾ではなく、強調度、状態、危険操作、
              icon-only、トグル、余白設計といった意思決定のルールを比較します。
              各パターンごとに preview、設計メモ、CSS / TSX サンプルを並べて
              参照できます。
            </p>
            <ul className={styles.bulletList}>
              <li>主行動と補助行動の優先順位</li>
              <li>hover / focus-visible / disabled / loading の状態差分</li>
              <li>destructive / warning / cancel の危険度設計</li>
              <li>padding、min-height、icon gap、touch target の基準</li>
            </ul>
          </div>

          <aside className={styles.summaryCard}>
            <Heading as="h3">初回収録パターン</Heading>
            <ul className={styles.patternList}>
              {buttonPatternEntries.map((entry) => (
                <li key={entry.id}>{entry.title}</li>
              ))}
            </ul>
            <p className={styles.summaryNote}>
              一覧では比較軸を要約し、詳細ページでは preview と CSS / TSX サンプルを
              常時展開で確認できます。余白・サイズの詳細ルールは
              「余白とサイズ設計」ページを正とします。
            </p>
          </aside>
        </div>
      </section>

      <section className={`container margin-bottom--xl ${styles.guideSection}`}>
        <Heading as="h2">ボタン横断ガイド</Heading>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <Heading as="h3">優先順位</Heading>
            <p>primary を 1 つに絞り、secondary / tertiary / ghost は補助操作として段階的に弱めます。</p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">状態設計</Heading>
            <p>focus-visible を消さず、disabled と loading を別の意味として扱い、再実行防止も含めて設計します。</p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">余白・サイズ</Heading>
            <p>compact / default / comfortable で min-height、padding、icon gap を連動させて整合を取ります。</p>
          </article>
          <article className={styles.guideCard}>
            <Heading as="h3">アクセシビリティ</Heading>
            <p>icon-only の accessible name、toggle の `aria-pressed`、danger の明示ラベルを欠かさず扱います。</p>
          </article>
        </div>
      </section>

      <section className="container margin-bottom--xl">
        <Heading as="h2">パターンを比較する</Heading>
        <p className={styles.compareLead}>
          下のカードから、各パターンのプレビュー、設計メモ、CSS / TSX サンプルを
          まとめて確認できます。一覧ではサンプルを折りたたみ、詳細ページでは常時展開で参照します。
        </p>
        <ButtonPatternGallery density="list" entries={buttonPatternEntries} />
      </section>
    </div>
  );
}
