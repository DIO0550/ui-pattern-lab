import {listPatternSnippets} from '@site/src/data/listPatternSnippets';
import type {
  ListPatternEntry,
  ListPatternSnippets,
} from '@site/src/data/listPatternTypes';

function normalizeSnippets(
  snippets: ListPatternSnippets,
): ListPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseListPatternEntries = [
  {
    id: 'plain-list',
    title: 'プレーンリスト',
    summary:
      '背景や罫線を足さず、短い項目を軽く縦に並べて読み取りやすくします。',
    problem:
      '情報量が少ない項目に強い枠や区切りを足すと、視覚ノイズが増えて一覧の軽さが失われます。',
    solution:
      '項目間の余白、タイトル、補足文だけでまとまりを作り、操作対象に見える装飾を抑えます。',
    whenToUse:
      'message list や短い履歴など、項目同士の境界よりも連続した読み流しを優先したいときに向いています。',
    accessibilityNotes:
      '非操作項目は li のまま扱い、クリック可能にする場合だけ button / a を使って focus-visible を明示します。',
    tags: ['軽量表示', '短文中心', '読み流し'],
    demoKind: 'plain-list',
  },
  {
    id: 'divided-list',
    title: '区切りリスト',
    summary:
      '薄い区切り線で項目境界を示し、設定やステータスを行単位でスキャンしやすくします。',
    problem:
      '設定項目のように似た構造が続く一覧では、余白だけだと項目境界と trailing meta を追いにくくなります。',
    solution:
      '各行の上下に一貫した余白を取り、項目間にだけ区切り線を置いてスキャンのリズムを作ります。',
    whenToUse:
      'settings list のように、行単位でラベル、説明、現在状態を確認する場面に向いています。',
    accessibilityNotes:
      'trailing meta は状態テキストとして読み上げられる順序に置き、trailing action と混同しない構造にします。',
    tags: ['設定一覧', '境界明示', '状態表示'],
    demoKind: 'divided-list',
  },
  {
    id: 'card-list',
    title: 'カードリスト',
    summary:
      '通知やタスクのような情報量の多い項目を、個別の面としてまとめて見せます。',
    problem:
      '本文、メタ情報、操作が同じ行に詰まると、どこまでが 1 項目で何が操作なのかが曖昧になります。',
    solution:
      '項目ごとに控えめな面を持たせ、本文、meta、action の領域を分けて情報のまとまりを示します。',
    whenToUse:
      'notification list やタスク一覧など、項目単位の独立性や後続操作を明確にしたいときに向いています。',
    accessibilityNotes:
      '項目全体がリンクなら a を 1 つにし、末尾ボタンが主操作なら項目全体をクリック可能にしない設計にします。',
    tags: ['通知一覧', '項目独立', '末尾操作'],
    demoKind: 'card-list',
  },
] satisfies Array<Omit<ListPatternEntry, 'snippets'>>;

export const listPatternEntries: ListPatternEntry[] = baseListPatternEntries.map(
  (entry) => ({
    ...entry,
    snippets: normalizeSnippets(listPatternSnippets[entry.id]),
  }),
);
