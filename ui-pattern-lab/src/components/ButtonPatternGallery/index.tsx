import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ButtonPatternMetadataPanel from '@site/src/components/ButtonPatternMetadataPanel';
import ButtonPatternSectionCard from '@site/src/components/ButtonPatternSectionCard';
import ButtonPatternSnippetPanel from '@site/src/components/ButtonPatternSnippetPanel';
import type {
  ButtonDemoKind,
  ButtonPatternEntry,
  ButtonPatternMetadataItem,
} from '@site/src/data/buttonPatternTypes';

import styles from './styles.module.css';

type ButtonPatternGalleryProps = {
  entries: ButtonPatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = () => ReactNode;

type PreviewCardProps = {
  label: string;
  description: string;
  children: ReactNode;
};

function PreviewCard({
  label,
  description,
  children,
}: PreviewCardProps): ReactNode {
  return (
    <section className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>{label}</span>
        <p className={styles.previewDescription}>{description}</p>
      </div>
      <div className={styles.previewContent}>{children}</div>
    </section>
  );
}

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">ボタンパターンはまだありません</Heading>
      <p>ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

function HierarchyAndEmphasisDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="Primary"
          description="最も重要な主行動は 1 つに絞ります。">
          <button
            className={clsx(styles.demoButton, styles.primaryButton)}
            type="button">
            変更を保存
          </button>
        </PreviewCard>
        <PreviewCard
          label="Secondary"
          description="主行動に並ぶ補助操作です。">
          <button
            className={clsx(styles.demoButton, styles.secondaryButton)}
            type="button">
            下書きに戻す
          </button>
        </PreviewCard>
        <PreviewCard
          label="Tertiary"
          description="詳細や補足的な操作に向きます。">
          <button
            className={clsx(styles.demoButton, styles.tertiaryButton)}
            type="button">
            変更点を確認
          </button>
        </PreviewCard>
        <PreviewCard
          label="Ghost"
          description="一覧やカード内の軽い補助操作です。">
          <button
            className={clsx(styles.demoButton, styles.ghostButton)}
            type="button">
            キャンセル
          </button>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        強い見た目のボタンを増やしすぎず、段階的に強調を下げると画面内の優先順位が読み取りやすくなります。
      </p>
    </div>
  );
}

function InteractiveStatesDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="Default"
          description="通常時の基準となる状態です。">
          <button
            className={clsx(styles.demoButton, styles.primaryButton)}
            type="button">
            保存する
          </button>
        </PreviewCard>
        <PreviewCard
          label="Hover"
          description="操作可能だと分かる軽い反応を加えます。">
          <button
            className={clsx(
              styles.demoButton,
              styles.primaryButton,
              styles.isHovered,
            )}
            type="button">
            保存する
          </button>
        </PreviewCard>
        <PreviewCard
          label="Focus visible"
          description="キーボード移動時の輪郭を消しません。">
          <button
            className={clsx(
              styles.demoButton,
              styles.secondaryButton,
              styles.isFocusVisible,
            )}
            type="button">
            確認して進む
          </button>
        </PreviewCard>
        <PreviewCard
          label="Disabled"
          description="入力待ちなど、実行できない理由がある状態です。">
          <button
            className={clsx(styles.demoButton, styles.secondaryButton)}
            disabled
            type="button">
            入力待ち
          </button>
        </PreviewCard>
        <PreviewCard
          label="Loading"
          description="処理中は再実行を防ぎ、状態を明示します。">
          <button
            aria-busy="true"
            className={clsx(styles.demoButton, styles.primaryButton)}
            disabled
            type="button">
            <span aria-hidden="true" className={styles.spinner} />
            保存中...
          </button>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        loading でも幅が大きく揺れないように、icon gap と min-width を先に決めておくと安定します。
      </p>
    </div>
  );
}

function DestructiveActionsDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="Cancel"
          description="戻れる選択肢は近くに配置します。">
          <button
            className={clsx(styles.demoButton, styles.secondaryButton)}
            type="button">
            キャンセル
          </button>
        </PreviewCard>
        <PreviewCard
          label="Warning"
          description="影響はあるが完全ではない操作です。">
          <button
            className={clsx(styles.demoButton, styles.warningButton)}
            type="button">
            一時停止
          </button>
        </PreviewCard>
        <PreviewCard
          label="Destructive"
          description="取り返しのつかない操作だけを強くします。">
          <button
            className={clsx(styles.demoButton, styles.dangerButton)}
            type="button">
            完全に削除する
          </button>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        destructive と warning を同じ見た目にせず、補助説明や undo 導線で危険度の差を補います。
      </p>
    </div>
  );
}

function IconAndCompoundActionsDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="Leading icon"
          description="ラベルを主役にしつつアイコンで補足します。">
          <button
            className={clsx(styles.demoButton, styles.primaryButton)}
            type="button">
            <span aria-hidden="true" className={styles.buttonIcon}>
              +
            </span>
            新規作成
          </button>
        </PreviewCard>
        <PreviewCard
          label="Trailing icon"
          description="次の導線や展開を補助する配置です。">
          <button
            className={clsx(styles.demoButton, styles.secondaryButton)}
            type="button">
            詳細を見る
            <span aria-hidden="true" className={styles.buttonIcon}>
              →
            </span>
          </button>
        </PreviewCard>
        <PreviewCard
          label="Icon only"
          description="visible label がない場合は accessible name が必須です。">
          <button
            aria-label="検索"
            className={clsx(
              styles.demoButton,
              styles.ghostButton,
              styles.iconOnlyButton,
            )}
            type="button">
            <span aria-hidden="true" className={styles.buttonIcon}>
              ⌕
            </span>
          </button>
        </PreviewCard>
        <PreviewCard
          label="Split button"
          description="主操作と補助メニューを分けて扱います。">
          <div className={styles.splitButton}>
            <button
              className={clsx(
                styles.demoButton,
                styles.primaryButton,
                styles.splitPrimary,
              )}
              type="button">
              共有
            </button>
            <button
              aria-label="共有オプション"
              className={clsx(
                styles.demoButton,
                styles.secondaryButton,
                styles.splitSecondary,
              )}
              type="button">
              ▾
            </button>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        icon-only では `aria-label` を忘れず、split button は主操作と補助操作を別ボタンとして読めるようにします。
      </p>
    </div>
  );
}

function ToggleAndSelectionDemo(): ReactNode {
  const [isPinned, setIsPinned] = useState(false);
  const views = [
    {id: 'list', label: 'リスト'},
    {id: 'board', label: 'ボード'},
    {id: 'calendar', label: 'カレンダー'},
  ] as const;
  const [selectedView, setSelectedView] = useState<(typeof views)[number]['id']>(
    'list',
  );
  const selectedViewLabel =
    views.find((view) => view.id === selectedView)?.label ?? 'リスト';

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="単独トグル"
          description="実行ではなく ON / OFF の切り替えを表します。">
          <div className={styles.buttonStack}>
            <button
              aria-pressed={isPinned}
              className={clsx(
                styles.demoButton,
                styles.secondaryButton,
                styles.toggleButton,
                isPinned && styles.isSelected,
              )}
              onClick={() => setIsPinned((current) => !current)}
              type="button">
              比較対象に固定
            </button>
            <p className={styles.selectionNote}>
              {isPinned ? '現在は固定中です。' : 'まだ固定していません。'}
            </p>
          </div>
        </PreviewCard>
        <PreviewCard
          label="単一選択"
          description="候補の中から 1 つだけ選ぶグループです。">
          <div className={styles.buttonStack}>
            <div
              aria-label="表示形式"
              className={styles.segmentedGroup}
              role="group">
              {views.map((view) => (
                <button
                  aria-pressed={selectedView === view.id}
                  className={clsx(
                    styles.demoButton,
                    styles.segmentButton,
                    selectedView === view.id && styles.isSelected,
                  )}
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  type="button">
                  {view.label}
                </button>
              ))}
            </div>
            <p className={styles.selectionNote}>
              現在の選択: {selectedViewLabel}
            </p>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        単独トグルと選択群では pressed の意味が異なるため、ラベルと補助文で選択可能数も伝えます。
      </p>
    </div>
  );
}

function SpacingAndSizingDemo(): ReactNode {
  const sizeExamples = [
    {
      id: 'compact',
      label: 'Compact',
      description: '高密度なツールバーや補助操作向けです。',
      buttonClassName: styles.compactButton,
      specs: ['min-height: 2rem', 'padding: 0.35rem 0.7rem', 'icon gap: 0.35rem'],
    },
    {
      id: 'default',
      label: 'Default',
      description: '一般的なフォームや一覧での標準です。',
      buttonClassName: styles.defaultButton,
      specs: ['min-height: 2.5rem', 'padding: 0.5rem 0.9rem', 'icon gap: 0.5rem'],
    },
    {
      id: 'comfortable',
      label: 'Comfortable',
      description: 'タッチ中心の画面や主 CTA に向きます。',
      buttonClassName: styles.comfortableButton,
      specs: ['min-height: 2.75rem', 'padding: 0.65rem 1.1rem', 'icon gap: 0.65rem'],
    },
  ] as const;

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {sizeExamples.map((size) => (
          <PreviewCard
            description={size.description}
            key={size.id}
            label={size.label}>
            <div className={styles.buttonStack}>
              <button
                className={clsx(
                  styles.demoButton,
                  styles.primaryButton,
                  size.buttonClassName,
                )}
                type="button">
                <span aria-hidden="true" className={styles.buttonIcon}>
                  +
                </span>
                {size.label}
              </button>
              <ul className={styles.specList}>
                {size.specs.map((spec) => (
                  <li className={styles.specItem} key={spec}>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        サイズ差は高さだけでなく padding と icon gap も連動させ、touch target を損なわない基準を保ちます。
      </p>
    </div>
  );
}

const demoByKind: Record<ButtonDemoKind, DemoRenderer> = {
  'hierarchy-and-emphasis': HierarchyAndEmphasisDemo,
  'interactive-states': InteractiveStatesDemo,
  'destructive-actions': DestructiveActionsDemo,
  'icon-and-compound-actions': IconAndCompoundActionsDemo,
  'toggle-and-selection': ToggleAndSelectionDemo,
  'spacing-and-sizing': SpacingAndSizingDemo,
};

export default function ButtonPatternGallery({
  entries,
  density,
}: ButtonPatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="ボタンデザインパターンギャラリー"
      className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const metadataItems: ButtonPatternMetadataItem[] = [
            {label: '課題', tone: 'problem', value: entry.problem},
            {label: '解決方法', tone: 'solution', value: entry.solution},
            {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
            {label: '余白 / サイズ', tone: 'layout', value: entry.layoutNotes},
            {label: '状態設計', tone: 'state', value: entry.stateNotes},
            {
              label: 'アクセシビリティ',
              tone: 'accessibility',
              value: entry.accessibilityNotes,
            },
          ];

          if (density === 'detail') {
            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <div className={styles.cardHeader}>
                  <Heading as="h3" className={styles.cardTitle}>
                    {entry.title}
                  </Heading>
                  <p className={styles.cardSummary}>{entry.summary}</p>
                  <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                    {entry.tags.map((tag) => (
                      <li className={styles.tag} key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.detailMainGrid}>
                  <ButtonPatternSnippetPanel
                    density={density}
                    entryTitle={entry.title}
                    snippets={entry.snippets}
                  />

                  <ButtonPatternSectionCard
                    ariaLabel={`${entry.title}のプレビュー`}
                    label="見た目"
                    title="プレビュー">
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <Demo />
                    </div>
                  </ButtonPatternSectionCard>
                </div>

                <ButtonPatternMetadataPanel
                  density={density}
                  entryTitle={entry.title}
                  items={metadataItems}
                />
              </div>
            );
          }

          return (
            <article className={styles.card} id={entry.id} key={entry.id}>
              <div className={styles.cardHeader}>
                <Heading as="h3" className={styles.cardTitle}>
                  {entry.title}
                </Heading>
                <p className={styles.cardSummary}>{entry.summary}</p>
                <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                  {entry.tags.map((tag) => (
                    <li className={styles.tag} key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.demoPanel}>
                <Demo />
              </div>

              <ButtonPatternSnippetPanel
                density={density}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />

              <ButtonPatternMetadataPanel
                density={density}
                entryTitle={entry.title}
                items={metadataItems}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
