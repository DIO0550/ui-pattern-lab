import type {AccordionPatternEntry} from '@site/src/data/accordionPatternTypes';

export const accordionPatternEntries: AccordionPatternEntry[] = [
  {
    id: 'disclosure-accordion',
    title: '開閉アコーディオン',
    summary:
      '見出しを押すと関連コンテンツを開閉する基本 accordion です。単一開閉、複数開閉、カード型、FAQ 型の 4 variant で情報密度と見せ方を比較します。',
    problem:
      '長い説明や設定項目をすべて展開したまま並べると、ユーザーは現在読むべき範囲を見失いやすくなります。一方で隠しすぎると、必要な情報の存在に気づけません。',
    solution:
      '見出しを常に見せ、本文だけを開閉する disclosure として設計します。開閉状態、見出し、本文領域の関係を明確にし、情報を段階的に読めるようにします。',
    whenToUse:
      'FAQ、設定セクション、仕様詳細、補足説明、モバイルで長くなりやすいカテゴリ一覧など、同じ粒度の項目を縦に整理したい場面に向いています。',
    layoutNotes:
      '見出し行は十分なクリック領域を確保し、本文は開いた項目の直下に置きます。カード型では余白を広めに、FAQ 型では質問と回答の読みやすさを優先します。',
    stateNotes:
      '開閉状態は aria-expanded とアイコンの向きで示します。単一開閉では現在項目へ集中させ、複数開閉では比較や参照を妨げないようにします。',
    accessibilityNotes:
      'trigger は button とし、aria-controls と aria-expanded を対応させます。本文を隠す場合は hidden を使い、見出し順序と tab 移動を自然に保ちます。',
    tags: ['accordion', 'disclosure', '開閉 UI'],
  },
];
