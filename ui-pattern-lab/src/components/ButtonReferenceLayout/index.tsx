import {useState} from 'react';
import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

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

/** Renders the code panel for a single reference variant. */
function VariantCodePanel({
  tabs,
}: {
  tabs: ButtonReferenceTabs;
}): ReactNode {
  if (tabs.length === 0) {
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

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const shouldRenderHighlightedHtml = Boolean(activeTab.highlightedHtml);

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
                setActiveTabId(tab.id);
              }}
              type="button">
              {tab.label}
            </button>
          ))}
        </div>
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

      <div className={styles.variantCode}>
        <div className={styles.variantCodeBody}>
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
  variants,
}: ButtonReferenceLayoutProps): ReactNode {
  const resolvedNotes = notes ? [...notes] : entry ? buildDefaultNotes(entry) : [];
  const variantsWithDetailNotes = variants.filter(
    (variant): variant is ButtonReferenceVariant & {detailNotes: readonly ButtonReferenceNote[]} =>
      Array.isArray(variant.detailNotes) && variant.detailNotes.length > 0,
  );

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <div className={styles.sectionLabel}>バリアント</div>

        <div className={styles.variantList}>
          {variants.map((variant) => (
            <article className={styles.variantBlock} key={variant.id}>
              <div className={styles.variantHeader}>
                <span className={styles.variantName}>{variant.name}</span>
              </div>
              <div className={styles.variantSplit}>
                <div
                  className={[styles.variantDemo, variant.previewClassName]
                    .filter(Boolean)
                    .join(' ')}>
                  {variant.preview}
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
                    <div className={styles.variantDetailNote} key={note.id}>
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
            <div className={styles.noteCard} key={note.id}>
              <span className={styles.noteTag}>{note.label}</span>
              <p>{note.value}</p>
            </div>
          ))}
        </div>
      </section>

      <GuidelineSection guides={guides} />
    </div>
  );
}
