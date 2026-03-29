import {useState} from 'react';
import type {ReactNode} from 'react';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

import styles from './styles.module.css';

type HierarchyButtonReferenceContentProps = {
  entry: ButtonPatternEntry;
};

type VariantPreviewKind = 'primary' | 'secondary' | 'tertiary' | 'ghost';

type CodeTab = {
  id: string;
  label: string;
  code: string;
  highlightedHtml: string;
};

type VariantDefinition = {
  id: string;
  name: string;
  description: string;
  previewKind: VariantPreviewKind;
  tabs: CodeTab[];
};

type NoteCard = {
  id: 'problem' | 'solution' | 'usecase' | 'spacing' | 'state' | 'a11y';
  label: string;
  value: string;
};

type GuideTone = 'do' | 'dont';

type GuidePreviewKind =
  | 'primary-pair'
  | 'double-primary'
  | 'supporting-actions'
  | 'ghost-primary';

type GuideCard = {
  id: string;
  tone: GuideTone;
  description: string;
  previewKind: GuidePreviewKind;
};

const variants = [
  {
    id: 'primary',
    name: 'Primary',
    description: '最も重要な主行動は 1 つに絞ります。',
    previewKind: 'primary',
    tabs: [
      {
        id: 'primary-css',
        label: 'CSS',
        code: `.primaryButton {
  background: var(--ifm-color-primary);
  border: 1px solid var(--ifm-color-primary);
  color: #ffffff;
}`,
        highlightedHtml: `<span class="sel">.primaryButton</span> {
  <span class="prop">background</span>: <span class="val">var(--ifm-color-primary)</span>;
  <span class="prop">border</span>: <span class="val">1px solid var(--ifm-color-primary)</span>;
  <span class="prop">color</span>: <span class="val">#ffffff</span>;
}`,
      },
      {
        id: 'primary-tsx',
        label: 'TSX',
        code: `<button className={styles.primaryButton} type="button">
  変更を保存
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.primaryButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  変更を保存
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'secondary',
    name: 'Secondary',
    description: '主行動に並ぶ補助操作です。',
    previewKind: 'secondary',
    tabs: [
      {
        id: 'secondary-css',
        label: 'CSS',
        code: `.secondaryButton {
  background: transparent;
  border: 1px solid var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}`,
        highlightedHtml: `<span class="sel">.secondaryButton</span> {
  <span class="prop">background</span>: <span class="val">transparent</span>;
  <span class="prop">border</span>: <span class="val">1px solid var(--ifm-color-primary)</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-color-primary)</span>;
}`,
      },
      {
        id: 'secondary-tsx',
        label: 'TSX',
        code: `<button className={styles.secondaryButton} type="button">
  下書きに戻す
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.secondaryButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  下書きに戻す
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'tertiary',
    name: 'Tertiary',
    description: '詳細や補足的な操作に向きます。',
    previewKind: 'tertiary',
    tabs: [
      {
        id: 'tertiary-css',
        label: 'CSS',
        code: `.tertiaryButton {
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, transparent);
  border: 1px solid transparent;
  color: var(--ifm-color-primary);
}`,
        highlightedHtml: `<span class="sel">.tertiaryButton</span> {
  <span class="prop">background</span>: <span class="val">color-mix(in srgb, var(--ifm-color-primary) 10%, transparent)</span>;
  <span class="prop">border</span>: <span class="val">1px solid transparent</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-color-primary)</span>;
}`,
      },
      {
        id: 'tertiary-tsx',
        label: 'TSX',
        code: `<button className={styles.tertiaryButton} type="button">
  変更点を確認
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.tertiaryButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  変更点を確認
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'ghost',
    name: 'Ghost',
    description: '一覧やカード内の軽い補助操作です。',
    previewKind: 'ghost',
    tabs: [
      {
        id: 'ghost-css',
        label: 'CSS',
        code: `.ghostButton {
  background: transparent;
  border: 1px solid transparent;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ifm-color-emphasis-300) 65%, transparent);
  color: var(--ifm-font-color-base);
}`,
        highlightedHtml: `<span class="sel">.ghostButton</span> {
  <span class="prop">background</span>: <span class="val">transparent</span>;
  <span class="prop">border</span>: <span class="val">1px solid transparent</span>;
  <span class="prop">box-shadow</span>: <span class="val">inset 0 0 0 1px color-mix(in srgb, var(--ifm-color-emphasis-300) 65%, transparent)</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-font-color-base)</span>;
}`,
      },
      {
        id: 'ghost-tsx',
        label: 'TSX',
        code: `<button className={styles.ghostButton} type="button">
  キャンセル
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.ghostButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  キャンセル
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
] satisfies VariantDefinition[];

const guideCards = [
  {
    id: 'primary-pair',
    tone: 'do',
    description:
      '主行動は 1 つに絞り、補助操作は secondary で一段弱めると優先順位が伝わりやすくなります。',
    previewKind: 'primary-pair',
  },
  {
    id: 'double-primary',
    tone: 'dont',
    description:
      '同じ強さの primary を並べると、どちらを先に押すべきか瞬時に判断しにくくなります。',
    previewKind: 'double-primary',
  },
  {
    id: 'supporting-actions',
    tone: 'do',
    description:
      '詳細確認やキャンセルは tertiary / ghost に落として、主行動との強弱を維持します。',
    previewKind: 'supporting-actions',
  },
  {
    id: 'ghost-primary',
    tone: 'dont',
    description:
      '主行動まで ghost に落とすと、画面内でどの操作を優先すべきか伝わりません。',
    previewKind: 'ghost-primary',
  },
] satisfies GuideCard[];

function VariantPreview({
  previewKind,
}: {
  previewKind: VariantPreviewKind;
}): ReactNode {
  if (previewKind === 'primary') {
    return (
      <button className={`${styles.button} ${styles.primaryButton}`} type="button">
        変更を保存
      </button>
    );
  }

  if (previewKind === 'secondary') {
    return (
      <button className={`${styles.button} ${styles.secondaryButton}`} type="button">
        下書きに戻す
      </button>
    );
  }

  if (previewKind === 'tertiary') {
    return (
      <button className={`${styles.button} ${styles.tertiaryButton}`} type="button">
        変更点を確認
      </button>
    );
  }

  return (
    <button className={`${styles.button} ${styles.ghostButton}`} type="button">
      キャンセル
    </button>
  );
}

function GuidePreview({
  previewKind,
}: {
  previewKind: GuidePreviewKind;
}): ReactNode {
  if (previewKind === 'primary-pair') {
    return (
      <div className={styles.demoButtonRow}>
        <button className={`${styles.button} ${styles.secondaryButton}`} type="button">
          下書きに戻す
        </button>
        <button className={`${styles.button} ${styles.primaryButton}`} type="button">
          変更を保存
        </button>
      </div>
    );
  }

  if (previewKind === 'double-primary') {
    return (
      <div className={styles.demoButtonRow}>
        <button className={`${styles.button} ${styles.primaryButton}`} type="button">
          下書きに戻す
        </button>
        <button className={`${styles.button} ${styles.primaryButton}`} type="button">
          変更を保存
        </button>
      </div>
    );
  }

  if (previewKind === 'supporting-actions') {
    return (
      <div className={styles.demoButtonRow}>
        <button className={`${styles.button} ${styles.tertiaryButton}`} type="button">
          変更点を確認
        </button>
        <button className={`${styles.button} ${styles.ghostButton}`} type="button">
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <button className={`${styles.button} ${styles.ghostButton}`} type="button">
      変更を保存
    </button>
  );
}

function VariantCodePanel({
  tabs,
}: {
  tabs: CodeTab[];
}): ReactNode {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

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
              onClick={() => setActiveTabId(tab.id)}
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
        <pre dangerouslySetInnerHTML={{__html: activeTab.highlightedHtml}} />
      </div>
    </div>
  );
}

export default function HierarchyButtonReferenceContent({
  entry,
}: HierarchyButtonReferenceContentProps): ReactNode {
  const notes: NoteCard[] = [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'spacing', label: '余白 / サイズ', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];

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
                <div className={styles.variantDemo}>
                  <VariantPreview previewKind={variant.previewKind} />
                </div>
                <VariantCodePanel tabs={variant.tabs} />
              </div>
            </article>
          ))}
        </div>

      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>設計メモ</div>
        <h2 className={styles.sectionTitle}>課題 / 解決方法 / 使いどころ</h2>

        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <div className={styles.noteCard} key={note.id}>
              <span className={styles.noteTag}>{note.label}</span>
              <p>{note.value}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>ガイドライン</div>
        <h2 className={styles.sectionTitle}>Do&apos;s &amp; Don&apos;ts</h2>

        <div className={styles.guideGrid}>
          {guideCards.map((guide) => (
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
                <div className={styles.guideDemo}>
                  <GuidePreview previewKind={guide.previewKind} />
                </div>
                <p>{guide.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
