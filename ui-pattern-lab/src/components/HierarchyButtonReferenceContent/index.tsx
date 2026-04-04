import type {ReactNode} from 'react';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: ButtonPatternEntry;
};

type HierarchyButtonTone = 'primary' | 'secondary' | 'tertiary' | 'ghost';

type PreviewButtonProps = {
  label: string;
  tone: HierarchyButtonTone;
};

function getToneClassName(tone: HierarchyButtonTone): string {
  if (tone === 'primary') {
    return styles.primaryButton;
  }

  if (tone === 'secondary') {
    return styles.secondaryButton;
  }

  if (tone === 'tertiary') {
    return styles.tertiaryButton;
  }

  return styles.ghostButton;
}

function PreviewButton({label, tone}: PreviewButtonProps): ReactNode {
  return (
    <button className={`${styles.button} ${getToneClassName(tone)}`} type="button">
      {label}
    </button>
  );
}

const variants = [
  {
    id: 'primary',
    name: 'Primary',
    description: '最も重要な主行動は 1 つに絞ります。',
    preview: <PreviewButton label="変更を保存" tone="primary" />,
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
    preview: <PreviewButton label="下書きに戻す" tone="secondary" />,
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
    preview: <PreviewButton label="変更点を確認" tone="tertiary" />,
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
    preview: <PreviewButton label="キャンセル" tone="ghost" />,
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
] satisfies readonly ButtonReferenceVariant[];

const guides = [
  {
    id: 'primary-pair',
    tone: 'do',
    description:
      '主行動は 1 つに絞り、補助操作は secondary で一段弱めると優先順位が伝わりやすくなります。',
    preview: (
      <div className={styles.demoButtonRow}>
        <PreviewButton label="下書きに戻す" tone="secondary" />
        <PreviewButton label="変更を保存" tone="primary" />
      </div>
    ),
  },
  {
    id: 'double-primary',
    tone: 'dont',
    description:
      '同じ強さの primary を並べると、どちらを先に押すべきか瞬時に判断しにくくなります。',
    preview: (
      <div className={styles.demoButtonRow}>
        <PreviewButton label="下書きに戻す" tone="primary" />
        <PreviewButton label="変更を保存" tone="primary" />
      </div>
    ),
  },
  {
    id: 'supporting-actions',
    tone: 'do',
    description:
      '詳細確認やキャンセルは tertiary / ghost に落として、主行動との強弱を維持します。',
    preview: (
      <div className={styles.demoButtonRow}>
        <PreviewButton label="変更点を確認" tone="tertiary" />
        <PreviewButton label="キャンセル" tone="ghost" />
      </div>
    ),
  },
  {
    id: 'ghost-primary',
    tone: 'dont',
    description:
      '主行動まで ghost に落とすと、画面内でどの操作を優先すべきか伝わりません。',
    preview: <PreviewButton label="変更を保存" tone="ghost" />,
  },
] satisfies readonly ButtonReferenceGuide[];

export default function HierarchyButtonReferenceContent({entry}: Props): ReactNode {
  return (
    <ButtonReferenceLayout
      entry={entry}
      guides={guides}
      variantSectionLabel="バリアント"
      variants={variants}
    />
  );
}
