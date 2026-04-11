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

const guides = [
  {
    id: 'toolbar-do',
    tone: 'do',
    description:
      'toolbar 名と cluster label を付け、同じ作業文脈の button 群だけを 1 本の帯にまとめます。',
    preview: (
      <div aria-label="編集ツール" className={galleryStyles.toolbarFrame} role="toolbar">
        <div className={galleryStyles.toolbarCluster}>
          <span className={galleryStyles.toolbarLabel}>書式</span>
          <div aria-label="文字装飾" className={galleryStyles.buttonGroupConnected} role="group">
            <button
              aria-pressed="true"
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
                galleryStyles.groupLeadingButton,
                galleryStyles.isSelected,
              )}
              type="button">
              太字
            </button>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
                galleryStyles.groupMiddleButton,
              )}
              type="button">
              斜体
            </button>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
                galleryStyles.groupTrailingButton,
              )}
              type="button">
              引用
            </button>
          </div>
        </div>
        <span aria-hidden="true" className={galleryStyles.toolbarDivider} />
        <div className={galleryStyles.toolbarCluster}>
          <span className={galleryStyles.toolbarLabel}>挿入</span>
          <button
            className={clsx(
              galleryStyles.demoButton,
              galleryStyles.secondaryButton,
              galleryStyles.compactButton,
            )}
            type="button">
            リンク
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'toolbar-dont',
    tone: 'dont',
    description:
      '無関係な操作や危険操作をラベルなしで並べると、どこまでが同じ作業帯か判断しづらくなります。',
    preview: (
      <div className={galleryStyles.buttonToolbar}>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.secondaryButton)} type="button">
          フィルタ
        </button>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.ghostButton)} type="button">
          ヘルプ
        </button>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.dangerButton)} type="button">
          完全削除
        </button>
      </div>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

const variants = [
  {
    id: 'formatting-toolbar',
    name: '書式ツールバー',
    description: '編集系の button group を cluster label 付きで束ねる基本形です。',
    preview: (
      <div className={galleryStyles.buttonStack}>
        <div aria-label="編集ツール" className={galleryStyles.toolbarFrame} role="toolbar">
          <div className={galleryStyles.toolbarCluster}>
            <span className={galleryStyles.toolbarLabel}>書式</span>
            <div aria-label="文字装飾" className={galleryStyles.buttonGroupConnected} role="group">
              <button
                aria-pressed="true"
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupLeadingButton,
                  galleryStyles.isSelected,
                )}
                type="button">
                太字
              </button>
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupMiddleButton,
                )}
                type="button">
                斜体
              </button>
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupTrailingButton,
                )}
                type="button">
                引用
              </button>
            </div>
          </div>
          <span aria-hidden="true" className={galleryStyles.toolbarDivider} />
          <div className={galleryStyles.toolbarCluster}>
            <span className={galleryStyles.toolbarLabel}>挿入</span>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
              )}
              type="button">
              リンク
            </button>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
              )}
              type="button">
              画像
            </button>
          </div>
        </div>
        <p className={galleryStyles.selectionNote}>
          書式 group と挿入 action を同じ編集コンテキストとしてまとめる例です。
        </p>
      </div>
    ),
    tabs: [
      {
        id: 'formatting-toolbar-css',
        label: 'CSS',
        language: 'css',
        code: `.toolbar {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.65rem 0.9rem;
}

.toolbarCluster {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toolbarLabel {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}`,
        note: 'toolbar 自体の gap と、cluster 内の gap を分けると文脈のまとまりが読まれやすくなります。',
      },
      {
        id: 'formatting-toolbar-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div aria-label="編集ツール" className={styles.toolbar} role="toolbar">
  <div className={styles.toolbarCluster}>
    <span className={styles.toolbarLabel}>書式</span>
    <div aria-label="文字装飾" className={styles.actionGroup} role="group">
      <button aria-pressed={true} className={styles.toolbarButton} type="button">太字</button>
      <button className={styles.toolbarButton} type="button">斜体</button>
      <button className={styles.toolbarButton} type="button">引用</button>
    </div>
  </div>
  <span aria-hidden="true" className={styles.toolbarDivider} />
  <div className={styles.toolbarCluster}>
    <span className={styles.toolbarLabel}>挿入</span>
    <button className={styles.toolbarButton} type="button">リンク</button>
  </div>
</div>`,
        note: '`role="toolbar"` を帯全体に付け、内部でだけ `role="group"` を使うと責務が整理しやすくなります。',
      },
    ],
    detailNotes: [
      {
        id: 'formatting-boundary',
        label: '責務境界',
        value: 'Button Group は toolbar の内部部品であり、toolbar 自体は複数 cluster を束ねる container として扱います。',
      },
      {
        id: 'formatting-when',
        label: '使いどころ',
        value: 'リッチテキスト編集や図版操作のように、同じ作業帯に複数の道具を置きたい場面に向きます。',
      },
      {
        id: 'formatting-a11y',
        label: 'アクセシビリティ',
        value: 'toolbar 名と cluster label を併用し、現在値は `aria-pressed` や補助文で補います。',
      },
    ],
  },
  {
    id: 'view-controls-toolbar',
    name: '表示切替ツールバー',
    description: '表示切替と補助 action を同じ view 操作帯にまとめる構成です。',
    preview: (
      <div className={galleryStyles.buttonStack}>
        <div aria-label="表示ツール" className={galleryStyles.toolbarFrame} role="toolbar">
          <div className={galleryStyles.toolbarCluster}>
            <span className={galleryStyles.toolbarLabel}>表示</span>
            <div aria-label="表示形式" className={galleryStyles.buttonGroupConnected} role="group">
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupLeadingButton,
                )}
                type="button">
                リスト
              </button>
              <button
                aria-pressed="true"
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupMiddleButton,
                  galleryStyles.isSelected,
                )}
                type="button">
                グリッド
              </button>
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                  galleryStyles.groupTrailingButton,
                )}
                type="button">
                月表示
              </button>
            </div>
          </div>
          <span aria-hidden="true" className={galleryStyles.toolbarDivider} />
          <button
            className={clsx(
              galleryStyles.demoButton,
              galleryStyles.ghostButton,
              galleryStyles.compactButton,
            )}
            type="button">
            列を選ぶ
          </button>
        </div>
        <p className={galleryStyles.selectionNote}>現在の表示形式: グリッド</p>
      </div>
    ),
    tabs: [
      {
        id: 'view-controls-toolbar-css',
        label: 'CSS',
        language: 'css',
        code: `.toolbarDivider {
  align-self: stretch;
  border-inline-start: 1px solid color-mix(in srgb, currentColor 12%, transparent);
  min-height: 2rem;
}

.viewButton[aria-pressed='true'] {
  background: color-mix(in srgb, var(--ifm-color-primary) 14%, transparent);
  border-color: var(--ifm-color-primary);
}`,
        note: '選択状態は個別 button に持たせ、toolbar は現在値の文脈を補う役に留めます。',
      },
      {
        id: 'view-controls-toolbar-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div aria-label="表示ツール" className={styles.toolbar} role="toolbar">
  <div className={styles.toolbarCluster}>
    <span className={styles.toolbarLabel}>表示</span>
    <div aria-label="表示形式" className={styles.actionGroup} role="group">
      <button aria-pressed={false} className={styles.viewButton} type="button">リスト</button>
      <button aria-pressed={true} className={styles.viewButton} type="button">グリッド</button>
    </div>
  </div>
  <span aria-hidden="true" className={styles.toolbarDivider} />
  <button className={styles.secondaryButton} type="button">列を選ぶ</button>
</div>`,
        note: 'view switch の button 群と補助 action を同じ toolbar に置きつつ、役割は cluster 単位で分けます。',
      },
    ],
    detailNotes: [
      {
        id: 'view-boundary',
        label: '責務境界',
        value: 'ボタンだけで view state を切り替える場合に向きます。tab semantics や input 主体の制御は別カテゴリに逃がします。',
      },
      {
        id: 'view-state',
        label: '状態設計',
        value: '現在値は pressed state と補助文で見せ、toolbar 本体には state を持たせません。',
      },
      {
        id: 'view-layout',
        label: '見た目',
        value: '切替 group と補助 action の間に divider を入れると、同じ帯でも判断単位が分かれます。',
      },
    ],
  },
  {
    id: 'bulk-actions-toolbar',
    name: '一括操作ツールバー',
    description: '選択件数と一括操作を同じ帯に置き、現在の対象範囲を読みやすくします。',
    preview: (
      <div className={galleryStyles.buttonStack}>
        <div aria-label="選択中アイテムの操作" className={galleryStyles.toolbarFrame} role="toolbar">
          <span className={galleryStyles.toolbarCount}>12件を選択中</span>
          <span aria-hidden="true" className={galleryStyles.toolbarDivider} />
          <div className={galleryStyles.toolbarCluster}>
            <span className={galleryStyles.toolbarLabel}>一括操作</span>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
              )}
              type="button">
              アーカイブ
            </button>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.compactButton,
              )}
              type="button">
              タグ付け
            </button>
          </div>
          <span aria-hidden="true" className={galleryStyles.toolbarDivider} />
          <button
            className={clsx(
              galleryStyles.demoButton,
              galleryStyles.primaryButton,
              galleryStyles.compactButton,
            )}
            type="button">
            CSVを書き出す
          </button>
        </div>
        <p className={galleryStyles.selectionNote}>対象件数を先に見せると、誤って広い範囲へ操作しにくくなります。</p>
      </div>
    ),
    tabs: [
      {
        id: 'bulk-actions-toolbar-css',
        label: 'CSS',
        language: 'css',
        code: `.toolbarCount {
  font-size: 0.82rem;
  font-weight: 700;
}

.toolbar {
  gap: 0.65rem 0.9rem;
  padding: 0.75rem 0.85rem;
}`,
        note: '件数表示、action cluster、primary action を横並びの中で分節すると一括操作の範囲が伝わりやすくなります。',
      },
      {
        id: 'bulk-actions-toolbar-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div aria-label="選択中アイテムの操作" className={styles.toolbar} role="toolbar">
  <span className={styles.toolbarCount}>12件を選択中</span>
  <span aria-hidden="true" className={styles.toolbarDivider} />
  <div className={styles.toolbarCluster}>
    <span className={styles.toolbarLabel}>一括操作</span>
    <button className={styles.secondaryButton} type="button">アーカイブ</button>
    <button className={styles.secondaryButton} type="button">タグ付け</button>
  </div>
  <button className={styles.primaryButton} type="button">CSVを書き出す</button>
</div>`,
        note: '件数や対象範囲を toolbar 内に置くことで、選択文脈と action を切り離しすぎずに済みます。',
      },
    ],
    detailNotes: [
      {
        id: 'bulk-context',
        label: '文脈',
        value: '選択中件数や対象ラベルを先に見せると、一括操作の対象範囲を誤読しにくくなります。',
      },
      {
        id: 'bulk-boundary',
        label: '責務境界',
        value: 'filter input や sort select が主役になる場合は button toolbar ではなく controller の toolbar で扱います。',
      },
      {
        id: 'bulk-priority',
        label: '優先順位',
        value: '主 action を 1 つだけ強くし、それ以外は secondary に留めると意思決定が安定します。',
      },
    ],
  },
  {
    id: 'responsive-wrap-toolbar',
    name: '折り返し対応ツールバー',
    description: '狭い幅では自然に折り返し、cluster 単位のまとまりを保つ構成です。',
    preview: (
      <div className={galleryStyles.buttonStack}>
        <div className={galleryStyles.toolbarNarrow}>
          <div aria-label="共有ツール" className={galleryStyles.toolbarFrame} role="toolbar">
            <div className={galleryStyles.toolbarCluster}>
              <span className={galleryStyles.toolbarLabel}>共有</span>
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                )}
                type="button">
                リンクをコピー
              </button>
              <button
                className={clsx(
                  galleryStyles.demoButton,
                  galleryStyles.secondaryButton,
                  galleryStyles.compactButton,
                )}
                type="button">
                チームへ送る
              </button>
            </div>
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.ghostButton,
                galleryStyles.compactButton,
              )}
              type="button">
              共有設定
            </button>
          </div>
        </div>
        <p className={galleryStyles.selectionNote}>wrap しても cluster 単位の gap を保つと、狭い幅でも意味のまとまりが残ります。</p>
      </div>
    ),
    tabs: [
      {
        id: 'responsive-wrap-toolbar-css',
        label: 'CSS',
        language: 'css',
        code: `.toolbar {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.65rem 0.9rem;
}

.toolbarNarrow {
  max-width: 20rem;
}`,
        note: '狭い幅で折り返す前提なら、button 単位ではなく cluster 単位の gap と divider を先に決めておくと崩れにくくなります。',
      },
      {
        id: 'responsive-wrap-toolbar-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.toolbarNarrow}>
  <div aria-label="共有ツール" className={styles.toolbar} role="toolbar">
    <div className={styles.toolbarCluster}>
      <span className={styles.toolbarLabel}>共有</span>
      <button className={styles.secondaryButton} type="button">リンクをコピー</button>
      <button className={styles.secondaryButton} type="button">チームへ送る</button>
    </div>
    <button className={styles.ghostButton} type="button">共有設定</button>
  </div>
</div>`,
        note: 'wrap を前提に narrow container へ入れても、toolbar 名と cluster label があれば文脈を維持しやすくなります。',
      },
    ],
    detailNotes: [
      {
        id: 'responsive-wrap',
        label: 'レイアウト',
        value: 'button 単位の均一な折り返しではなく、cluster のまとまりを残した折り返しを優先します。',
      },
      {
        id: 'responsive-density',
        label: '密度',
        value: 'compact サイズを使う場合でも、タップしにくいほど詰め込みすぎないよう注意します。',
      },
      {
        id: 'responsive-boundary',
        label: '責務境界',
        value: '入力欄や dropdown が主役になるほど複雑なら、button toolbar ではなく別の controller 設計へ切り出します。',
      },
    ],
  },
] satisfies readonly ButtonReferenceVariant[];

export default function ButtonToolbarReferenceContent({entry}: Props): ReactNode {
  return (
    <ButtonReferenceLayout
      entry={entry}
      guides={guides}
      variantNote="ボタンツールバーは複数のボタングループや単独アクションを 1 本の作業帯として扱います。group 境界そのものはボタングループ、input や結果件数が主役の toolbar は controller パターンで補います。"
      variantSectionLabel="ツールバー構成"
      variants={variants}
    />
  );
}
