import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
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
        <Link
          aria-labelledby="selector-overview-title"
          className={styles.overviewLink}
          to="/patterns/selector-designs">
          <article className={styles.overviewCard}>
            <span className={styles.cardEyebrow}>比較一覧</span>
            <Heading as="h3" className={styles.cardTitle} id="selector-overview-title">
              セレクタデザインパターン
            </Heading>
            <p className={styles.cardDescription}>
              radio / native select / combobox の判断軸を確認し、そこから custom select と
              combobox family の比較ページへ進めます。
            </p>
            <p className={styles.cardMeta}>hub から family 別の比較・詳細ページへ進む</p>
          </article>
        </Link>
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

            return (
              <article className={styles.card} key={group.id}>
                <span className={styles.cardEyebrow}>family</span>
                <Heading as="h3" className={styles.cardTitle}>
                  {group.label}
                </Heading>
                <p className={styles.cardDescription}>{group.description}</p>
                <p className={styles.cardMeta}>
                  <Link to={primaryLink.path}>{primaryLink.label}</Link>
                </p>
                <ul className={styles.entryList}>
                  {group.entries.slice(0, 3).map((entry) => (
                    <li key={entry.id}>
                      <Link to={`/selector/${entry.id}`}>{entry.title}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連カテゴリ</Heading>
        <div className={styles.relatedGrid}>
          <Link
            aria-labelledby="selector-related-checkbox-title"
            className={styles.cardLink}
            to="/checkbox">
            <article className={styles.card}>
              <span className={styles.cardEyebrow}>関連カテゴリ</span>
              <Heading
                as="h3"
                className={styles.cardTitle}
                id="selector-related-checkbox-title">
                チェックボックス
              </Heading>
              <p className={styles.cardDescription}>
                複数選択、select-all、mixed state、確認入力を扱うカテゴリです。単一選択ではなく、
                0 件以上を選ばせたいときはこちらを参照します。
              </p>
            </article>
          </Link>
          <Link
            aria-labelledby="selector-related-button-title"
            className={styles.cardLink}
            to="/button/toggle-and-selection">
            <article className={styles.card}>
              <span className={styles.cardEyebrow}>関連カテゴリ</span>
              <Heading
                as="h3"
                className={styles.cardTitle}
                id="selector-related-button-title">
                ボタン / トグル・選択
              </Heading>
              <p className={styles.cardDescription}>
                押した瞬間に状態や表示モードが切り替わる UI を扱います。selector よりも即時反映が
                主題のときはこちらを参照します。
              </p>
            </article>
          </Link>
        </div>
      </section>
    </div>
  );
}
