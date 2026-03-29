import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import SelectorPatternGallery from '@site/src/components/SelectorPatternGallery';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';
import type {
  SelectorContextNoteKey,
  SelectorPatternCategoryId,
  SelectorPatternEntryId,
} from '@site/src/data/selectorPatternTypes';

import styles from './styles.module.css';

type Props = {
  entryId: SelectorPatternEntryId;
};

function getComparePageLink(categoryId: SelectorPatternCategoryId): {path: string; label: string} {
  if (categoryId === 'custom-select') {
    return {
      path: '/patterns/selector-custom-select-designs',
      label: 'Custom select デザインパターン',
    };
  }

  if (categoryId === 'combobox') {
    return {
      path: '/patterns/selector-combobox-designs',
      label: 'Combobox デザインパターン',
    };
  }

  return {
    path: '/patterns/selector-designs',
    label: 'セレクタデザインパターン',
  };
}

function buildContextNote(
  contextNoteKey: SelectorContextNoteKey,
  categoryId: SelectorPatternCategoryId,
): ReactNode | null {
  if (contextNoteKey === 'button-toggle') {
    return (
      <>
        見た目が segmented control に近くても、送信時に 1 つの form value を扱うなら selector
        側です。押した瞬間に状態や表示モードが変わる UI は{' '}
        <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link> を参照してください。
      </>
    );
  }

  if (contextNoteKey === 'checkbox') {
    if (categoryId === 'radio') {
      return (
        <>
          selectable card は見た目ではなく判断軸で分けます。1 つの form value を選ぶなら{' '}
          <Link to="/selector/selectable-radio-cards">selector / カード型の radio selection</Link>
          、0 件以上の複数選択や未選択許容が主題なら{' '}
          <Link to="/checkbox/selectable-cards">checkbox / カード型の複数選択</Link>{' '}
          を使います。
        </>
      );
    }

    if (categoryId === 'native-select') {
      return (
        <>
          native select で収まらない見た目要件がある場合は{' '}
          <Link to="/patterns/selector-custom-select-designs">custom select 比較</Link>{' '}
          を参照してください。複数選択や select-all / mixed state が必要なら selector ではなく{' '}
          <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link> を使います。
        </>
      );
    }

    if (categoryId === 'custom-select') {
      return (
        <>
          custom select family の違いは{' '}
          <Link to="/patterns/selector-custom-select-designs">custom select 比較</Link>{' '}
          から見比べられます。native select で足りるならそちらを優先し、複数選択が必要なら{' '}
          <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link>{' '}
          へ切り替えます。
        </>
      );
    }

    if (categoryId === 'combobox') {
      return (
        <>
          combobox family の baseline / grouped / empty / loading states は{' '}
          <Link to="/patterns/selector-combobox-designs">combobox 比較</Link>{' '}
          から見比べられます。複数選択や token picker が必要なら selector ではなく{' '}
          <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link>{' '}
          を検討してください。
        </>
      );
    }

    return (
      <>
        候補を 0 件以上選ばせたり select-all / mixed state が必要なら、selector ではなく{' '}
        <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link> を参照してください。
        selector では 1 つの既存 value に絞る前提を保ちます。
      </>
    );
  }

  if (contextNoteKey === 'selector-reference') {
    return (
      <>
        このページは selector 全体の品質ルールをまとめた reference です。family ごとの判断は{' '}
        <Link to="/patterns/selector-designs">セレクタデザインパターン</Link>、複数選択や mixed state
        は <Link to="/checkbox">チェックボックス</Link>
        、押下直後の切り替え UI は{' '}
        <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link> で扱います。
      </>
    );
  }

  return null;
}

export default function SelectorPatternDetailContent({entryId}: Props): ReactNode {
  const entry = selectorPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown selector pattern entry: ${entryId}`);
  }

  const comparePageLink = getComparePageLink(entry.category);
  const contextNote = buildContextNote(entry.contextNoteKey, entry.category);

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to="/selector">セレクタ</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={comparePageLink.path}>{comparePageLink.label}</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX サンプルと設計メモをまとめて確認できます。family の比較へ戻る場合は{' '}
        <Link to={comparePageLink.path}>{comparePageLink.label}</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to="/selector">セレクタ</Link> を参照してください。
      </p>
      {contextNote ? <p className={styles.contextNote}>{contextNote}</p> : null}
      <SelectorPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
