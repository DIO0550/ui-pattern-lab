import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';
import {getReferenceNoteTone} from '@site/src/components/referenceNoteTone';

import styles from './styles.module.css';

export type ButtonReferenceCodeTab = {
  id: string;
  label: string;
  code: string;
  highlightedHtml?: string;
  language?: string;
  note?: string;
};

export type ButtonReferenceTabs = readonly ButtonReferenceCodeTab[];

export type ButtonReferenceVariant = {
  id: string;
  name: string;
  description: string;
  preview: ReactNode;
  previewClassName?: string;
  tabs: ButtonReferenceTabs;
  detailNotes?: readonly ButtonReferenceNote[];
};

export type ButtonReferenceGuide = {
  id: string;
  tone: 'do' | 'dont';
  description: string;
  preview: ReactNode;
};

export type ButtonReferenceNote = {
  id: string;
  label: string;
  value: string;
};

type EntryNoteSource = Pick<
  ButtonPatternEntry,
  | 'problem'
  | 'solution'
  | 'whenToUse'
  | 'layoutNotes'
  | 'stateNotes'
  | 'accessibilityNotes'
>;

type ButtonReferenceLayoutProps = {
  guides?: readonly ButtonReferenceGuide[];
  variantNote?: string;
  variantSectionLabel?: string;
  variants: readonly ButtonReferenceVariant[];
} & (
  | {
      entry: EntryNoteSource;
      notes?: never;
    }
  | {
      entry?: never;
      notes: readonly ButtonReferenceNote[];
    }
);

const COLLAPSED_CODE_BODY_MAX_HEIGHT_PX = 320;
const CODE_BODY_OVERFLOW_TOLERANCE_PX = 4;
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function buildDefaultNotes(entry: EntryNoteSource): ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'spacing', label: '余白 / サイズ', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

function pickNoteValue(
  notes: readonly ButtonReferenceNote[],
  labelKeywords: readonly string[],
): string | undefined {
  return notes.find((note) =>
    labelKeywords.some((keyword) => note.label.includes(keyword)),
  )?.value;
}

function buildFallbackGuides(
  notes: readonly ButtonReferenceNote[],
  variants: readonly ButtonReferenceVariant[],
): readonly ButtonReferenceGuide[] {
  const firstVariant = variants[0];

  if (!firstVariant) {
    return [];
  }

  const solution =
    pickNoteValue(notes, ['解決方法']) ??
    firstVariant.description ??
    '状態説明や補助情報を近くに置き、使い分けの根拠を UI から読めるようにします。';
  const problem = pickNoteValue(notes, ['課題']);
  const stateOrAccessibility =
    pickNoteValue(notes, ['状態設計', 'アクセシビリティ', '操作設計', '比較メモ']) ??
    '状態説明や補助文がなく、見た目だけで使い分けを判断させる例です。';

  return [
    {
      id: `${firstVariant.id}-default-guide-do`,
      tone: 'do',
      description: solution,
      preview: firstVariant.preview,
    },
    {
      id: `${firstVariant.id}-default-guide-dont`,
      tone: 'dont',
      description:
        problem
          ? `${problem} を放置したまま、見た目や配置だけで使い分ける構成にしないでください。`
          : '状態説明・補助文・影響範囲を UI から切り離し、見た目だけで判断させないでください。',
      preview: (
        <div className={styles.noteCard}>
          <span className={styles.noteTag}>状態説明不足</span>
          <p>{stateOrAccessibility}</p>
        </div>
      ),
    },
  ] as const;
}

/** Renders the code panel for a single reference variant. */
function VariantCodePanel({
  tabs,
}: {
  tabs: ButtonReferenceTabs;
}): ReactNode {
  const firstTab = tabs[0];
  const [activeTabId, setActiveTabId] = useState(firstTab?.id ?? '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const codeBodyRef = useRef<HTMLDivElement | null>(null);
  const activeTab = firstTab ? tabs.find((tab) => tab.id === activeTabId) ?? firstTab : undefined;
  const shouldRenderHighlightedHtml = Boolean(activeTab?.highlightedHtml);

  useEffect(() => {
    if (!activeTab) {
      return;
    }

    setIsExpanded(false);
  }, [activeTab?.id]);

  useIsomorphicLayoutEffect(() => {
    const codeBody = codeBodyRef.current;

    if (!activeTab || !codeBody) {
      return;
    }

    const updateExpandableState = (): void => {
      const nextIsExpandable =
        codeBody.scrollHeight >
        COLLAPSED_CODE_BODY_MAX_HEIGHT_PX + CODE_BODY_OVERFLOW_TOLERANCE_PX;
      setIsExpandable(nextIsExpandable);

      if (!nextIsExpandable) {
        setIsExpanded(false);
      }
    };

    updateExpandableState();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateExpandableState();
    });
    resizeObserver.observe(codeBody);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id, shouldRenderHighlightedHtml]);

  if (!activeTab) {
    return (
      <div className={styles.variantCodeWrap}>
        <div className={styles.variantCodeBar}>
          <div className={styles.variantCodeTabs}>
            <span className={styles.variantCodeLabel}>Code</span>
          </div>
        </div>
        <div className={styles.variantCodeEmpty}>実装例は準備中です。</div>
      </div>
    );
  }

  const collapsedCodeBodyStyle = isExpanded
    ? undefined
    : {maxHeight: `${COLLAPSED_CODE_BODY_MAX_HEIGHT_PX}px`};
  const codeBodyClassName = isExpanded
    ? styles.variantCodeBody
    : `${styles.variantCodeBody} ${styles.variantCodeBodyCollapsed}`;

  return (
    <div className={styles.variantCodeWrap}>
      <div className={styles.variantCodeBar}>
        <div className={styles.variantCodeTabs}>
          {tabs.map((tab) => (
            <button
              className={
                tab.id === activeTab.id
                  ? `${styles.variantCodeTab} ${styles.variantCodeTabActive}`
                  : styles.variantCodeTab
              }
              key={tab.id}
              onClick={() => {
                setIsExpanded(false);
                setActiveTabId(tab.id);
              }}
              type="button">
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.codeActions}>
          {isExpandable ? (
            <button
              aria-expanded={isExpanded}
              className={styles.codeToggle}
              onClick={() => {
                setIsExpanded((currentValue) => !currentValue);
              }}
              type="button">
              {isExpanded ? '折りたたむ' : '全体を表示'}
            </button>
          ) : null}
          <button
            className={styles.codeCopy}
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                void navigator.clipboard.writeText(activeTab.code);
              }
            }}
            type="button">
            Copy
          </button>
        </div>
      </div>

      <div className={styles.variantCode}>
        <div
          className={codeBodyClassName}
          ref={codeBodyRef}
          style={collapsedCodeBodyStyle}>
          {shouldRenderHighlightedHtml ? (
            <pre dangerouslySetInnerHTML={{__html: activeTab.highlightedHtml}} />
          ) : (
            <CodeBlock language={activeTab.language ?? 'tsx'}>{activeTab.code}</CodeBlock>
          )}
        </div>
        {activeTab.note ? <p className={styles.variantCodeNote}>{activeTab.note}</p> : null}
      </div>
    </div>
  );
}

/** Renders the optional guideline grid for a reference page. */
function GuidelineSection({
  guides,
}: {
  guides: readonly ButtonReferenceGuide[];
}): ReactNode {
  if (guides.length === 0) {
    return null;
  }

  return (
    <>
      <hr className={styles.divider} />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>ガイドライン</div>
        <h2 className={styles.sectionTitle}>Do&apos;s &amp; Don&apos;ts</h2>

        <div className={styles.guideGrid}>
          {guides.map((guide) => (
            <article
              className={
                guide.tone === 'do'
                  ? `${styles.guideCard} ${styles.guideCardDo}`
                  : `${styles.guideCard} ${styles.guideCardDont}`
              }
              key={guide.id}>
              <div className={styles.guideFlag}>
                <span>{guide.tone === 'do' ? '✓' : '✕'}</span>
                {guide.tone === 'do' ? 'Do' : 'Don’t'}
              </div>
              <div className={styles.guideBody}>
                <div className={styles.guideDemo}>{guide.preview}</div>
                <p>{guide.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/** Renders a shared reference-style layout for pattern detail pages. */
export default function ButtonReferenceLayout({
  entry,
  guides = [],
  notes,
  variantNote,
  variantSectionLabel = 'バリアント',
  variants,
}: ButtonReferenceLayoutProps): ReactNode {
  const resolvedNotes = notes ? [...notes] : entry ? buildDefaultNotes(entry) : [];
  const resolvedGuides =
    guides.length > 0 ? [...guides] : buildFallbackGuides(resolvedNotes, variants);
  const variantsWithDetailNotes = variants.filter(
    (variant): variant is ButtonReferenceVariant & {detailNotes: readonly ButtonReferenceNote[]} =>
      Array.isArray(variant.detailNotes) && variant.detailNotes.length > 0,
  );

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <div className={styles.sectionLabel}>{variantSectionLabel}</div>
        {variantNote ? <p className={styles.variantNote}>{variantNote}</p> : null}

        <div className={styles.variantList}>
          {variants.map((variant) => (
            <article className={styles.variantBlock} key={variant.id}>
              <div className={styles.variantHeader}>
                <span className={styles.variantName}>{variant.name}</span>
                <p className={styles.variantDescription}>{variant.description}</p>
              </div>
              <div className={styles.variantSplit}>
                <div className={styles.variantDemo}>
                  <div
                    className={[styles.variantDemoSurface, variant.previewClassName]
                      .filter(Boolean)
                      .join(' ')}>
                    {variant.preview}
                  </div>
                </div>
                <VariantCodePanel tabs={variant.tabs} />
              </div>
            </article>
          ))}
        </div>

        {variantsWithDetailNotes.length > 0 ? (
          <div className={styles.variantDetailGrid}>
            {variantsWithDetailNotes.map((variant) => (
              <article className={styles.variantDetailCard} key={`${variant.id}-detail-notes`}>
                <h3 className={styles.variantDetailTitle}>{variant.name}</h3>
                <div className={styles.variantDetailItems}>
                  {variant.detailNotes.map((note) => (
                    <div
                      className={styles.variantDetailNote}
                      data-note-tone={getReferenceNoteTone(note.id, note.label)}
                      key={note.id}>
                      <span className={styles.variantDetailNoteLabel}>{note.label}</span>
                      <p>{note.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>設計メモ</div>
        <h2 className={styles.sectionTitle}>課題 / 解決方法 / 使いどころ</h2>

        <div className={styles.notesGrid}>
          {resolvedNotes.map((note) => (
            <div
              className={styles.noteCard}
              data-note-tone={getReferenceNoteTone(note.id, note.label)}
              key={note.id}>
              <span className={styles.noteTag}>{note.label}</span>
              <p>{note.value}</p>
            </div>
          ))}
        </div>
      </section>

      <GuidelineSection guides={resolvedGuides} />
    </div>
  );
}
