import type {ReactNode} from 'react';
import clsx from 'clsx';
import ButtonReferenceLayout, {type ButtonReferenceVariant} from '@site/src/components/ButtonReferenceLayout';
import galleryStyles from '@site/src/components/ButtonPatternGallery/styles.module.css';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

type Props = {
  entry: ButtonPatternEntry;
};

const variants = [
  {
    id: 'compact',
    name: 'コンパクト',
    description: '高密度なツールバーや補助操作向けです。',
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.primaryButton,
          galleryStyles.compactButton,
        )}
        type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          +
        </span>
        コンパクト
      </button>
    ),
    tabs: [
      {
        id: 'compact-css',
        label: 'CSS',
        code: `.buttonCompact {
  gap: 0.35rem;
  min-height: 2rem;
  padding: 0.35rem 0.7rem;
}`,
        highlightedHtml: `<span class="sel">.buttonCompact</span> {
  <span class="prop">gap</span>: <span class="val">0.35rem</span>;
  <span class="prop">min-height</span>: <span class="val">2rem</span>;
  <span class="prop">padding</span>: <span class="val">0.35rem 0.7rem</span>;
}`,
      },
      {
        id: 'compact-tsx',
        label: 'TSX',
        code: `<button className={styles.buttonCompact} type="button">
  <span aria-hidden="true">+</span>
  コンパクト
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.buttonCompact</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>+<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
  コンパクト
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'default',
    name: '標準',
    description: '一般的なフォームや一覧での標準です。',
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.primaryButton,
          galleryStyles.defaultButton,
        )}
        type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          +
        </span>
        標準
      </button>
    ),
    tabs: [
      {
        id: 'default-size-css',
        label: 'CSS',
        code: `.buttonDefault {
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.5rem 0.9rem;
}`,
        highlightedHtml: `<span class="sel">.buttonDefault</span> {
  <span class="prop">gap</span>: <span class="val">0.5rem</span>;
  <span class="prop">min-height</span>: <span class="val">2.5rem</span>;
  <span class="prop">padding</span>: <span class="val">0.5rem 0.9rem</span>;
}`,
      },
      {
        id: 'default-size-tsx',
        label: 'TSX',
        code: `<button className={styles.buttonDefault} type="button">
  <span aria-hidden="true">+</span>
  標準
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.buttonDefault</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>+<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
  標準
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'comfortable',
    name: 'ゆったり',
    description: 'タッチ中心の画面や主 CTA に向きます。',
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.primaryButton,
          galleryStyles.comfortableButton,
        )}
        type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          +
        </span>
        ゆったり
      </button>
    ),
    tabs: [
      {
        id: 'comfortable-css',
        label: 'CSS',
        code: `.buttonComfortable {
  gap: 0.65rem;
  min-height: 2.75rem;
  padding: 0.65rem 1.1rem;
}`,
        highlightedHtml: `<span class="sel">.buttonComfortable</span> {
  <span class="prop">gap</span>: <span class="val">0.65rem</span>;
  <span class="prop">min-height</span>: <span class="val">2.75rem</span>;
  <span class="prop">padding</span>: <span class="val">0.65rem 1.1rem</span>;
}`,
      },
      {
        id: 'comfortable-tsx',
        label: 'TSX',
        code: `<button className={styles.buttonComfortable} type="button">
  <span aria-hidden="true">+</span>
  ゆったり
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.buttonComfortable</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>+<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
  ゆったり
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
] satisfies readonly ButtonReferenceVariant[];

/** Renders the reference-style detail content for spacing and sizing patterns. */
export default function SpacingAndSizingReferenceContent({
  entry,
}: Props): ReactNode {
  return (
    <ButtonReferenceLayout
      entry={entry}
      variantNote="サイズ差は高さだけでなく padding と icon gap も連動させ、touch target を損なわない基準を保ちます。"
      variantSectionLabel="サイズ"
      variants={variants}
    />
  );
}
