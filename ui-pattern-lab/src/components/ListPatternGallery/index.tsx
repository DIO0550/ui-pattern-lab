import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import PatternReferenceContent from '@site/src/components/PatternReferenceContent';
import type {
  DemoKind,
  ListPatternEntry,
} from '@site/src/data/listPatternTypes';

import styles from './styles.module.css';

type ListPatternGalleryProps = {
  entries: ListPatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = () => ReactNode;

const messages = [
  {
    id: 'message-1',
    title: '契約更新の確認',
    preview: '来週の更新前に、請求先と席数の最終確認が必要です。',
  },
  {
    id: 'message-2',
    title: 'オンボーディング準備',
    preview: '初回設定ガイドと招待メールの文面をレビューします。',
  },
  {
    id: 'message-3',
    title: 'サポート引き継ぎ',
    preview: '未解決の問い合わせ 3 件を次の担当へ引き継ぎます。',
  },
];

const settings = [
  {
    id: 'setting-1',
    label: 'メール通知',
    description: '重要な更新だけをワークスペースのメンバーへ送信します。',
    state: '有効',
  },
  {
    id: 'setting-2',
    label: '週次レポート',
    description: '毎週月曜日に利用状況のサマリーを配信します。',
    state: '管理者のみ',
  },
  {
    id: 'setting-3',
    label: '外部共有',
    description: 'リンクを知っているユーザーの閲覧範囲を制限します。',
    state: '制限中',
  },
];

const notifications = [
  {
    id: 'notification-1',
    title: '承認待ちの変更があります',
    body: '請求プラン変更が送信されました。適用前に内容を確認してください。',
    time: '5分前',
  },
  {
    id: 'notification-2',
    title: 'メンバー招待が完了しました',
    body: '3 名の招待メールが送信され、1 名が参加済みです。',
    time: '1時間前',
  },
];

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">リストパターンはまだありません</Heading>
      <p>比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

function PlainListDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>message list</span>
      <ul aria-label="最近のメッセージ" className={styles.plainList}>
        {messages.map((message) => (
          <li className={styles.plainItem} key={message.id}>
            <span className={styles.itemTitle}>{message.title}</span>
            <span className={styles.itemDescription}>{message.preview}</span>
          </li>
        ))}
      </ul>
      <p className={styles.demoNote}>
        操作対象ではない項目は、強い hover 表現やボタン風の枠を足さずに読み取りへ寄せます。
      </p>
    </div>
  );
}

function DividedListDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>settings list</span>
      <ul aria-label="設定項目" className={styles.dividedList}>
        {settings.map((setting) => (
          <li className={styles.dividedItem} key={setting.id}>
            <div className={styles.itemMain}>
              <span className={styles.itemTitle}>{setting.label}</span>
              <span className={styles.itemDescription}>{setting.description}</span>
            </div>
            <span className={styles.trailingMeta}>{setting.state}</span>
          </li>
        ))}
      </ul>
      <p className={styles.demoNote}>
        trailing meta は状態表示として扱い、行末の操作ボタンとは別の役割として配置します。
      </p>
    </div>
  );
}

function CardListDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <span className={styles.previewLabel}>notification list</span>
      <ul aria-label="通知" className={styles.cardList}>
        {notifications.map((notification) => (
          <li className={styles.cardItem} key={notification.id}>
            <div className={styles.itemMain}>
              <span className={styles.itemTitle}>{notification.title}</span>
              <span className={styles.itemDescription}>{notification.body}</span>
            </div>
            <div className={styles.itemFooter}>
              <span className={styles.trailingMeta}>{notification.time}</span>
              <button className={styles.trailingAction} type="button">
                確認
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.demoNote}>
        末尾 action がある場合は、項目全体クリックと混ぜずに focus 位置を明確にします。
      </p>
    </div>
  );
}

const demoByKind: Record<DemoKind, DemoRenderer> = {
  'plain-list': PlainListDemo,
  'divided-list': DividedListDemo,
  'card-list': CardListDemo,
};

export default function ListPatternGallery({
  entries,
  density,
}: ListPatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="リストデザインパターンギャラリー"
      className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const notes = [
            {id: `${entry.id}-problem`, label: '課題', value: entry.problem},
            {id: `${entry.id}-solution`, label: '解決方法', value: entry.solution},
            {id: `${entry.id}-usage`, label: '使いどころ', value: entry.whenToUse},
            {
              id: `${entry.id}-accessibility`,
              label: 'セマンティクス / focus',
              value: entry.accessibilityNotes,
            },
          ];

          if (density === 'detail') {
            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={notes}
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
