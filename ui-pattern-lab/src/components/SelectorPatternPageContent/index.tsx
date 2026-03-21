import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
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

const matrixRows = [
  {
    axis: '候補の見え方',
    values: {
      radio: '全候補を常時見せて比較できる。候補数が少ない場面と相性が良い。',
      'native-select': '閉じた状態では現在値だけを見せ、一覧密度を優先する。',
      combobox: '入力と候補一覧を分離し、検索語で候補を狭める。',
    },
  },
  {
    axis: '候補数 / 検索必要性',
    values: {
      radio: '候補数が少なく、視線移動だけで比較できる範囲に向く。',
      'native-select':
        '中程度の候補数を圧縮したいが、検索 UI までは不要なときに向く。',
      combobox: '候補数が多い、表記揺れがある、検索補助が必要なときに向く。',
    },
  },
  {
    axis: '未選択 / 初期値',
    values: {
      radio: 'required と初期未選択 / default selection の設計を明示しやすい。',
      'native-select':
        'placeholder 相当 option と helper text で未選択状態を補足する。',
      combobox: '初期値、空状態、検索途中の入力値を別々に扱う必要がある。',
    },
  },
  {
    axis: 'モバイル適性',
    values: {
      radio: '候補数が少なければモバイルでも直接比較しやすい。',
      'native-select': 'native picker と相性が良く、密度を保ちやすい。',
      combobox: '構造は有効だが、実装コストと操作学習コストが高い。',
    },
  },
  {
    axis: 'アクセシビリティ semantics',
    values: {
      radio: '同一 group から 1 つを選ぶ semantics が最も明確。',
      'native-select': 'native control の既存 semantics をそのまま活かせる。',
      combobox:
        'role、listbox、option、status text の関係を明示しないと破綻しやすい。',
    },
  },
  {
    axis: 'バリデーション負荷',
    values: {
      radio: 'required と helper / error の近接配置が比較的単純。',
      'native-select':
        'placeholder 風 option と error 表現の整合を取る必要がある。',
      combobox:
        '未選択、候補 0 件、検索途中、確定済みの区別を明示する必要がある。',
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
    <div className={styles.root}>
      <section className={`container margin-vert--xl ${styles.introSection}`}>
        <div className={styles.heroGrid}>
          <div className={styles.introCopy}>
            <Heading as="h2">このページで整理すること</Heading>
            <p>
              `/patterns/selector-designs` は selector 全体の判断ハブです。まずは radio / native
              select / combobox の違いを整理し、そのあと family ごとの比較ページや baseline
              detail page に進みます。
            </p>
            <ul className={styles.bulletList}>
              <li>候補を見せたまま比較するか、圧縮するか、検索で絞るか</li>
              <li>native select を基準にして custom select が本当に必要か</li>
              <li>combobox を single-select / local state / non-async でどこまで扱うか</li>
              <li>helper / error / disabled / screen reader guidance をどこで共通化するか</li>
              <li>family ごとの compare page と detail page をどう辿り分けるか</li>
            </ul>
          </div>

          <aside className={styles.summaryCard}>
            <Heading as="h3">収録 family</Heading>
            <div className={styles.summaryGroups}>
              {categorizedEntries.map((category) => (
                <section className={styles.summaryGroup} key={category.id}>
                  <div className={styles.summaryGroupHeader}>
                    <span className={styles.summaryGroupTitle}>{category.label}</span>
                    <span className={styles.countBadge}>{category.entries.length} 件</span>
                  </div>
                  <p className={styles.summaryNote}>{category.description}</p>
                  <ul className={styles.patternList}>
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
            <p className={styles.summaryNote}>
              hub では family の役割だけを整理し、custom select / combobox の詳細比較は専用ページへ分離します。
            </p>
          </aside>
        </div>
      </section>

      <section className={`container margin-bottom--xl ${styles.matrixSection}`}>
        <Heading as="h2">radio / native select / combobox を比較する</Heading>
        <p className={styles.matrixLead}>
          まずは候補の見え方、候補数、未選択、モバイル適性、semantics、validation
          負荷の違いを横断で整理し、selector の主戦場を明確にします。
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
          checkbox は multi-select 専用のため matrix 本体には含めず、{' '}
          <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link> へ分離しています。
          custom select は native select を超える要件が出たときだけ選び、combobox は検索が本当に必要な場合に限定します。
        </p>
      </section>

      <section className={`container margin-bottom--xl ${styles.guideSection}`}>
        <Heading as="h2">family から次のページへ進む</Heading>
        <p className={styles.compareLead}>
          hub で判断軸を確認したら、family ごとの compare page や baseline detail page
          へ進みます。custom select と combobox は専用の比較ページに分離しています。
        </p>
        <div className={styles.guideGrid}>
          {categorizedEntries.map((group) => {
            const primaryLink = buildFamilyPrimaryLink(group.id, group.entries[0].id);

            return (
              <article className={styles.guideCard} key={group.id}>
                <Heading as="h3">{group.label}</Heading>
                <p>{group.description}</p>
                <p className={styles.matrixNote}>
                  <Link to={primaryLink.path}>{primaryLink.label}</Link>
                </p>
                <ul className={styles.patternList}>
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
      </section>
    </div>
  );
}
