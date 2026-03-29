import type {ReactNode} from 'react';
import clsx from 'clsx';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: ButtonPatternEntry;
};

type IconProps = {
  className?: string;
  size?: number;
};

function TrashIcon({className, size = 16}: IconProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function PauseOffIcon({className, size = 16}: IconProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" x2="9" y1="9" y2="15" />
      <line x1="9" x2="15" y1="9" y2="15" />
    </svg>
  );
}

const variants = [
  {
    id: 'filled',
    name: 'Filled',
    description: '最も強い危険表現。完全削除など不可逆な操作に使います。',
    preview: (
      <button className={clsx(styles.button, styles.filledButton)} type="button">
        <TrashIcon className={styles.buttonIcon} />
        削除する
      </button>
    ),
    tabs: [
      {
        id: 'filled-css',
        label: 'CSS',
        code: `.filledButton {
  background: var(--ifm-color-danger);
  border: 1px solid var(--ifm-color-danger);
  box-shadow: 0 0.6rem 1.2rem color-mix(in srgb, var(--ifm-color-danger) 18%, transparent);
  color: #ffffff;
}`,
        highlightedHtml: `<span class="sel">.filledButton</span> {
  <span class="prop">background</span>: <span class="val">var(--ifm-color-danger)</span>;
  <span class="prop">border</span>: <span class="val">1px solid var(--ifm-color-danger)</span>;
  <span class="prop">box-shadow</span>: <span class="val">0 0.6rem 1.2rem color-mix(in srgb, var(--ifm-color-danger) 18%, transparent)</span>;
  <span class="prop">color</span>: <span class="val">#ffffff</span>;
}`,
      },
      {
        id: 'filled-tsx',
        label: 'TSX',
        code: `<button className={clsx(styles.button, styles.filledButton)} type="button">
  <TrashIcon />
  削除する
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.filledButton</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">TrashIcon</span> <span class="punct">/&gt;</span>
  削除する
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'outlined',
    name: 'Outlined',
    description: 'やや弱い危険表現。復元可能な停止操作や解除に向きます。',
    preview: (
      <button className={clsx(styles.button, styles.outlinedButton)} type="button">
        <PauseOffIcon className={styles.buttonIcon} />
        公開停止
      </button>
    ),
    tabs: [
      {
        id: 'outlined-css',
        label: 'CSS',
        code: `.outlinedButton {
  background: color-mix(in srgb, var(--ifm-color-danger) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--ifm-color-danger) 36%, var(--ifm-color-emphasis-300));
  color: var(--ifm-color-danger);
}`,
        highlightedHtml: `<span class="sel">.outlinedButton</span> {
  <span class="prop">background</span>: <span class="val">color-mix(in srgb, var(--ifm-color-danger) 10%, transparent)</span>;
  <span class="prop">border</span>: <span class="val">1px solid color-mix(in srgb, var(--ifm-color-danger) 36%, var(--ifm-color-emphasis-300))</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-color-danger)</span>;
}`,
      },
      {
        id: 'outlined-tsx',
        label: 'TSX',
        code: `<button className={clsx(styles.button, styles.outlinedButton)} type="button">
  <PauseOffIcon />
  公開停止
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.outlinedButton</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">PauseOffIcon</span> <span class="punct">/&gt;</span>
  公開停止
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'ghost',
    name: 'Ghost',
    description: '確認ダイアログ内のセカンダリに置き、単体の主操作には使いません。',
    preview: (
      <button className={clsx(styles.button, styles.ghostDangerButton)} type="button">
        取り消す
      </button>
    ),
    tabs: [
      {
        id: 'ghost-css',
        label: 'CSS',
        code: `.ghostDangerButton {
  background: transparent;
  border: 1px solid transparent;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ifm-color-danger) 32%, transparent);
  color: var(--ifm-color-danger);
}`,
        highlightedHtml: `<span class="sel">.ghostDangerButton</span> {
  <span class="prop">background</span>: <span class="val">transparent</span>;
  <span class="prop">border</span>: <span class="val">1px solid transparent</span>;
  <span class="prop">box-shadow</span>: <span class="val">inset 0 0 0 1px color-mix(in srgb, var(--ifm-color-danger) 32%, transparent)</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-color-danger)</span>;
}`,
      },
      {
        id: 'ghost-tsx',
        label: 'TSX',
        code: `<button className={clsx(styles.button, styles.ghostDangerButton)} type="button">
  取り消す
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.ghostDangerButton</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  取り消す
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'icon-only',
    name: 'Icon only',
    description: 'テーブル行内など省スペース向けで、`aria-label` が必須です。',
    preview: (
      <button
        aria-label="削除"
        className={clsx(styles.button, styles.outlinedButton, styles.iconOnlyButton)}
        type="button">
        <TrashIcon className={styles.buttonIcon} size={15} />
      </button>
    ),
    tabs: [
      {
        id: 'icon-only-css',
        label: 'CSS',
        code: `.iconOnlyButton {
  inline-size: 2.75rem;
  padding-inline: 0;
}`,
        highlightedHtml: `<span class="sel">.iconOnlyButton</span> {
  <span class="prop">inline-size</span>: <span class="val">2.75rem</span>;
  <span class="prop">padding-inline</span>: <span class="val">0</span>;
}`,
      },
      {
        id: 'icon-only-tsx',
        label: 'TSX',
        code: `<button
  aria-label="削除"
  className={clsx(styles.button, styles.outlinedButton, styles.iconOnlyButton)}
  type="button">
  <TrashIcon size={15} />
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">aria-label</span><span class="punct">=</span><span class="str">"削除"</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.outlinedButton, styles.iconOnlyButton</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">TrashIcon</span> <span class="attr">size</span><span class="punct">={</span><span class="val">15</span><span class="punct">}</span> <span class="punct">/&gt;</span>
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
] satisfies readonly ButtonReferenceVariant[];

const guides = [
  {
    id: 'confirm-pair',
    tone: 'do',
    description:
      '確認ダイアログでは destructive を右端に置き、キャンセルとの差を十分に付けて誤操作を防ぎます。',
    preview: (
      <div className={styles.actionRow}>
        <button className={clsx(styles.button, styles.neutralButton)} type="button">
          キャンセル
        </button>
        <button className={clsx(styles.button, styles.filledButton)} type="button">
          削除する
        </button>
      </div>
    ),
  },
  {
    id: 'same-buttons',
    tone: 'dont',
    description:
      '同じ強さのボタンを並べると、どちらが危険操作か一瞬で判別しにくくなります。',
    preview: (
      <div className={styles.actionRow}>
        <button className={clsx(styles.button, styles.badSameButton)} type="button">
          キャンセル
        </button>
        <button className={clsx(styles.button, styles.badSameButton)} type="button">
          削除する
        </button>
      </div>
    ),
  },
  {
    id: 'explicit-label',
    tone: 'do',
    description:
      'ラベルには結果を具体的に書きます。「削除」より「完全に削除する」の方が重みが伝わります。',
    preview: (
      <button className={clsx(styles.button, styles.filledButton)} type="button">
        <TrashIcon className={styles.buttonIcon} />
        完全に削除する
      </button>
    ),
  },
  {
    id: 'ambiguous-label',
    tone: 'dont',
    description:
      '「OK」のような曖昧なラベルだけでは、危険操作の結果を事前に想像しづらくなります。',
    preview: (
      <button className={clsx(styles.button, styles.badPlainButton)} type="button">
        OK
      </button>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

/** Renders the reference-style detail content for destructive button patterns. */
export default function DestructiveButtonReferenceContent({
  entry,
}: Props): ReactNode {
  return (
    <ButtonReferenceLayout
      entry={entry}
      guides={guides}
      variantNote="色だけに頼らず、ラベルと確認導線でも危険性を伝えます。icon-only では `aria-label` を必ず付けます。"
      variants={variants}
    />
  );
}
