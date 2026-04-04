import {inputPatternSnippets} from '@site/src/data/inputPatternSnippets';
import type {InputPatternEntry} from '@site/src/data/inputPatternTypes';

export const inputPatternEntries: InputPatternEntry[] = [
  {
    id: 'outline-text-field',
    title: 'アウトライン型テキストフィールド',
    description:
      '輪郭線を主役にして、hover / focus / error / disabled を最短で認識させるライブラリ風の自作テキストフィールドです。',
    tags: ['outline', 'focus', 'error', 'css'],
    comparisonTip:
      '最も汎用的に使いたいならアウトライン型、背景面で密度を下げたいならフィルド型、一覧密度を優先するならアンダーライン型を選びます。',
    snippets: inputPatternSnippets['outline-text-field'].default,
  },
  {
    id: 'filled-text-field',
    title: 'フィルド型テキストフィールド',
    description:
      '塗りのある surface を基準に、focus ring と背景差で状態を見せるライブラリ風の自作テキストフィールドです。',
    tags: ['filled', 'focus', 'surface', 'css'],
    comparisonTip:
      'フォーム全体の圧を下げたい面や、カード UI とトーンを揃えたい面に向きます。輪郭を強く見せたいならアウトライン型を選びます。',
    snippets: inputPatternSnippets['filled-text-field'].default,
  },
  {
    id: 'underline-text-field',
    title: 'アンダーライン型テキストフィールド',
    description:
      '下線を主役にして、focus / error の変化を細く鋭く見せるライブラリ風の自作テキストフィールドです。',
    tags: ['underline', 'dense', 'focus', 'css'],
    comparisonTip:
      '一覧密度を保ちたいフォームや軽い見た目にしたい面に向きます。入力面の囲いを強く出したいならアウトライン型かフィルド型を選びます。',
    snippets: inputPatternSnippets['underline-text-field'].default,
  },
  {
    id: 'borderless-text-field',
    title: 'ボーダーレス型テキストフィールド',
    description:
      '輪郭を極力消して、hover / focus / error でだけ surface を持ち上げるライブラリ風の自作テキストフィールドです。',
    tags: ['borderless', 'quiet', 'focus', 'css'],
    comparisonTip:
      '周囲の UI ノイズを減らしたい面や、一覧・ツールバーに自然に馴染ませたい面に向きます。常時の輪郭が必要ならアウトライン型を選びます。',
    snippets: inputPatternSnippets['borderless-text-field'].default,
  },
  {
    id: 'pill-text-field',
    title: 'ピル型テキストフィールド',
    description:
      '丸みを強くした shell と ring で、検索バーのような軽さと focus の拾いやすさを両立するライブラリ風の自作テキストフィールドです。',
    tags: ['pill', 'search', 'focus', 'css'],
    comparisonTip:
      '検索バーや quick filter のように軽い印象を保ちたい面に向きます。より汎用的なフォームならアウトライン型かフィルド型を選びます。',
    snippets: inputPatternSnippets['pill-text-field'].default,
  },
];
