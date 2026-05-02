import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {ButtonReferenceNote} from '@site/src/components/ButtonReferenceLayout';
import {accordionPatternSnippets} from '@site/src/data/accordionPatternSnippets';
import type {
  AccordionPatternEntry,
  AccordionPatternEntryId,
  AccordionPatternVariantId,
} from '@site/src/data/accordionPatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: AccordionPatternEntry;
};

type PreviewItem = {
  id: string;
  title: string;
  body: string;
  icon: string;
  meta: string;
  summary: string;
};

type PreviewAccordionProps = {
  allowsMultiple: boolean;
  items: readonly PreviewItem[];
  variantId: AccordionPatternVariantId;
};

const accordionVariantOrder = ['single', 'multiple', 'contained', 'faq'] as const;

const previewItems = [
  {
    id: 'overview',
    title: '導入前に確認すること',
    body: '利用シーン、対象ユーザー、開閉してよい情報量を先に整理します。見出しだけで内容を推測できる粒度にすると、隠れた本文も探しやすくなります。',
    icon: '01',
    meta: '要点',
    summary: '情報の入口を短く見せる',
  },
  {
    id: 'conditions',
    title: '表示条件と例外を整理する',
    body: '条件、例外、補足説明を見出しの直下に置き、文脈を保ったまま読めるようにします。長い本文は段落を短く区切り、開いた項目の中だけで読み切れる量に抑えます。',
    icon: '02',
    meta: '詳細',
    summary: '条件と補足をまとめる',
  },
  {
    id: 'accessibility',
    title: 'キーボード操作を確認する',
    body: 'trigger と panel を関連づけ、開閉状態を aria-expanded と chevron の向きの両方で示します。trigger は行全体を押せる button として扱います。',
    icon: '03',
    meta: 'A11y',
    summary: '状態と移動を明確にする',
  },
] as const satisfies readonly PreviewItem[];

const accordionVariantDefinitions: Readonly<
  Record<
    AccordionPatternVariantId,
    {
      allowsMultiple: boolean;
      description: string;
      name: string;
      previewNote: string;
    }
  >
> = {
  contained: {
    allowsMultiple: true,
    description:
      'カードや設定面の中で、section ごとの surface を明確にする accordion です。フォームや管理画面の補足領域に向きます。',
    name: 'カード型',
    previewNote:
      '周囲と同じ背景に埋もれないよう、container と item の両方に境界を持たせます。',
  },
  faq: {
    allowsMultiple: true,
    description:
      '質問と回答を縦に読みやすく並べる FAQ 型 accordion です。複数の回答を開いたまま比較できます。',
    name: 'FAQ 型',
    previewNote:
      '質問文を見出しとして読みやすくし、回答本文の行間を少し広めに取ります。',
  },
  multiple: {
    allowsMultiple: true,
    description:
      '複数 section を同時に開ける accordion です。仕様比較や設定説明など、開いた項目を参照し続けたい場面に向きます。',
    name: '複数開閉',
    previewNote:
      '複数の本文を同時に見られるため、比較や参照を妨げにくい variant です。',
  },
  single: {
    allowsMultiple: false,
    description:
      '常に 1 section だけを開く accordion です。長い説明群で読む範囲を絞り、視線の散らばりを抑えます。',
    name: '単一開閉',
    previewNote:
      '現在読む section に集中させたいときに向きます。別項目を開くと前の項目を閉じます。',
  },
} as const;

/** Resolves the CSS variant class for one preview accordion. */
function getVariantClassName(variantId: AccordionPatternVariantId): string {
  if (variantId === 'single') {
    return styles.singleVariant;
  }

  if (variantId === 'multiple') {
    return styles.multipleVariant;
  }

  if (variantId === 'contained') {
    return styles.containedVariant;
  }

  return styles.faqVariant;
}

/** Renders one interactive accordion preview. */
function PreviewAccordion({
  allowsMultiple,
  items,
  variantId,
}: PreviewAccordionProps): ReactNode {
  const isFaqVariant = variantId === 'faq';
  const isContainedVariant = variantId === 'contained';
  const initialOpenIds = allowsMultiple ? items.slice(0, 2).map((item) => item.id) : [items[0].id];
  const [openIds, setOpenIds] = useState<readonly string[]>(initialOpenIds);

  const toggleItem = (itemId: string): void => {
    setOpenIds((currentIds) => {
      const isOpen = currentIds.includes(itemId);

      if (allowsMultiple) {
        return isOpen
          ? currentIds.filter((currentId) => currentId !== itemId)
          : [...currentIds, itemId];
      }

      return isOpen ? [] : [itemId];
    });
  };

  return (
    <div className={styles.previewFrame}>
      {isContainedVariant ? (
        <div className={styles.settingsHeader}>
          <span className={styles.settingsEyebrow}>Publishing settings</span>
          <div className={styles.settingsHeaderRow}>
            <strong>公開前チェック</strong>
            <span>3項目</span>
          </div>
          <p>リリース前に確認する設定項目を、カード内で段階的に開閉します。</p>
        </div>
      ) : null}
      {variantId === 'multiple' ? (
        <div className={styles.multiHeader}>
          <span className={styles.multiEyebrow}>Multiple open</span>
          <strong>複数の項目を同時に参照</strong>
          <span>比較や確認のため、複数セクションを開いたまま保持できます。</span>
        </div>
      ) : null}
      {isFaqVariant ? (
        <div className={styles.faqHeader}>
          <span className={styles.faqEyebrow}>FAQ</span>
          <strong>よくある質問</strong>
          <p>質問だけを先に走査でき、必要な回答だけをその場で開ける構成です。</p>
        </div>
      ) : null}
      <div className={clsx(styles.accordion, getVariantClassName(variantId))}>
        {items.map((item, itemIndex) => {
          const isOpen = openIds.includes(item.id);
          const buttonId = `${variantId}-${item.id}-trigger`;
          const panelId = `${variantId}-${item.id}-panel`;

          return (
            <article className={styles.accordionItem} key={item.id}>
              <h3 className={styles.accordionHeading}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className={styles.accordionTrigger}
                  id={buttonId}
                  onClick={() => toggleItem(item.id)}
                  type="button">
                  <span className={styles.triggerContent}>
                    <span className={styles.titleRow}>
                      {isFaqVariant ? (
                        <span className={styles.questionMark}>Q{itemIndex + 1}</span>
                      ) : null}
                      {isContainedVariant ? (
                        <span className={styles.cardIcon}>{item.icon}</span>
                      ) : null}
                      <span className={styles.itemTitle}>{item.title}</span>
                      {!isFaqVariant ? (
                        <span className={styles.itemMeta}>
                          {allowsMultiple ? '同時展開可' : item.meta}
                        </span>
                      ) : null}
                    </span>
                    {!isFaqVariant ? (
                      <span className={styles.itemSummary}>{item.summary}</span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      styles.accordionChevron,
                      isOpen && styles.accordionChevronOpen,
                    )}
                  />
                </button>
              </h3>
              <div
                aria-labelledby={buttonId}
                className={styles.accordionPanel}
                hidden={!isOpen}
                id={panelId}
                role="region">
                {isFaqVariant ? <span className={styles.answerMark}>A</span> : null}
                <p>{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/** Builds the note cards shown under the shared reference layout. */
function buildNotes(entry: AccordionPatternEntry): readonly ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'layout', label: 'レイアウト', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

/** Builds the preview surface for one accordion variant. */
function buildVariantPreview(variantId: AccordionPatternVariantId): ReactNode {
  const definition = accordionVariantDefinitions[variantId];

  return (
    <div className={styles.previewStack}>
      <PreviewAccordion
        allowsMultiple={definition.allowsMultiple}
        items={previewItems}
        variantId={variantId}
      />
      <p className={styles.previewNote}>{definition.previewNote}</p>
    </div>
  );
}

/** Builds the shared reference variants for the disclosure accordion page. */
function buildVariants(entryId: AccordionPatternEntryId): readonly PatternReferenceVariant[] {
  return accordionVariantOrder.map((variantId) => ({
    description: accordionVariantDefinitions[variantId].description,
    id: `${entryId}-${variantId}`,
    name: accordionVariantDefinitions[variantId].name,
    preview: buildVariantPreview(variantId),
    previewClassName: styles.widePreview,
    tabs: buildReferenceCodeTabs(accordionPatternSnippets[entryId][variantId].items),
  }));
}

/** Renders the shared reference layout for the disclosure accordion pattern. */
export default function DisclosureAccordionReferenceContent({entry}: Props): ReactNode {
  return (
    <PatternReferenceContent
      notes={buildNotes(entry)}
      variantNote="Accordion は見出しと本文領域の対応関係を明確にし、単一開閉 / 複数開閉 / カード型 / FAQ 型を 1 variant block : 1 code panel で分離しています。各 block で開閉状態、余白、境界の違いを確認できます。"
      variantSectionLabel="バリアント"
      variants={buildVariants(entry.id)}
    />
  );
}
