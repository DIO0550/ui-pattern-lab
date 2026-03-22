import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';

import styles from './styles.module.css';

function buildFamilyPrimaryLink(groupId: string, firstEntryId: string): {path: string; label: string} {
  if (groupId === 'radio') {
    return {
      path: `/selector/${firstEntryId}`,
      label: 'radio の詳細へ進む',
    };
  }

  if (groupId === 'native-select') {
    return {
      path: '/selector/native-select-compact-options',
      label: 'native select baseline を見る',
    };
  }

  if (groupId === 'custom-select') {
    return {
      path: '/patterns/selector-custom-select-designs',
      label: 'custom select 比較を見る',
    };
  }

  if (groupId === 'combobox') {
    return {
      path: '/patterns/selector-combobox-designs',
      label: 'combobox 比較を見る',
    };
  }

  return {
    path: '/selector/states-and-validation',
    label: 'states / validation を見る',
  };
}

function buildSupplementalLinks(
  entries: Array<{id: string; title: string}>,
  excludedEntryId?: string,
): Array<{label: string; to: string}> {
  return entries
    .filter((entry) => entry.id !== excludedEntryId)
    .slice(0, 3)
    .map((entry) => ({
      label: entry.title,
      to: `/selector/${entry.id}`,
    }));
}

export default function SelectorCategoryContent(): ReactNode {
  const categoryGroups = groupSelectorPatternEntries(selectorPatternEntries);

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        selector カテゴリでは、フォーム入力として 1 つの値を選ぶ UI を family 単位で整理します。
        まず hub で判断軸を確認し、そのあと radio / native select / custom select /
        combobox / reference の各 family へ進みます。複数選択は checkbox、押した瞬間に状態が変わる
        UI は button / toggle へ逃がします。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず全体ハブを見る</Heading>
        <PatternCatalogCard
          badge={`${categoryGroups.length} family`}
          description="radio / native select / combobox の判断軸を確認し、そこから custom select と combobox family の比較ページへ進めます。"
          eyebrow="比較一覧"
          meta="hub から family 別の比較・詳細ページへ進む"
          title="セレクタデザインパターン"
          titleId="selector-overview-title"
          to="/patterns/selector-designs"
          variant="featured"
        />
      </section>

      <section className={styles.section}>
        <Heading as="h2">family から探す</Heading>
        <p className={styles.sectionLead}>
          family ごとに primary CTA を 1 つだけ置き、必要に応じて detail page を補助リンクとして並べます。
          radio を第一候補にしつつ、native / custom / combobox を役割で切り分けます。
        </p>
        <div className={styles.grid}>
          {categoryGroups.map((group) => {
            const primaryLink = buildFamilyPrimaryLink(group.id, group.entries[0].id);
            // Direct-detail primary CTAs should not be repeated in supplemental detail links.
            const excludedEntryId = group.entries.find(
              (entry) => `/selector/${entry.id}` === primaryLink.path,
            )?.id;

            return (
              <PatternCatalogCard
                badge={`${group.entries.length}件`}
                description={group.description}
                eyebrow="family"
                key={group.id}
                primaryLinkLabel={primaryLink.label}
                supplementalLinks={buildSupplementalLinks(group.entries, excludedEntryId)}
                title={group.label}
                to={primaryLink.path}
                variant="family"
              />
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連カテゴリ</Heading>
        <div className={styles.relatedGrid}>
          <PatternCatalogCard
            description="複数選択、select-all、mixed state、確認入力を扱うカテゴリです。単一選択ではなく、0 件以上を選ばせたいときはこちらを参照します。"
            eyebrow="関連カテゴリ"
            title="チェックボックス"
            titleId="selector-related-checkbox-title"
            to="/checkbox"
            tone="muted"
            variant="default"
          />
          <PatternCatalogCard
            description="押した瞬間に状態や表示モードが切り替わる UI を扱います。selector よりも即時反映が主題のときはこちらを参照します。"
            eyebrow="関連カテゴリ"
            title="ボタン / トグル・選択"
            titleId="selector-related-button-title"
            to="/button/toggle-and-selection"
            tone="muted"
            variant="default"
          />
        </div>
      </section>
    </div>
  );
}
