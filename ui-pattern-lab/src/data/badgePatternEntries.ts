import type {BadgePatternEntry} from '@site/src/data/badgePatternTypes';

export const badgePatternEntries: BadgePatternEntry[] = [
  {
    id: 'text-and-number-badge',
    title: 'テキスト・数値バッジ',
    summary:
      'テキストや件数をコンパクトに補足し、Filled / Outlined / Soft / Surface の 4 variant と 6 色で状態や属性を伝える基本バッジです。',
    problem:
      'Badge を button や chip と同じノリで使うと、押せる要素なのか、補足情報ラベルなのかが曖昧になり、一覧やカード内の情報階層が崩れやすくなります。',
    solution:
      '非インタラクティブな補足ラベルとして責務を固定し、Filled / Outlined / Soft / Surface の見え方と色の意味をそろえることで、情報の重さと文脈を小さな面積で伝えます。',
    whenToUse:
      'ステータス、件数、カテゴリ補足、公開状態など、本文より軽い情報を 1 行で短く添えたい場面に向いています。',
    layoutNotes:
      'Badge は inline-flex を基準にし、1 行 compact を保ちます。数字は桁幅差を吸収しつつ、0 / 8 / 24 / 99+ のような表示上限も崩れないサイズにそろえます。',
    stateNotes:
      '初回スコープでは hover / active を持たない非インタラクティブ要素として扱い、variant と色で情報の重さだけを調整します。押下・削除・選択状態は別パターンへ切り分けます。',
    accessibilityNotes:
      '色だけで意味を伝えず、テキストや周辺文脈でも役割が分かるようにします。数字だけの badge は近くのラベルと組み合わせ、読み上げでも意味が欠けない配置を優先します。',
    tags: ['badge', '件数表示', '補足ラベル'],
  },
];
