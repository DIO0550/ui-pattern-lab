import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import SelectorPatternGallery from '@site/src/components/SelectorPatternGallery';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';

import styles from './styles.module.css';

type ControlKind = 'radio' | 'native-select' | 'combobox';

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
    id: 'radio',
    label: 'Radio',
    description: '候補を見せたまま 1 つ選ぶ',
  },
  {
    id: 'native-select',
    label: 'Native select',
    description: '候補を圧縮して表示密度を保つ',
  },
  {
    id: 'combobox',
    label: 'Combobox',
    description: '検索して 1 つに絞り込む',
  },
] as const satisfies readonly MatrixColumn[];

const quickSummaryItems = [
  {
    title: 'Radio',
    description: '候補数が少なく、見せたまま 1 件選ばせるときの基準です。',
  },
  {
    title: 'Native select',
    description: '表示密度を優先するときの baseline として先に検討します。',
  },
  {
    title: 'Custom select',
    description: 'native select では足りない要件が出たときだけ検討します。',
  },
  {
    title: 'Combobox',
    description: '検索や候補絞り込みが本当に必要なときだけ選びます。',
  },
] as const;

const matrixRows = [
  {
    axis: '候補の見え方',
    values: {
      radio: '全候補を見せたまま比較できる。候補数が少ない場面向き。',
      'native-select': '閉じた状態では現在値だけを見せ、表示密度を優先する。',
      combobox: '入力と候補一覧を分け、検索語で候補を絞り込む。',
    },
  },
  {
    axis: '候補数 / 検索必要性',
    values: {
      radio: '少数候補を一覧で見せたいときに向く。',
      'native-select': '中程度の候補を圧縮したいが、検索までは不要なときに向く。',
      combobox: '候補数が多い、表記揺れがある、検索補助が必要なときに向く。',
    },
  },
  {
    axis: '未選択 / 初期値',
    values: {
      radio: 'required と初期未選択 / default selection を整理しやすい。',
      'native-select': 'placeholder 相当 option と helper text で未選択を補足する。',
      combobox: '初期値、空状態、入力途中を別々に扱う必要がある。',
    },
  },
  {
    axis: 'モバイル適性',
    values: {
      radio: '候補数が少なければ直接比較しやすい。',
      'native-select': 'native picker と相性が良く、密度を保ちやすい。',
      combobox: '有効だが、構造と学習コストが高い。',
    },
  },
  {
    axis: 'アクセシビリティ semantics',
    values: {
      radio: '1 つ選ぶ semantics が最も明確。',
      'native-select': 'native control の semantics をそのまま活かせる。',
      combobox: 'role / listbox / status text の整合が必須になる。',
    },
  },
  {
    axis: 'バリデーション負荷',
    values: {
      radio: 'required と error の近接配置が比較的単純。',
      'native-select': 'placeholder 風 option と error 表現の整合が必要。',
      combobox: '未選択、候補 0 件、確定済みの区別を明示する必要がある。',
    },
  },
] as const satisfies readonly MatrixRow[];

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

export default function SelectorPatternPageContent(): ReactNode {
  const categorizedEntries = groupSelectorPatternEntries(selectorPatternEntries);

  return (
    <PatternComparisonPageShell
      summary={
        <>
          <Heading as="h2">selector 全体の判断ハブ</Heading>
          <p>
            まずは radio / native select / combobox の違いを整理し、そのあと family ごとの比較ページや baseline detail page へ進みます。
          </p>
          <ul>
            <li>候補を見せたまま比較するか、圧縮するか、検索で絞るか</li>
            <li>native select を基準にして custom select が本当に必要か</li>
            <li>combobox を single-select / local state / non-async でどこまで扱うか</li>
            <li>helper / error / disabled / screen reader guidance をどこで共通化するか</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">収録 family</Heading>
          <div className={styles.summaryGroups}>
            {categorizedEntries.map((category) => (
              <section className={styles.summaryGroup} key={category.id}>
                <div className={styles.summaryGroupHeader}>
                  <span className={styles.summaryGroupTitle}>{category.label}</span>
                  <span className={styles.countBadge}>{category.entries.length} 件</span>
                </div>
                <p>{category.description}</p>
                <ul>
                  {category.entries.map((entry) => (
                    <li className={styles.summaryLine} key={entry.id}>
                      <span>{entry.title}</span>
                      {entry.entryType === 'reference' ? (
                        <span className={styles.referenceItem}>reference</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p>
            hub では family の役割だけを整理し、custom select / combobox の詳細比較は専用ページへ分離します。
          </p>
        </>
      }
      axisSection={
        <section className={`container margin-bottom--xl ${styles.axisSection}`}>
          <Heading as="h2">radio / native select / combobox を比較する</Heading>
          <p className={styles.axisLead}>
            まずは候補の見え方、候補数、モバイル適性、semantics の違いを短くつかみ、そのあと matrix で判断を確認します。
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
            checkbox は multi-select 専用のため matrix 本体には含めず、{' '}
            <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link> へ分離しています。
            custom select は native select を超える要件が出たときだけ選び、combobox は検索が本当に必要な場合に限定します。
          </p>

          <div className={styles.familySection}>
            <Heading as="h3">family から次のページへ進む</Heading>
            <p className={styles.familyLead}>
              hub で判断軸を確認したら、family ごとの compare page や baseline detail page へ進みます。
            </p>
            <div className={styles.guideGrid}>
              {categorizedEntries.map((group) => {
                const primaryLink = buildFamilyPrimaryLink(group.id, group.entries[0].id);

                return (
                  <article className={styles.guideCard} key={group.id}>
                    <Heading as="h4">{group.label}</Heading>
                    <p>{group.description}</p>
                    <p className={styles.primaryLinkRow}>
                      <Link to={primaryLink.path}>{primaryLink.label}</Link>
                    </p>
                    <ul className={styles.linkList}>
                      {group.entries.map((entry) => (
                        <li key={entry.id}>
                          <Link to={`/selector/${entry.id}`}>{entry.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            一覧では preview と family ごとの差分を先に見比べ、詳細ページで helper / error / disabled や CSS / TSX サンプルを確認します。
          </p>
          <SelectorPatternGallery density="list" entries={selectorPatternEntries} />
        </>
      }
    />
  );
}
