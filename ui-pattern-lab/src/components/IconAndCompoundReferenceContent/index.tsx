import type {ReactNode} from 'react';
import clsx from 'clsx';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import galleryStyles from '@site/src/components/ButtonPatternGallery/styles.module.css';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

type Props = {
  entry: ButtonPatternEntry;
};

const variants = [
  {
    id: 'leading-icon',
    name: 'Leading icon',
    description: 'ラベルを主役にしつつアイコンで補足します。',
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.primaryButton)} type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          +
        </span>
        新規作成
      </button>
    ),
    tabs: [
      {
        id: 'leading-icon-css',
        label: 'CSS',
        code: `.iconButton {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  min-height: 2.75rem;
}`,
        highlightedHtml: `<span class="sel">.iconButton</span> {
  <span class="prop">align-items</span>: <span class="val">center</span>;
  <span class="prop">display</span>: <span class="val">inline-flex</span>;
  <span class="prop">gap</span>: <span class="val">0.5rem</span>;
  <span class="prop">min-height</span>: <span class="val">2.75rem</span>;
}`,
      },
      {
        id: 'leading-icon-tsx',
        label: 'TSX',
        code: `<button className={styles.iconButton} type="button">
  <span aria-hidden="true">+</span>
  新規作成
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.iconButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>+<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
  新規作成
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'trailing-icon',
    name: 'Trailing icon',
    description: '次の導線や展開を補助する配置です。',
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.secondaryButton)} type="button">
        詳細を見る
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          →
        </span>
      </button>
    ),
    tabs: [
      {
        id: 'trailing-icon-css',
        label: 'CSS',
        code: `.iconButtonTrailing {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  justify-content: center;
}`,
        highlightedHtml: `<span class="sel">.iconButtonTrailing</span> {
  <span class="prop">align-items</span>: <span class="val">center</span>;
  <span class="prop">display</span>: <span class="val">inline-flex</span>;
  <span class="prop">gap</span>: <span class="val">0.5rem</span>;
  <span class="prop">justify-content</span>: <span class="val">center</span>;
}`,
      },
      {
        id: 'trailing-icon-tsx',
        label: 'TSX',
        code: `<button className={styles.iconButtonTrailing} type="button">
  詳細を見る
  <span aria-hidden="true">→</span>
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.iconButtonTrailing</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  詳細を見る
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>→<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'icon-only',
    name: 'Icon only',
    description: 'visible label がない場合は accessible name が必須です。',
    preview: (
      <button
        aria-label="検索"
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.ghostButton,
          galleryStyles.iconOnlyButton,
        )}
        type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          ⌕
        </span>
      </button>
    ),
    tabs: [
      {
        id: 'icon-only-css',
        label: 'CSS',
        code: `.iconOnlyButton {
  inline-size: 2.75rem;
  justify-content: center;
  padding-inline: 0;
}`,
        highlightedHtml: `<span class="sel">.iconOnlyButton</span> {
  <span class="prop">inline-size</span>: <span class="val">2.75rem</span>;
  <span class="prop">justify-content</span>: <span class="val">center</span>;
  <span class="prop">padding-inline</span>: <span class="val">0</span>;
}`,
      },
      {
        id: 'icon-only-tsx',
        label: 'TSX',
        code: `<button aria-label="検索" className={styles.iconOnlyButton} type="button">
  <span aria-hidden="true">⌕</span>
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">aria-label</span><span class="punct">=</span><span class="str">"検索"</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.iconOnlyButton</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span><span class="punct">&gt;</span>⌕<span class="punct">&lt;/</span><span class="tag">span</span><span class="punct">&gt;</span>
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'split-button',
    name: 'Split button',
    description: '主操作と補助メニューを分けて扱います。',
    preview: (
      <div className={galleryStyles.splitButton}>
        <button
          className={clsx(
            galleryStyles.demoButton,
            galleryStyles.primaryButton,
            galleryStyles.splitPrimary,
          )}
          type="button">
          共有
        </button>
        <button
          aria-label="共有オプション"
          className={clsx(
            galleryStyles.demoButton,
            galleryStyles.secondaryButton,
            galleryStyles.splitSecondary,
          )}
          type="button">
          ▾
        </button>
      </div>
    ),
    tabs: [
      {
        id: 'split-button-css',
        label: 'CSS',
        code: `.splitButton {
  display: inline-flex;
}

.splitPrimary {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.splitSecondary {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  min-width: 2.75rem;
}`,
        highlightedHtml: `<span class="sel">.splitButton</span> {
  <span class="prop">display</span>: <span class="val">inline-flex</span>;
}

<span class="sel">.splitPrimary</span> {
  <span class="prop">border-bottom-right-radius</span>: <span class="val">0</span>;
  <span class="prop">border-top-right-radius</span>: <span class="val">0</span>;
}

<span class="sel">.splitSecondary</span> {
  <span class="prop">border-bottom-left-radius</span>: <span class="val">0</span>;
  <span class="prop">border-top-left-radius</span>: <span class="val">0</span>;
  <span class="prop">min-width</span>: <span class="val">2.75rem</span>;
}`,
      },
      {
        id: 'split-button-tsx',
        label: 'TSX',
        code: `<div className={styles.splitButton}>
  <button className={styles.splitPrimary} type="button">共有</button>
  <button aria-label="共有オプション" className={styles.splitSecondary} type="button">
    ▾
  </button>
</div>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">div</span> <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.splitButton</span><span class="punct">}</span><span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">button</span> <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.splitPrimary</span><span class="punct">}</span> <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span><span class="punct">&gt;</span>共有<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">button</span> <span class="attr">aria-label</span><span class="punct">=</span><span class="str">"共有オプション"</span> <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.splitSecondary</span><span class="punct">}</span> <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span><span class="punct">&gt;</span>▾<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>
<span class="punct">&lt;/</span><span class="tag">div</span><span class="punct">&gt;</span>`,
      },
    ],
  },
] satisfies readonly ButtonReferenceVariant[];

const guides = [
  {
    id: 'icon-label-do',
    tone: 'do',
    description:
      'icon-only は必ず accessible name とセットで扱い、ラベルを見せない分だけ意味を補います。',
    preview: (
      <button
        aria-label="検索"
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.ghostButton,
          galleryStyles.iconOnlyButton,
        )}
        type="button">
        <span aria-hidden="true" className={galleryStyles.buttonIcon}>
          ⌕
        </span>
      </button>
    ),
  },
  {
    id: 'split-role-dont',
    tone: 'dont',
    description:
      '主操作と補助メニューを 1 つの曖昧なボタンにまとめると、押した結果を予測しにくくなります。',
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.primaryButton)} type="button">
        共有 ▾
      </button>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

/** Renders the reference-style detail content for icon and compound buttons. */
export default function IconAndCompoundReferenceContent({
  entry,
}: Props): ReactNode {
  return (
    <ButtonReferenceLayout
      entry={entry}
      guides={guides}
      variantNote="icon-only では `aria-label` を忘れず、split button は主操作と補助操作を別ボタンとして読めるようにします。"
      variants={variants}
    />
  );
}
