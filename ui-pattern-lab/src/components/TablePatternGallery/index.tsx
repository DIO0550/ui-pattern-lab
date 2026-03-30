import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import type {
  ButtonReferenceGuide,
  ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
} from '@site/src/components/PatternReferenceContent';
import TablePatternMetadataPanel, {
  type TablePatternMetadataItem,
} from '@site/src/components/TablePatternMetadataPanel';
import TablePatternSnippetPanel from '@site/src/components/TablePatternSnippetPanel';
import type {
  DemoKind,
  TablePatternEntry,
} from '@site/src/data/tablePatternTypes';

import styles from './styles.module.css';

type TablePatternGalleryProps = {
  entries: TablePatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = () => ReactNode;

const responsiveRows = [
  {
    plan: 'スターター',
    owner: 'Ava',
    status: '準備完了',
    updated: '2時間前',
  },
  {
    plan: 'グロース',
    owner: 'Kai',
    status: '要確認',
    updated: '1日前',
  },
  {
    plan: 'スケール',
    owner: 'Mina',
    status: 'レビュー中',
    updated: '3日前',
  },
];

const horizontalColumns = ['プラン', '席数', '地域', '請求', '担当', '最終確認'];
const horizontalRows = [
  ['スターター', '24', 'APAC', '月次', 'Ava', '今日'],
  ['グロース', '68', 'EMEA', '年次', 'Kai', '2日前'],
  ['スケール', '120', 'NA', '年次', 'Mina', '来週'],
  ['エンタープライズ', '240', 'Global', '四半期', 'Iris', '昨日'],
];

const stickyColumns = ['チーム', '担当', '進捗', 'リスク', '更新'];
const stickyRows = [
  ['Revenue Ops', 'Ava', '順調', '低', '今日'],
  ['CX Platform', 'Kai', '注意', '中', '今日'],
  ['Data Quality', 'Mina', '順調', '低', '昨日'],
  ['Global Sales', 'Nia', '停止', '高', '昨日'],
  ['Partner Ops', 'Theo', '順調', '低', '2日前'],
  ['Support Desk', 'Luca', 'レビュー中', '中', '2日前'],
  ['Security', 'Iris', '順調', '低', '3日前'],
  ['Finance Ops', 'Jae', '注意', '中', '3日前'],
];

const truncationRows = [
  {
    field: '移行計画',
    priority: '高',
    owner: 'Ava',
    note: 'エンタープライズ向けワークスペース移行計画。地域ごとの依存関係を含む。',
  },
  {
    field: '担当メモ',
    priority: '中',
    owner: 'Kai',
    note: '公開文言、請求ルール、切り戻し時の案内文をまとめて調整する。',
  },
  {
    field: 'エスカレーション',
    priority: '高',
    owner: 'Mina',
    note: '最終切替の承認前に法務と購買へ事前連絡を入れる。',
  },
];

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">テーブルパターンはまだありません</Heading>
      <p>
        ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録
        されていません。
      </p>
    </div>
  );
}

function ResponsiveStackDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewSplit}>
        <section className={styles.previewPanel}>
          <span className={styles.previewLabel}>広い画面の表</span>
          <table className={styles.demoTable}>
            <thead>
              <tr>
                <th scope="col">プラン</th>
                <th scope="col">担当</th>
                <th scope="col">進捗</th>
                <th scope="col">更新</th>
              </tr>
            </thead>
            <tbody>
              {responsiveRows.map((row) => (
                <tr key={row.plan}>
                  <td>{row.plan}</td>
                  <td>{row.owner}</td>
                  <td>{row.status}</td>
                  <td>{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={clsx(styles.previewPanel, styles.mobileViewport)}>
          <span className={styles.previewLabel}>モバイルの積み上げ</span>
          <div className={styles.mobileCardList}>
            {responsiveRows.map((row) => (
              <article key={row.plan} className={styles.mobileCard}>
                <strong className={styles.mobileCardTitle}>{row.plan}</strong>
                <dl className={styles.mobileCardMeta}>
                  <div>
                    <dt>担当</dt>
                    <dd>{row.owner}</dd>
                  </div>
                  <div>
                    <dt>進捗</dt>
                    <dd>{row.status}</dd>
                  </div>
                  <div>
                    <dt>更新</dt>
                    <dd>{row.updated}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </div>
      <p className={styles.demoNote}>
        積み上げ後も各値の前にラベルを残し、1行ごとの意味を保ちます。
      </p>
    </div>
  );
}

function buildResponsiveStackReferenceVariants(
  entry: TablePatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return [
    {
      id: 'desktop-table',
      name: '広い画面の表',
      description: '列の比較性を優先し、広い viewport では table のまま見せます。',
      preview: (
        <section className={styles.previewPanel}>
          <table className={styles.demoTable}>
            <thead>
              <tr>
                <th scope="col">プラン</th>
                <th scope="col">担当</th>
                <th scope="col">進捗</th>
                <th scope="col">更新</th>
              </tr>
            </thead>
            <tbody>
              {responsiveRows.map((row) => (
                <tr key={row.plan}>
                  <td>{row.plan}</td>
                  <td>{row.owner}</td>
                  <td>{row.status}</td>
                  <td>{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ),
      tabs,
    },
    {
      id: 'mobile-stack',
      name: 'モバイルの積み上げ',
      description: '積み上げ後も各値の前にラベルを残し、1 行ごとの意味を保ちます。',
      preview: (
        <section className={clsx(styles.previewPanel, styles.mobileViewport)}>
          <div className={styles.mobileCardList}>
            {responsiveRows.map((row) => (
              <article key={row.plan} className={styles.mobileCard}>
                <strong className={styles.mobileCardTitle}>{row.plan}</strong>
                <dl className={styles.mobileCardMeta}>
                  <div>
                    <dt>担当</dt>
                    <dd>{row.owner}</dd>
                  </div>
                  <div>
                    <dt>進捗</dt>
                    <dd>{row.status}</dd>
                  </div>
                  <div>
                    <dt>更新</dt>
                    <dd>{row.updated}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      ),
      tabs,
    },
  ] as const;
}

const responsiveStackGuides = [
  {
    id: 'responsive-stack-do',
    tone: 'do',
    description:
      '狭い画面へ積み上げるときも、各値の前にラベルを残して 1 行ごとの意味を保ちます。',
    preview: (
      <section className={clsx(styles.previewPanel, styles.mobileViewport)}>
        <div className={styles.mobileCardList}>
          <article className={styles.mobileCard}>
            <strong className={styles.mobileCardTitle}>スターター</strong>
            <dl className={styles.mobileCardMeta}>
              <div>
                <dt>担当</dt>
                <dd>Ava</dd>
              </div>
              <div>
                <dt>進捗</dt>
                <dd>準備完了</dd>
              </div>
              <div>
                <dt>更新</dt>
                <dd>2時間前</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    ),
  },
  {
    id: 'responsive-stack-dont',
    tone: 'dont',
    description:
      '値だけを縦に積むと、どれが担当・進捗・更新なのかが分からず、比較もしにくくなります。',
    preview: (
      <section className={clsx(styles.previewPanel, styles.mobileViewport)}>
        <article className={styles.mobileCard}>
          <strong className={styles.mobileCardTitle}>スターター</strong>
          <div className={styles.mobileCardMeta}>
            <div>Ava</div>
            <div>準備完了</div>
            <div>2時間前</div>
          </div>
        </article>
      </section>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

function HorizontalScrollDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.scrollHintRow}>
        <span className={styles.previewLabel}>横スクロール</span>
        <span className={styles.scrollHintText}>横にスクロールして列を表示</span>
      </div>
      <div
        aria-label="横スクロールパターンを示すスクロール可能な表のサンプル"
        className={styles.horizontalScrollViewport}
        tabIndex={0}>
        <table className={clsx(styles.demoTable, styles.wideDemoTable)}>
          <thead>
            <tr>
              {horizontalColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horizontalRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={`${row[0]}-${cell}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.demoNote}>
        比較を優先したいときは、列を減らさずそのまま保ちます。
      </p>
    </div>
  );
}

function StickyHeaderDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>固定ヘッダー</span>
      <div
        aria-label="固定ヘッダーパターンを示すスクロール可能な表のサンプル"
        className={styles.stickyScrollArea}
        tabIndex={0}>
        <table className={styles.demoTable}>
          <thead className={styles.stickyHead}>
            <tr>
              {stickyColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stickyRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={`${row[0]}-${cell}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.demoNote}>
        ヘッダーはページ全体ではなく、このスクロール領域の中だけで固定します。
      </p>
    </div>
  );
}

function CellTruncationDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>1行で省略表示</span>
      <table className={styles.demoTable}>
        <thead>
          <tr>
            <th scope="col">項目</th>
            <th scope="col">優先度</th>
            <th scope="col">担当</th>
            <th scope="col">表示中のメモ</th>
          </tr>
        </thead>
        <tbody>
          {truncationRows.map((row) => (
            <tr key={row.field}>
              <td>{row.field}</td>
              <td>{row.priority}</td>
              <td>{row.owner}</td>
              <td className={styles.truncatedCell}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.fullValueList}>
        {truncationRows.map((row) => (
          <p className={styles.demoNote} key={row.field}>
            <strong>{row.field}:</strong> {row.note}
          </p>
        ))}
      </div>
    </div>
  );
}

const demoByKind: Record<DemoKind, DemoRenderer> = {
  'responsive-stack': ResponsiveStackDemo,
  'horizontal-scroll': HorizontalScrollDemo,
  'sticky-header': StickyHeaderDemo,
  'cell-truncation': CellTruncationDemo,
};

export default function TablePatternGallery({
  entries,
  density,
}: TablePatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="テーブルデザインパターンギャラリー"
      className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const metadataItems: TablePatternMetadataItem[] = [
            {label: '課題', tone: 'problem', value: entry.problem},
            {label: '解決方法', tone: 'solution', value: entry.solution},
            {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
            {
              label: 'アクセシビリティの注意',
              tone: 'accessibility',
              value: entry.accessibilityNotes,
            },
          ];
          const detailNotes = metadataItems.map((item) => ({
            id: `${entry.id}-${item.tone}`,
            label: item.label,
            value: item.value,
          }));

          if (density === 'detail') {
            if (entry.id === 'responsive-stack') {
              return (
                <div key={entry.id} id={entry.id} className={styles.detailContent}>
                  <PatternReferenceContent
                    guides={responsiveStackGuides}
                    notes={detailNotes}
                    variantNote={entry.snippets?.snippetSummary}
                    variants={buildResponsiveStackReferenceVariants(entry)}
                  />
                </div>
              );
            }

            return (
              <div key={entry.id} id={entry.id} className={styles.detailContent}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={detailNotes}
                  preview={
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <Demo />
                    </div>
                  }
                  snippets={entry.snippets}
                  summary={entry.summary}
                  title={entry.title}
                />
              </div>
            );
          }

          return (
            <article
              className={styles.card}
              id={entry.id}
              key={entry.id}>
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

              <TablePatternSnippetPanel
                density={density}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />

              <TablePatternMetadataPanel
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
