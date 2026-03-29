import type {ReactNode} from 'react';
import {useId, useState} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import EllipsisDisplayPatternMetadataPanel, {
  type EllipsisDisplayPatternMetadataItem,
} from '@site/src/components/EllipsisDisplayPatternMetadataPanel';
import PatternReferenceContent from '@site/src/components/PatternReferenceContent';
import EllipsisDisplayPatternSnippetPanel from '@site/src/components/EllipsisDisplayPatternSnippetPanel';
import type {
  EllipsisDisplayDemoKind,
  EllipsisDisplayPatternEntry,
} from '@site/src/data/ellipsisDisplayPatternTypes';

import styles from './styles.module.css';

type Density = 'list' | 'detail';

type EllipsisDisplayPatternGalleryProps = {
  entries: EllipsisDisplayPatternEntry[];
  density: Density;
};

type DemoRendererProps = {
  entry: EllipsisDisplayPatternEntry;
  density: Density;
};

type DemoRenderer = (props: DemoRendererProps) => ReactNode;

const singleLineExamples = [
  {
    label: '通知タイトル',
    value: '支払い条件の更新に伴う請求タイミング調整のご案内',
    meta: '詳細画面で全文を確認',
  },
  {
    label: 'プロジェクト名',
    value: '北陸エリア向けオンボーディング手順と FAQ 再編のドラフト',
    meta: '一覧では1行に統一',
  },
  {
    label: '共有リンク',
    value: 'release-note-approval-and-customer-handoff-plan-v2026-final',
    meta: '長い英数字も折り返さず省略',
  },
];

const responsiveSingleLineExample = {
  label: '可変幅の行',
  prefix: '件名',
  value:
    '横幅が変わる分割ビューでも、契約更新の案内文を1行のまま保ちながら省略位置を追従させます。',
  meta: 'ドラッグで横幅を変えると省略位置も追従',
};

const clampExamples = [
  {
    title: '短文の要約',
    summary:
      '公開準備の前に承認と FAQ 更新を済ませ、短い要約だけ先に比較したいケースです。',
  },
  {
    title: '長大 token',
    summary:
      '公開メモでは INV-2026-Q1-SUPER-LONG-CUSTOMER-REFERENCE-AAAAAAAAAAAAAAAA を含む補足も読みたいものの、一覧では 3 行に抑えて比較したいケースです。',
  },
  {
    title: '多言語混在',
    summary:
      '日本語の説明を中心にしつつ English release note と API status memo を同じカードで扱い、密度を保ったまま比較したいケースです。',
  },
];

const supplementExamples = [
  {
    title: '契約更新案内',
    preview:
      '契約更新の案内文は要約だけ先に表示し、完全な文面は同じカード内で補足します。',
    fullText:
      '契約更新の案内文は要約だけ先に表示しつつ、例外条件、担当窓口、切り戻しの連絡先を含む完全な文面も同じカード内で参照できるようにします。',
  },
  {
    title: '審査メモ',
    preview:
      'レビュー待ちのメモは短い要約で一覧比較し、必要な詳細だけ近接した補足面で読みます。',
    fullText:
      'レビュー待ちのメモは短い要約で一覧比較しつつ、判定理由や例外手順のように省略できない情報だけを近接した補足面へ展開します。',
  },
];

const disclosureSummary =
  '契約更新の概要だけ先に表示し、例外条件や担当窓口を含む全文は必要なときだけ開きます。';

const disclosureBody =
  '契約更新の案内では、対象顧客、移行タイミング、例外条件、担当窓口、切り戻し時の連絡先を含む完全な文面を確認できる必要があります。一覧では概要だけ見せ、必要な場面で明示的に開閉します。';

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">省略表示パターンはまだありません</Heading>
      <p>
        ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録
        されていません。
      </p>
    </div>
  );
}

function SingleLineEllipsisDemo(_props: DemoRendererProps): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>1行にそろえる</span>
      <div className={styles.singleLineList}>
        {singleLineExamples.map((example) => (
          <article className={styles.singleLineCard} key={example.label}>
            <span className={styles.singleLineLabel}>{example.label}</span>
            <p className={styles.singleLineValue}>{example.value}</p>
            <p className={styles.singleLineMeta}>{example.meta}</p>
          </article>
        ))}
      </div>
      <div className={styles.resizableFrame}>
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>
            {responsiveSingleLineExample.label}
          </span>
          <div className={styles.responsiveLineRow}>
            <span className={styles.responsiveLinePrefix}>
              {responsiveSingleLineExample.prefix}
            </span>
            <p className={styles.responsiveLineValue}>
              {responsiveSingleLineExample.value}
            </p>
          </div>
          <p className={styles.singleLineMeta}>{responsiveSingleLineExample.meta}</p>
        </article>
      </div>
      <p className={styles.demoNote}>
        固定幅では `max-width`、可変幅では `minmax(0, 1fr)` と `min-width: 0`
        を使い、リサイズ中も 1 行省略を維持します。
      </p>
    </div>
  );
}

function MultiLineClampDemo(_props: DemoRendererProps): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>3行クランプ</span>
      <div className={styles.clampList}>
        {clampExamples.map((example) => (
          <article className={styles.clampCard} key={example.title}>
            <Heading as="h4" className={styles.clampTitle}>
              {example.title}
            </Heading>
            <p className={styles.clampSummary}>{example.summary}</p>
          </article>
        ))}
      </div>
      <p className={styles.demoNote}>
        `-webkit-line-clamp` が弱い環境でも、折り返して読める状態を正とします。
      </p>
    </div>
  );
}

function FullTextSupplementDemo(_props: DemoRendererProps): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>要約 + 全文補足</span>
      <div className={styles.supplementList}>
        {supplementExamples.map((example) => (
          <article className={styles.supplementCard} key={example.title}>
            <Heading as="h4" className={styles.supplementTitle}>
              {example.title}
            </Heading>
            <p className={styles.supplementPreview}>{example.preview}</p>
            <div className={styles.supplementFullText}>
              <span className={styles.supplementLabel}>全文補足</span>
              <p className={styles.supplementText}>{example.fullText}</p>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.demoNote}>
        hover 依存にせず、全文面を近接配置して到達しやすくします。
      </p>
    </div>
  );
}

function AccessibleDisclosureDemo({
  entry,
  density,
}: DemoRendererProps): ReactNode {
  const reactId = useId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panelId = `${entry.id}-panel-${density}-${reactId}`;
  const buttonId = `${entry.id}-button-${density}-${reactId}`;
  const statusId = `${entry.id}-status-${density}-${reactId}`;
  const statusText = isOpen
    ? '現在: 全文を表示中です。'
    : '現在: 要約のみを表示しています。';

  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>明示的な開閉</span>
      <article className={styles.disclosureCard}>
        <p className={styles.disclosureSummary}>{disclosureSummary}</p>
        <button
          aria-controls={panelId}
          aria-describedby={statusId}
          aria-expanded={isOpen}
          id={buttonId}
          className={styles.disclosureButton}
          onClick={() => setIsOpen((current) => !current)}
          type="button">
          <span className={styles.disclosureButtonLabel}>
            {isOpen ? '全文を閉じる' : '全文を表示'}
          </span>
          <span
            aria-hidden="true"
            className={clsx(
              styles.disclosureButtonIcon,
              isOpen && styles.disclosureButtonIconOpen,
            )}>
            ▾
          </span>
        </button>
        <p
          aria-live="polite"
          className={styles.disclosureStatus}
          id={statusId}>
          {statusText}
        </p>
        <div
          aria-labelledby={buttonId}
          className={styles.disclosurePanel}
          hidden={!isOpen}
          id={panelId}
          role="region">
          <span className={styles.disclosureLabel}>全文</span>
          <p className={styles.disclosureText}>{disclosureBody}</p>
        </div>
      </article>
      <p className={styles.demoNote}>
        ボタンラベル、状態テキスト、全文パネルを同時に切り替え、展開後もトリガーにフォーカスを残します。
      </p>
    </div>
  );
}

const demoByKind: Record<EllipsisDisplayDemoKind, DemoRenderer> = {
  'single-line-ellipsis': SingleLineEllipsisDemo,
  'multi-line-clamp': MultiLineClampDemo,
  'full-text-supplement': FullTextSupplementDemo,
  'accessible-disclosure': AccessibleDisclosureDemo,
};

export default function EllipsisDisplayPatternGallery({
  entries,
  density,
}: EllipsisDisplayPatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="省略表示パターンギャラリー"
      className={styles.root}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const metadataItems: EllipsisDisplayPatternMetadataItem[] = [
            {label: '課題', tone: 'problem', value: entry.problem},
            {label: '解決方法', tone: 'solution', value: entry.solution},
            {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
            {
              label: 'アクセシビリティの注意',
              tone: 'accessibility',
              value: entry.accessibilityNotes,
            },
          ];

          if (density === 'detail') {
            return (
              <article className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={metadataItems.map((item) => ({
                    id: `${entry.id}-${item.tone}`,
                    label: item.label,
                    value: item.value,
                  }))}
                  preview={
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <Demo density={density} entry={entry} />
                    </div>
                  }
                  snippets={entry.snippets}
                  summary={entry.summary}
                  title={entry.title}
                />
              </article>
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
                <Demo density={density} entry={entry} />
              </div>

              <EllipsisDisplayPatternSnippetPanel
                density={density}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />

              <EllipsisDisplayPatternMetadataPanel
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
