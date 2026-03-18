import {ellipsisDisplayPatternSnippets} from '@site/src/data/ellipsisDisplayPatternSnippets';
import type {
  EllipsisDisplayPatternEntry,
  EllipsisDisplayPatternSnippets,
} from '@site/src/data/ellipsisDisplayPatternTypes';

function normalizeSnippets(
  snippets: EllipsisDisplayPatternSnippets,
): EllipsisDisplayPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);
  const snippetSummary = snippets.snippetSummary.trim();

  if (items.length === 0 || snippetSummary.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    snippetSummary,
    items,
  };
}

const baseEllipsisDisplayPatternEntries = [
  {
    id: 'single-line-ellipsis',
    title: '1行省略',
    summary:
      '横幅を固定した一覧だけでなく、リサイズするパネルや可変幅レイアウトでも1行省略で密度を保ちます。',
    problem:
      '長いタイトルや補足文がそのまま入ると、一覧の高さが項目ごとにばらつきます。さらに可変幅レイアウトでは、省略したいのに要素が縮まず ellipsis が効かないことがあります。',
    solution:
      '固定幅では `max-width`、可変幅では `minmax(0, 1fr)` と `min-width: 0` を組み合わせ、見た目は 1 行に揃えつつ全文確認は別導線へ逃がします。',
    whenToUse:
      'ラベル列、通知一覧、カード見出しに加えて、分割ビューやリサイズ可能なサイドパネルのように横幅が変わる場面でも有効です。',
    accessibilityNotes:
      '省略記号だけに頼らず、詳細ページや近接した補足面で全文へ到達できる状態を保ちます。',
    tags: ['1行固定', '可変幅', '別導線'],
    demoKind: 'single-line-ellipsis',
  },
  {
    id: 'multi-line-clamp',
    title: '複数行クランプ',
    summary:
      '2〜3行の要約を残しつつカード密度を保ち、長文でも一覧比較しやすくします。',
    problem:
      '1 行では情報が足りない説明文を全文表示すると、カード群の高さが不揃いになって比較しづらくなります。',
    solution:
      '`-webkit-line-clamp: 3` を基準に複数行で要約表示し、非対応環境でも読める fallback と全文導線を別に持たせます。',
    whenToUse:
      '概要カード、更新履歴、説明付きのリストなど、少しだけ文脈を残して比較したい一覧に向いています。',
    accessibilityNotes:
      'vendor-prefixed な見せ方だけに依存せず、長大 token には `overflow-wrap: anywhere` を加えて崩れを防ぎます。',
    tags: ['3行要約', '互換性注意', 'long token'],
    demoKind: 'multi-line-clamp',
  },
  {
    id: 'full-text-supplement',
    title: '全文補足',
    summary:
      '要約表示の近くに全文面を置き、一覧密度を保ったまま完全な文面も参照できるようにします。',
    problem:
      '省略表示だけでは、どの文言が重要で、どれが単なる装飾か判断しづらく全文参照の負荷が上がります。',
    solution:
      '要約側と全文側を近接配置し、視線移動を増やさずに「短く見る」と「完全に読む」を両立させます。',
    whenToUse:
      'コメント、補足メモ、要約と原文を同時に扱うカードなど、全文の価値が高い一覧に向いています。',
    accessibilityNotes:
      'hover 依存の補足は避け、常に到達できる補足面と `overflow-wrap: anywhere` で全文を失わない構造にします。',
    tags: ['要約 + 全文', '近接補足', '常時到達'],
    demoKind: 'full-text-supplement',
  },
  {
    id: 'accessible-disclosure',
    title: 'アクセシブルな開閉',
    summary:
      '通常時は要約、必要時だけボタンで全文を展開し、キーボード操作でも確実に到達できます。',
    problem:
      '全文を常時表示すると一覧が伸びますが、tooltip や hover だけではタッチやキーボードで読みにくくなります。',
    solution:
      '明示的な開閉ボタンと `aria-expanded` / `aria-controls` を使い、ボタンラベル・状態テキスト・全文パネルを同期させながら必要なときだけ全文を展開します。',
    whenToUse:
      'FAQ の抜粋、監査メモ、カード内の詳細説明など、要約と全文の切り替えを利用者に委ねたい場面に向いています。',
    accessibilityNotes:
      'トリガーボタンにフォーカスを維持したまま、表示状態・属性値・補助テキストを同期させ、予期しないフォーカスジャンプを避けます。',
    tags: ['開閉', 'aria-expanded', 'キーボード対応'],
    demoKind: 'accessible-disclosure',
  },
] satisfies Array<Omit<EllipsisDisplayPatternEntry, 'snippets'>>;

export const ellipsisDisplayPatternEntries: EllipsisDisplayPatternEntry[] =
  baseEllipsisDisplayPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(ellipsisDisplayPatternSnippets[entry.id]),
  }));
