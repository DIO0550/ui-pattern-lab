import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {controllerPatternEntries} from '@site/src/data/controllerPatternEntries';

import styles from './styles.module.css';

const relatedResources = [
  {
    title: 'ボタン',
    description:
      '単発 action と常時表示の mode switch を切り分けたいときは、button カテゴリの責務を先に確認してください。',
    to: '/button',
  },
  {
    title: 'セレクタ',
    description:
      'フォーム値入力としての radio / select / combobox と、即時反映する controller の境界は selector カテゴリが参照先です。',
    to: '/selector',
  },
  {
    title: 'テーブル',
    description:
      'pagination や sort の適用先となる table layout 側の責務は、table カテゴリで別途整理しています。',
    to: '/table',
  },
] as const;

export default function ControllerCategoryContent(): ReactNode {
  const patternCount = controllerPatternEntries.length;
  const compareItems = controllerPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/controller/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        表示制御カテゴリでは、単発 action やフォーム送信前提の値選択ではなく、画面上の内容や view state
        をその場で切り替える UI を扱います。まず比較ページで `view switch`、`scope control`、
        `continuous adjustment` の違いを整理してから、個別 pattern の detail page へ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較ページで判断する</Heading>
        <p className={styles.sectionLead}>
          segmented switch、tabs、sort / filter toolbar、pagination、range slider、quantity
          stepper の違いは、何を切り替える control なのかを比較一覧で横断的に確認するのがおすすめです。
        </p>
        <div className={styles.grid}>
          <PatternCatalogCard
            description={`${patternCount} つの controller pattern を、切り替える対象・候補数・即時反映の粒度・既存カテゴリとの境界で比較できます。`}
            eyebrow="比較一覧"
            title="表示制御デザインパターン"
            to="/patterns/controller-designs"
            variant="featured"
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">収録している {patternCount} パターン</Heading>
        <p className={styles.sectionLead}>
          一覧では各 pattern の比較メモを短く見比べ、detail page で preview、CSS / TSX サンプル、
          interaction と accessibility の注記を確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連ページ</Heading>
        <p className={styles.sectionLead}>
          controller に含めない button / selector / table 側の責務も、必要な範囲だけ相互参照できるようにしています。
        </p>
        <div className={styles.grid}>
          {relatedResources.map((resource) => (
            <PatternCatalogCard
              description={resource.description}
              eyebrow="関連ページ"
              key={resource.to}
              title={resource.title}
              to={resource.to}
              tone="muted"
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
