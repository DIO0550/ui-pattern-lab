import {inputPatternSnippets} from '@site/src/data/inputPatternSnippets';
import type {InputPatternEntry} from '@site/src/data/inputPatternTypes';

export const inputPatternEntries: InputPatternEntry[] = [
  {
    id: 'basic-input',
    title: '基本入力',
    description:
      '単一行 text input の baseline です。label を主、placeholder を補助として扱う最小構成を整理します。',
    tags: ['baseline', 'single-line', 'フォーム入力'],
    comparisonTip:
      '複数行の自由記述は textarea、候補から 1 つ選ぶ入力は selector を選びます。',
    snippets: inputPatternSnippets['basic-input'].default,
  },
  {
    id: 'label-helper-input',
    title: 'ラベル・補助文付き入力',
    description:
      'label と helper text の責務分担を明示し、入力形式や公開範囲を近接配置で補うパターンです。',
    tags: ['helper', 'guidance', 'accessibility'],
    comparisonTip:
      '説明が長すぎる場合は field 直下に詰め込まず、周辺の説明文や別セクションへ逃がします。',
    snippets: inputPatternSnippets['label-helper-input']['with-helper-text'],
  },
  {
    id: 'validation-state-input',
    title: 'バリデーション状態入力',
    description:
      'neutral / error / success の状態差分を、helper text と aria-invalid を含めて一貫して扱います。',
    tags: ['validation', 'error', 'success'],
    comparisonTip:
      '未入力・入力中・確定済みを同時に主張しすぎず、1フィールド1メッセージに整理します。',
    snippets: inputPatternSnippets['validation-state-input'].error,
  },
  {
    id: 'addon-icon-input',
    title: 'アドオン・アイコン付き入力',
    description:
      'leading / trailing adornment を使い、入力目的や補助操作を示しつつ text input の読み順を保つパターンです。',
    tags: ['addon', 'icon', 'search'],
    comparisonTip:
      'icon だけで意味を背負わせず、label と helper text を残して入力文脈を補います。',
    snippets: inputPatternSnippets['addon-icon-input']['leading-and-trailing'],
  },
  {
    id: 'disabled-readonly-input',
    title: '無効・読み取り専用・必須入力',
    description:
      '編集不可と必須入力の違いを分け、disabled / readOnly / required を別々の意味として扱います。',
    tags: ['states', 'required', 'non-editable'],
    comparisonTip:
      '操作できない理由を hidden にせず、disabled / readOnly の理由や再編集条件を近くで補います。',
    snippets: inputPatternSnippets['disabled-readonly-input'].disabled,
  },
  {
    id: 'custom-design-input',
    title: '自作デザイン入力',
    description:
      '標準 input の意味付けを保ちながら、文脈や状態チップを独自の surface にまとめて見せるパターンです。',
    tags: ['custom-ui', 'branding', 'context'],
    comparisonTip:
      '独自デザインを強めても、label・helper・focus 表示・読み上げ文脈は native input の基本に寄せて保ちます。',
    snippets: inputPatternSnippets['custom-design-input']['editorial-card'],
  },
];
