import type {AvatarPatternEntry} from '@site/src/data/avatarPatternTypes';

export const avatarPatternEntries: AvatarPatternEntry[] = [
  {
    id: 'standalone-avatar',
    title: '単体アバター',
    summary:
      '画像、イニシャル、アイコン fallback を同じサイズ体系で扱い、主体を小さな視覚要素として安定して表示する基本パターンです。',
    problem:
      '画像が取得できないケースや名前が未設定のケースを後回しにすると、一覧やコメント欄で avatar のサイズが揺れ、誰の情報なのかが追いにくくなります。',
    solution:
      'image / initials / icon fallback を同じ外形とサイズ token でそろえ、画像失敗時も同じ領域に収まる fallback を用意します。',
    whenToUse:
      'プロフィール、コメント投稿者、担当者セルなど、主体の存在をテキストの前後に短く添えたい場面に向いています。',
    layoutNotes:
      '24 / 32 / 40 / 56px など用途別サイズを固定し、画像、文字、アイコンのどれでも同じ inline-size / block-size を維持します。',
    stateNotes:
      'オンライン状態や承認状態は avatar 本体ではなく付随 indicator として扱います。avatar 単体は主体の識別に責務を絞ります。',
    accessibilityNotes:
      '周囲に名前がある場合は画像の alt を空にし、avatar 単独で主体を表す場合だけ aria-label や代替テキストで名前を補います。',
    tags: ['avatar', 'fallback', 'プロフィール'],
    variantIds: ['image', 'initials', 'icon'],
  },
  {
    id: 'avatar-group',
    title: 'アバターグループ',
    summary:
      '複数人の参加状態を overlap / stacked / summary の composition として見せ、人数が増えても密度と可読性を保つパターンです。',
    problem:
      '複数 avatar を単に横並びにすると幅を使いすぎ、重ねすぎると誰が含まれているか分かりにくくなります。',
    solution:
      '表示人数の上限、重なり幅、余剰人数の summary 表示を決め、avatar 本体とは別の group composition として設計します。',
    whenToUse:
      '共同編集者、参加メンバー、レビュー担当者、チーム一覧など、複数主体をコンパクトに示したい場面に向いています。',
    layoutNotes:
      '重ねる場合は border や background で境界を残し、表示上限を超える人数は +N の summary avatar に寄せます。',
    stateNotes:
      'group 全体の hover や tooltip は composition 側の責務です。個別 avatar の状態表示と混ぜすぎないようにします。',
    accessibilityNotes:
      '見た目だけで人数を伝えず、group に aria-label を付けて「参加者 6 人」など読み上げ可能な要約を用意します。',
    tags: ['avatar group', '参加者', 'summary'],
    variantIds: ['overlap-group', 'stacked-group', 'summary-group'],
  },
  {
    id: 'avatar-with-label',
    title: 'ラベル付きアバター',
    summary:
      'avatar と名前、役割、補足メタ情報を組み合わせ、一覧・カード・コメント行で主体情報を読み取りやすくするパターンです。',
    problem:
      'avatar だけに頼ると名前や役割が分からず、テキストだけにすると人物情報のスキャン性が落ちます。',
    solution:
      'avatar を視覚的なアンカーにし、主ラベル、補足ラベル、ステータス indicator を近接配置して情報階層を固定します。',
    whenToUse:
      'メンバー一覧、コメントヘッダー、担当者カード、検索結果など、主体の名前と補足情報を同時に見せたい場面に向いています。',
    layoutNotes:
      '名前は 1 行で強く、役割やメールなどの補足は小さく置きます。狭い幅では補足テキストを省略して avatar と主ラベルを残します。',
    stateNotes:
      'status dot や badge は avatar 本体に埋め込まず、ラベル行や avatar の隣に付随要素として置きます。',
    accessibilityNotes:
      '名前テキストが隣接している場合、avatar 画像は装飾として扱います。ステータスは色だけでなくテキストでも補います。',
    tags: ['avatar', 'label', 'メンバー表示'],
    variantIds: ['inline-label', 'card-label', 'list-label'],
  },
];
