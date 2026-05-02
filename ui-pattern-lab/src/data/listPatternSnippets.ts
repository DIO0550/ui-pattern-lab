import type {
  ListPatternEntryId,
  ListPatternSnippets,
} from '@site/src/data/listPatternTypes';

export const listPatternSnippets: Record<
  ListPatternEntryId,
  ListPatternSnippets
> = {
  'plain-list': {
    snippetSummary:
      '背景や区切りを抑え、項目同士の近さと余白だけで軽いリストを構成します。',
    items: [
      {
        id: 'plain-list-css',
        label: 'CSS',
        language: 'css',
        code: `.plainList {
  display: grid;
  gap: 0.65rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.plainItem {
  display: grid;
  gap: 0.25rem;
}`,
        note: '余白だけで項目のまとまりを作るため、短いテキスト中心の一覧に向いています。',
      },
      {
        id: 'plain-list-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<ul className={styles.plainList} aria-label="最近のメッセージ">
  {messages.map((message) => (
    <li className={styles.plainItem} key={message.id}>
      <span className={styles.itemTitle}>{message.title}</span>
      <span className={styles.itemDescription}>{message.preview}</span>
    </li>
  ))}
</ul>`,
        note: '項目が操作対象でない場合は li のままにし、クリック可能に見える装飾を避けます。',
      },
    ],
  },
  'divided-list': {
    snippetSummary:
      '行ごとのスキャンを助けるため、薄い区切り線で項目境界を明確にします。',
    items: [
      {
        id: 'divided-list-css',
        label: 'CSS',
        language: 'css',
        code: `.dividedList {
  border-block: 1px solid var(--list-border);
  list-style: none;
  margin: 0;
  padding: 0;
}

.dividedItem + .dividedItem {
  border-top: 1px solid var(--list-border);
}

.dividedItem {
  display: grid;
  gap: 0.3rem;
  padding: 0.8rem 0;
}`,
        note: '区切り線は項目間だけに置き、カードのような強い面を増やしすぎないようにします。',
      },
      {
        id: 'divided-list-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<ul className={styles.dividedList} aria-label="設定項目">
  {settings.map((setting) => (
    <li className={styles.dividedItem} key={setting.id}>
      <div className={styles.itemMain}>
        <span className={styles.itemTitle}>{setting.label}</span>
        <span className={styles.itemDescription}>{setting.description}</span>
      </div>
      <span className={styles.trailingMeta}>{setting.state}</span>
    </li>
  ))}
</ul>`,
        note: 'trailing meta は状態表示、trailing action は操作として分けると読み取りの責務が曖昧になりません。',
      },
    ],
  },
  'card-list': {
    snippetSummary:
      '項目ごとの情報量が多いとき、個別の面を持たせてまとまりと操作範囲を示します。',
    items: [
      {
        id: 'card-list-css',
        label: 'CSS',
        language: 'css',
        code: `.cardList {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cardItem {
  border: 1px solid var(--list-border);
  border-radius: 0.75rem;
  display: grid;
  gap: 0.6rem;
  padding: 0.85rem;
}`,
        note: 'カード化は項目の独立性が必要なときに使い、単なる行の装飾として濫用しないようにします。',
      },
      {
        id: 'card-list-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<ul className={styles.cardList} aria-label="通知">
  {notifications.map((notification) => (
    <li className={styles.cardItem} key={notification.id}>
      <div className={styles.itemMain}>
        <span className={styles.itemTitle}>{notification.title}</span>
        <span className={styles.itemDescription}>{notification.body}</span>
      </div>
      <div className={styles.itemFooter}>
        <span className={styles.trailingMeta}>{notification.time}</span>
        <button className={styles.trailingAction} type="button">確認</button>
      </div>
    </li>
  ))}
</ul>`,
        note: '項目全体が clickable なのか、末尾の action だけが操作なのかを DOM と focus 表現で明確にします。',
      },
    ],
  },
};
