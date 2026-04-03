import type {
  InputPatternEntryId,
  InputPatternSnippets,
} from '@site/src/data/inputPatternTypes';

export type InputPatternVariantSnippetMap = Record<string, InputPatternSnippets>;

export const inputPatternSnippets: Record<InputPatternEntryId, InputPatternVariantSnippetMap> = {
  'basic-input': {
    default: {
      snippetSummary: 'ラベル付きの単一行 input を最小構成で置く baseline です。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="株式会社サンプル" />}
  label="会社名"
/>`,
        },
      ],
    },
    'with-placeholder': {
      snippetSummary: 'placeholder は label の代わりではなく、期待する入力形式の補助に限定します。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl placeholder="例: 03-1234-5678" />}
  label="電話番号"
/>`,
        },
      ],
    },
  },
  'label-helper-input': {
    'label-only': {
      snippetSummary: '補助文が不要なときは label のみで意味を渡し、余白を詰めます。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="support@example.com" />}
  label="連絡先メールアドレス"
/>`,
        },
      ],
    },
    'with-helper-text': {
      snippetSummary: 'helper text で入力形式や公開範囲を補い、label と分担させます。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="@pattern-lab" />}
  helperText="公開 URL に使うため、英小文字・数字・ハイフンで入力します。"
  label="プロフィール URL"
/>`,
        },
      ],
    },
  },
  'validation-state-input': {
    default: {
      snippetSummary: '入力中は helper を保ち、未検証の初期状態を neutral に扱います。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="securepass" />}
  helperText="8文字以上で、数字と記号を1文字以上含めます。"
  label="パスワード"
/>`,
        },
      ],
    },
    error: {
      snippetSummary: 'error は border と errorText をセットで出し、aria-invalid を有効にします。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="abc" state="error" />}
  errorText="8文字以上で入力してください。"
  label="パスワード"
/>`,
        },
      ],
    },
    success: {
      snippetSummary: 'success は入力が確定的に通ったときだけ使い、helper と矛盾させません。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="invoice@sample.co.jp" state="success" />}
  helperText="確認済みのメールアドレスです。"
  label="通知先メールアドレス"
/>`,
        },
      ],
    },
  },
  'addon-icon-input': {
    'leading-icon': {
      snippetSummary: 'leading icon は入力目的を補う装飾として使い、label の代替にしません。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {
  InputField,
  SearchAdornmentIcon,
  TextInputControl,
} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl leadingAdornment={<SearchAdornmentIcon />} placeholder="キーワードで検索" />}
  label="ドキュメント検索"
/>`,
        },
      ],
    },
    'trailing-icon': {
      snippetSummary: 'trailing icon は clear や status のような補助操作 / 補助状態だけに寄せます。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {
  ClearableTextInputControl,
  InputField,
} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<ClearableTextInputControl initialValue="請求書" />}
  helperText="候補を絞り込むキーワードを入力します。"
  label="検索条件"
/>`,
        },
      ],
    },
    'leading-and-trailing': {
      snippetSummary: 'leading / trailing の両方を置く場合も padding と focus ring を崩さないようにします。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {
  ClearableTextInputControl,
  InputField,
  SearchAdornmentIcon,
} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={
    <ClearableTextInputControl
      initialValue="会議"
      leadingAdornment={<SearchAdornmentIcon />}
    />
  }
  helperText="絞り込み中の query をその場で調整できます。"
  label="検索ワード"
/>`,
        },
      ],
    },
  },
  'disabled-readonly-input': {
    disabled: {
      snippetSummary: 'disabled は操作不能な理由を helper で補い、見た目だけで放置しません。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="契約プランで固定" disabled />}
  helperText="Businessプラン以上で編集できます。"
  label="請求先コード"
/>`,
        },
      ],
    },
    'read-only': {
      snippetSummary: 'readOnly は内容を見せつつ編集だけ止めたい場面に限定します。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl defaultValue="tokyo-head-office" readOnly />}
  helperText="識別子は作成時に自動採番されます。"
  label="チームID"
/>`,
        },
      ],
    },
    required: {
      snippetSummary: 'required は label 側で常時示し、placeholder や error だけに依存しません。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {InputField, TextInputControl} from '@site/src/components/InputPatternGallery/shared';

<InputField
  control={<TextInputControl placeholder="例: 東京本社" />}
  helperText="請求書に表示される名称です。"
  label="拠点名"
  required
/>`,
        },
      ],
    },
  },
  'custom-design-input': {
    'editorial-card': {
      snippetSummary:
        '入力の文脈を外枠に寄せつつ、input 自体は標準的なラベル・helper・focus を保つ自作デザインです。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {
  CustomDesignFrame,
  InputField,
  TextInputControl,
} from '@site/src/components/InputPatternGallery/shared';

<CustomDesignFrame
  badge="下書き"
  description="文脈や補足情報を input の外枠に集約した自作デザインです。"
  eyebrow="自作UI"
  footerNote="カード型設定やモーダル内で、入力の意図を強めたい場面に向きます。"
  title="公開プロフィール">
  <InputField
    control={<TextInputControl defaultValue="Pattern Lab Japan" tone="brand" />}
    helperText="プロフィールカードに表示される名称です。"
    label="表示名"
  />
</CustomDesignFrame>`,
        },
      ],
    },
    'status-panel': {
      snippetSummary:
        '状態チップや運用メモを field の外側にまとめ、input 本体へ意味を詰め込みすぎない構成です。',
      items: [
        {
          id: 'tsx',
          label: 'TSX',
          language: 'tsx',
          code: `import {
  CustomDesignFrame,
  InputField,
  TextInputControl,
} from '@site/src/components/InputPatternGallery/shared';

<CustomDesignFrame
  badge="公開中"
  description="状態チップや運用メモを header にまとめ、field 本体の役割を増やしすぎません。"
  eyebrow="自作UI"
  footerNote="公開後は URL を固定し、別の導線から変更させます。"
  title="キャンペーン設定">
  <InputField
    control={<TextInputControl defaultValue="spring-launch" readOnly tone="brand" />}
    helperText="URL スラッグは公開後に固定されます。"
    label="キャンペーンID"
  />
</CustomDesignFrame>`,
        },
      ],
    },
  },
};
