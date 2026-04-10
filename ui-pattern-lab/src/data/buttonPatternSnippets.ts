import type {
  ButtonPatternEntryId,
  ButtonPatternSnippets,
} from '@site/src/data/buttonPatternTypes';

export const buttonPatternSnippets: Record<
  ButtonPatternEntryId,
  ButtonPatternSnippets
> = {
  'hierarchy-and-emphasis': {
    snippetSummary:
      '主行動と補助行動を同じ行に置くときの、見た目の強弱をそろえる最小構成です。',
    items: [
      {
        id: 'hierarchy-and-emphasis-css',
        label: 'CSS',
        language: 'css',
        code: `.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.primaryButton {
  background: var(--ifm-color-primary);
  color: #ffffff;
}

.secondaryButton {
  background: transparent;
  border: 1px solid var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}

.ghostButton {
  background: transparent;
  color: var(--ifm-font-color-base);
}`,
        note:
          '最重要アクションだけを強い塗りにし、それ以外は段階的に抑えると意思決定の軸がぶれにくくなります。',
      },
      {
        id: 'hierarchy-and-emphasis-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.actions}>
  <button className={styles.primaryButton} type="button">
    変更を保存
  </button>
  <button className={styles.secondaryButton} type="button">
    下書きに戻す
  </button>
  <button className={styles.ghostButton} type="button">
    キャンセル
  </button>
</div>`,
        note:
          '同じ行に複数のボタンを置く場合は、primary を 1 つに絞ると視覚的な優先順位が保ちやすくなります。',
      },
    ],
  },
  'interactive-states': {
    snippetSummary:
      'hover / focus-visible / disabled / loading の状態を、レイアウトを崩さず見せ分ける例です。',
    items: [
      {
        id: 'interactive-states-css',
        label: 'CSS',
        language: 'css',
        code: `.button {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  min-width: 9rem;
}

.button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 35%, white);
  outline-offset: 2px;
}

.button[disabled] {
  cursor: not-allowed;
  opacity: 0.48;
}

.spinner {
  animation: spin 0.8s linear infinite;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 999px;
  height: 0.9rem;
  width: 0.9rem;
}`,
        note:
          'loading でも min-width と icon gap を確保しておくと、押下後にボタン幅が跳ねにくくなります。',
      },
      {
        id: 'interactive-states-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<button className={styles.button} type="button">
  保存する
</button>

<button className={styles.button} disabled type="button">
  入力待ち
</button>

<button aria-busy="true" className={styles.button} disabled type="button">
  <span className={styles.spinner} aria-hidden="true" />
  保存中...
</button>`,
        note:
          'hover は補助的な強調にとどめ、focus-visible と loading は操作可否や現在の状態が分かるよう別のシグナルを重ねます。',
      },
    ],
  },
  'destructive-actions': {
    snippetSummary:
      '破壊的な操作は destructive / warning / secondary cancel を並べて、誤操作を防ぎます。',
    items: [
      {
        id: 'destructive-actions-css',
        label: 'CSS',
        language: 'css',
        code: `.dialogActions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.dangerButton {
  background: var(--button-danger-bg);
  border-color: var(--button-danger-border);
  color: var(--button-danger-text);
}

.warningButton {
  background: var(--button-warning-bg);
  border-color: var(--button-warning-border);
  color: var(--button-warning-text);
}`,
        note:
          'danger と warning を同列にせず、取り返しのつかない操作だけを最も強く扱うのが基本です。',
      },
      {
        id: 'destructive-actions-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.dialogActions}>
  <button className={styles.secondaryButton} type="button">
    キャンセル
  </button>
  <button className={styles.warningButton} type="button">
    一時停止
  </button>
  <button className={styles.dangerButton} type="button">
    完全に削除する
  </button>
</div>`,
        note:
          'キャンセルをすぐ近くに置き、危険度に応じて warning と destructive を分けると確認導線が明確になります。',
      },
    ],
  },
  'icon-and-compound-actions': {
    snippetSummary:
      'leading / trailing / icon-only / split button を一貫した gap と accessible name で扱う例です。',
    items: [
      {
        id: 'icon-and-compound-actions-css',
        label: 'CSS',
        language: 'css',
        code: `.iconButton {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  min-height: 2.75rem;
}

.iconOnlyButton {
  inline-size: 2.75rem;
  justify-content: center;
  padding-inline: 0;
}

.splitButton {
  display: inline-flex;
}`,
        note:
          'icon-only は見た目だけでは意味が分からないため、コンパクトなサイズ設計と accessible name をセットで扱います。',
      },
      {
        id: 'icon-and-compound-actions-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<button className={styles.iconButton} type="button">
  <span aria-hidden="true">+</span>
  新規作成
</button>

<button
  aria-label="検索"
  className={clsx(styles.iconButton, styles.iconOnlyButton)}
  type="button">
  <span aria-hidden="true">⌕</span>
</button>

<div className={styles.splitButton}>
  <button className={styles.primaryButton} type="button">共有</button>
  <button aria-label="共有オプション" className={styles.secondaryButton} type="button">
    ▾
  </button>
</div>`,
        note:
          'split button は主操作と補助メニューを明確に分け、icon-only には必ず `aria-label` を付けます。',
      },
    ],
  },
  'button-group': {
    snippetSummary:
      '関連するボタンを `role="group"` で束ね、connected group と主操作の優先順位をそろえる最小例です。',
    items: [
      {
        id: 'button-group-css',
        label: 'CSS',
        language: 'css',
        code: `.actionGroup {
  display: inline-flex;
  gap: 0;
}

.actionGroup > * + * {
  margin-inline-start: -1px;
}

.groupButton {
  border-radius: 0;
}

.groupButton:first-child {
  border-bottom-left-radius: 999px;
  border-top-left-radius: 999px;
}

.groupButton:last-child {
  border-bottom-right-radius: 999px;
  border-top-right-radius: 999px;
}`,
        note:
          'Button Group は見た目だけでなく、境界共有と近接配置で「同じ対象への操作群」だと読めることが重要です。',
      },
      {
        id: 'button-group-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div aria-label="カード操作" className={styles.actionGroup} role="group">
  <button className={styles.groupButton} type="button">
    比較
  </button>
  <button className={styles.groupButton} type="button">
    複製
  </button>
  <button className={styles.groupButtonPrimary} type="button">
    公開
  </button>
</div>`,
        note:
          'pressed の意味づけが主役になる場合は toggle-and-selection へ分け、Button Group ではまずグループ境界と役割分担をそろえます。',
      },
    ],
  },
  'toggle-and-selection': {
    snippetSummary:
      '`aria-pressed` を使ったトグルと、複数候補から 1 つを選ぶセグメント UI の最小例です。',
    items: [
      {
        id: 'toggle-and-selection-css',
        label: 'CSS',
        language: 'css',
        code: `.toggleButton[aria-pressed='true'] {
  background: color-mix(in srgb, var(--ifm-color-primary) 14%, transparent);
  border-color: var(--ifm-color-primary);
}

.segmentGroup {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.segmentButton[aria-pressed='true'] {
  background: var(--ifm-color-primary);
  color: #ffffff;
}`,
        note:
          'pressed / selected は見た目だけでなく、属性値でも現在状態を表すと支援技術との整合が取りやすくなります。',
      },
      {
        id: 'toggle-and-selection-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const [isPinned, setIsPinned] = useState(false);
const [selectedView, setSelectedView] = useState<'list' | 'board'>('list');

<button
  aria-pressed={isPinned}
  className={styles.toggleButton}
  onClick={() => setIsPinned((current) => !current)}
  type="button">
  比較対象に固定
</button>

<div className={styles.segmentGroup} role="group" aria-label="表示形式">
  {(['list', 'board'] as const).map((view) => (
    <button
      aria-pressed={selectedView === view}
      className={styles.segmentButton}
      key={view}
      onClick={() => setSelectedView(view)}
      type="button">
      {view === 'list' ? 'リスト' : 'ボード'}
    </button>
  ))}
</div>`,
        note:
          '単独トグルと選択群では意味が異なるため、pressed の意味と選択可能数を説明文でも補足します。',
      },
    ],
  },
  'spacing-and-sizing': {
    snippetSummary:
      'compact / default / comfortable のサイズ差と、padding・min-height・icon gap の基準をそろえる例です。',
    items: [
      {
        id: 'spacing-and-sizing-css',
        label: 'CSS',
        language: 'css',
        code: `.buttonCompact {
  gap: 0.35rem;
  min-height: 2rem;
  padding: 0.35rem 0.7rem;
}

.buttonDefault {
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.5rem 0.9rem;
}

.buttonComfortable {
  gap: 0.65rem;
  min-height: 2.75rem;
  padding: 0.65rem 1.1rem;
}`,
        note:
          'サイズ違いは高さだけでなく、icon gap と左右 padding も一緒に変えると密度が自然に見えます。',
      },
      {
        id: 'spacing-and-sizing-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<button className={styles.buttonCompact} type="button">
  <span aria-hidden="true">+</span>
  Compact
</button>
<button className={styles.buttonDefault} type="button">
  <span aria-hidden="true">+</span>
  Default
</button>
<button className={styles.buttonComfortable} type="button">
  <span aria-hidden="true">+</span>
  Comfortable
</button>`,
        note:
          'タッチ中心の画面では comfortable を基準にし、密度優先のツールバーでは compact を限定的に使うと整合しやすくなります。',
      },
    ],
  },
};
