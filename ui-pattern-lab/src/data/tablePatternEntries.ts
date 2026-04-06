import {tablePatternSnippets} from '@site/src/data/tablePatternSnippets';
import type {
  TablePatternEntry,
  TablePatternSnippets,
} from '@site/src/data/tablePatternTypes';

function normalizeSnippets(
  snippets: TablePatternSnippets,
): TablePatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseTablePatternEntries = [
  {
    id: 'responsive-stack',
    title: 'レスポンシブスタック',
    summary:
      '狭い画面では1行をカード状に積み上げ、項目名と値の対応を保ちます。',
    problem:
      '横に広い比較表は、スマートフォンでは項目名と値の対応を追いにくくなります。',
    solution:
      '横並びが難しい幅では、1レコードをラベル付きの縦積みブロックへ切り替えます。',
    whenToUse:
      'モバイルでは1件ずつ詳細を見ることが多く、列同士の厳密な横比較が主目的でないときに向いています。',
    accessibilityNotes:
      '積み上げ後も各値の前に項目ラベルを繰り返し表示し、見た目でも支援技術でも文脈を保ちます。',
    tags: ['モバイル優先', 'ラベル維持', '1件詳細'],
    demoKind: 'responsive-stack',
  },
  {
    id: 'horizontal-scroll',
    title: '横スクロール',
    summary:
      '列を減らさずに保ったまま、必要な範囲だけ横スクロールで見せます。',
    problem:
      '列を減らしたり非表示にしたりすると、複数項目を並べて比べたい場面で文脈が失われます。',
    solution:
      '表全体はそのまま保ち、意図的なオーバーフローだと伝わるスクロール領域とヒントを加えます。',
    whenToUse:
      '一覧性や比較の正確さを優先し、画面内に全列を同時に収める必要がないときに向いています。',
    accessibilityNotes:
      'スクロール領域にはキーボードで到達できるようにし、短い説明文で操作意図を伝えます。',
    tags: ['高密度データ', '比較重視', 'スクロールヒント'],
    demoKind: 'horizontal-scroll',
  },
  {
    id: 'sticky-header',
    title: '固定ヘッダー',
    summary:
      '縦に長い表でも列の文脈を失わないよう、ヘッダーだけを領域内で固定します。',
    problem:
      '行数の多い表では、スクロール中にヘッダーが消えて列の意味を見失いやすくなります。',
    solution:
      '表本体だけをスクロールさせつつ、ヘッダー行はローカルコンテナ内で sticky に保ちます。',
    whenToUse:
      '行数が多く縦スクロールが前提で、それでも列同士の比較を継続したいときに向いています。',
    accessibilityNotes:
      'sticky の影響範囲はローカルコンテナに限定し、固定されたヘッダー行が識別しやすいコントラストを保ちます。',
    tags: ['長い一覧', '列の文脈', 'スクロール領域'],
    demoKind: 'sticky-header',
  },
  {
    id: 'cell-truncation',
    title: '省略表示',
    summary:
      '長いセル文言は1行で省略しつつ、表の行高と列密度を崩さないよう全文を別面で補足します。',
    problem:
      '長文がそのまま入ると行の高さがばらつき、密度の高い一覧で視線移動のリズムが崩れます。',
    solution:
      '見た目は省略表示でそろえつつ、補足テキストや別の表示面で全文を確認できるようにします。',
    whenToUse:
      '行の高さを一定に保ちたいが、長文自体は参照価値があり完全には捨てたくないときに向いています。',
    accessibilityNotes:
      '省略記号だけに頼らず、近くに全文を示して短縮後も意味が分かる状態を保ちます。',
    tags: ['コンパクトな行', '長文対応', '高さを一定化'],
    demoKind: 'cell-truncation',
  },
] satisfies Array<Omit<TablePatternEntry, 'snippets'>>;

export const tablePatternEntries: TablePatternEntry[] = baseTablePatternEntries.map(
  (entry) => ({
    ...entry,
    snippets: normalizeSnippets(tablePatternSnippets[entry.id]),
  }),
);
