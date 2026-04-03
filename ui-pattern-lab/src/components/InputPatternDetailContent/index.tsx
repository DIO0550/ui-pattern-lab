import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import PatternReferenceContent, {
  type PatternReferenceVariant,
  buildReferenceCodeTabs,
} from '@site/src/components/PatternReferenceContent';
import {inputPatternEntries} from '@site/src/data/inputPatternEntries';
import {
  buildInputDetailPath,
  INPUT_CATEGORY_PATH,
  INPUT_PATTERN_PAGE_PATH,
} from '@site/src/data/inputPatternPaths';
import {inputPatternSnippets} from '@site/src/data/inputPatternSnippets';
import type {InputPatternEntryId} from '@site/src/data/inputPatternTypes';
import {assertNever} from '@site/src/utils/assertNever';

import {
  ClearableTextInputControl,
  CustomDesignFrame,
  InputField,
  PreviewCard,
  SearchAdornmentIcon,
  TextInputControl,
} from '@site/src/components/InputPatternGallery/shared';
import styles from './styles.module.css';

type Props = {
  entryId: InputPatternEntryId;
};

function buildTabs(entryId: InputPatternEntryId, variantId: string) {
  return buildReferenceCodeTabs(inputPatternSnippets[entryId]?.[variantId]?.items);
}

function buildNotes(entryId: InputPatternEntryId) {
  switch (entryId) {
    case 'basic-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '単一行 input でも label を省略すると、placeholder が消えた瞬間に入力内容の意味が追えなくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'label を常設し、placeholder は形式や例示だけに限定して、値の意味と補助文を分離します。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '氏名、会社名、電話番号のような single-line text input を最小構成で置きたいフォームに向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            'label、input、helper の縦間隔を近接させ、複数 field が縦に続いても読み順が崩れない配置を保ちます。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            '初期状態は neutral に保ち、placeholder に必須や validation の意味を背負わせないようにします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'label と input を関連付け、helper がある場合は aria-describedby で結線して読み上げ文脈を保ちます。',
        },
      ];
    case 'label-helper-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '入力形式や公開範囲を field から遠ざけると、入力前に必要な判断をユーザーが取りこぼしやすくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'label は値の意味、helper は形式や運用ルールという役割で分担し、1フィールド1メッセージに整理します。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            'メールアドレス、URL、公開名など、入力値に補足説明が必要だが error ではない場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            'helper text は input の直下に寄せ、長文化する場合は field の外へ逃がして line-height を保ちます。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'helper と error を同時に強く主張しすぎないよう、error 表示時は helper の役割を再整理します。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'helper text は aria-describedby に含め、placeholder だけで入力意図を伝えないようにします。',
        },
      ];
    case 'validation-state-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '入力中・エラー・成功の状態が混ざると、どのメッセージが現在有効なのか UI から読み取りにくくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'neutral / error / success を helper と border で揃え、error 時だけ aria-invalid を有効にします。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            'パスワード、メールアドレス、コード入力など、入力規則や即時検証がある field に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            'error / success text は input の近くに固定し、field 高さが多少変わっても読み順を崩さない縦積みにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'success は本当に検証が通ったときだけに限定し、入力中は neutral の helper へ戻して意味を明確にします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'error 時は aria-invalid を付け、helper / error の id を aria-describedby に含めて screen reader の文脈を保ちます。',
        },
      ];
    case 'addon-icon-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            'icon だけで入力目的を説明すると、意味が曖昧になり、label や helper が欠けた field になりがちです。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'addon は補助的な装飾として使い、label・helper・focus ring を優先したまま leading / trailing を差し込みます。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '検索、フィルタ、クリア操作のように入力目的や補助操作を近接して見せたい field に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '左右の adornment に合わせて input padding を調整し、文字列と icon が重ならないようにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'leading / trailing の有無で focus ring や入力余白を変えず、状態差分は input 本体側に集約します。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'icon は補助装飾として aria-hidden にし、入力意味は label と helper text で必ず補います。',
        },
      ];
    case 'disabled-readonly-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            'disabled / readOnly / required を同じ見た目で済ませると、なぜ編集できないか、何が必須かが曖昧になります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'disabled・readOnly・required を別の責務として切り分け、理由や再編集条件を helper で補います。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '契約プラン固定値、システム採番値、作成時必須値のように、編集可否と必須性を分けたい field に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '非編集状態でも label / value / helper の近接関係は崩さず、disabled 理由が field から離れないようにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'disabled は操作不能、readOnly は閲覧可能、required は入力 obligation として別々に扱います。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'disabled は native attribute、readOnly は値を読み取れる状態を保ち、required は label と aria-required の両方で示します。',
        },
      ];
    case 'custom-design-input':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '自作 input の見た目だけを強めると、label・helper・状態表示の役割が混ざり、入力ルールが UI から読み取りにくくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            '装飾や状態チップは field の外側の surface にまとめ、input 本体は標準的な label・helper・focus を保って意味を分離します。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '設定カード、ブランド面の強いプロフィール編集、キャンペーン管理のように、入力文脈を UI 上で強く見せたい場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '装飾用の header / badge / note を足しても、field 自体の余白と読み順は 1 カラムで保ち、入力操作の起点を見失わせないようにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'brand tone や status chip は文脈補助にとどめ、validation や disabled の意味を色や装飾だけで上書きしないようにします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            '独自 surface を被せても input は native 要素のまま保ち、label / helper / readOnly などの意味付けを維持します。',
        },
      ];
    default:
      return assertNever(entryId);
  }
}

function buildVariants(entryId: InputPatternEntryId): readonly PatternReferenceVariant[] {
  switch (entryId) {
    case 'basic-input':
      return [
        {
          id: 'basic-input-default',
          name: 'default',
          description: 'ラベル付きの単一行 input を最小構成で置く baseline です。',
          preview: (
            <PreviewCard
              description="label を常設し、値の意味を placeholder に依存させません。"
              label="default">
              <InputField
                control={<TextInputControl defaultValue="株式会社サンプル" />}
                label="会社名"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('basic-input', 'default'),
        },
        {
          id: 'basic-input-with-placeholder',
          name: 'with-placeholder',
          description: 'placeholder は期待する形式や例を補うためにだけ使います。',
          preview: (
            <PreviewCard
              description="label は残したまま、未入力時だけ期待値を placeholder で補います。"
              label="with-placeholder">
              <InputField
                control={<TextInputControl placeholder="例: 03-1234-5678" />}
                label="電話番号"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('basic-input', 'with-placeholder'),
        },
      ] as const;
    case 'label-helper-input':
      return [
        {
          id: 'label-helper-input-label-only',
          name: 'label-only',
          description: '説明が不要な field は label だけで簡潔に保ちます。',
          preview: (
            <PreviewCard
              description="補助文を足さなくても意味が通る field は label のみで成立させます。"
              label="label-only">
              <InputField
                control={<TextInputControl defaultValue="support@example.com" />}
                label="連絡先メールアドレス"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('label-helper-input', 'label-only'),
        },
        {
          id: 'label-helper-input-with-helper-text',
          name: 'with-helper-text',
          description: 'helper text で入力形式や公開範囲を field 直下に補います。',
          preview: (
            <PreviewCard
              description="label と helper で役割を分け、入力前に必要な情報だけを近くへ置きます。"
              label="with-helper-text">
              <InputField
                control={<TextInputControl defaultValue="@pattern-lab" />}
                helperText="公開 URL に使うため、英小文字・数字・ハイフンで入力します。"
                label="プロフィール URL"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('label-helper-input', 'with-helper-text'),
        },
      ] as const;
    case 'validation-state-input':
      return [
        {
          id: 'validation-state-input-default',
          name: 'default',
          description: '未検証の初期状態では neutral な helper を保ちます。',
          preview: (
            <PreviewCard
              description="入力中は helper で期待値を示し、error / success へ急がせません。"
              label="default">
              <InputField
                control={<TextInputControl defaultValue="securepass" />}
                helperText="8文字以上で、数字と記号を1文字以上含めます。"
                label="パスワード"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('validation-state-input', 'default'),
        },
        {
          id: 'validation-state-input-error',
          name: 'error',
          description: 'error は入力規則違反をその場で明示します。',
          preview: (
            <PreviewCard
              description="border と errorText を同時に出し、現在の問題点を 1 文で伝えます。"
              label="error">
              <InputField
                control={<TextInputControl defaultValue="abc" state="error" />}
                errorText="8文字以上で入力してください。"
                label="パスワード"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('validation-state-input', 'error'),
        },
        {
          id: 'validation-state-input-success',
          name: 'success',
          description: 'success は確認済み状態だけに限定して使います。',
          preview: (
            <PreviewCard
              description="検証済みのときだけ success border と helper を出し、入力中と混ぜません。"
              label="success">
              <InputField
                control={
                  <TextInputControl
                    defaultValue="invoice@sample.co.jp"
                    state="success"
                  />
                }
                helperText="確認済みのメールアドレスです。"
                label="通知先メールアドレス"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('validation-state-input', 'success'),
        },
      ] as const;
    case 'addon-icon-input':
      return [
        {
          id: 'addon-icon-input-leading-icon',
          name: 'leading-icon',
          description: 'leading icon で入力目的を補助します。',
          preview: (
            <PreviewCard
              description="検索のような入力目的を leading adornment で短く補います。"
              label="leading-icon">
              <InputField
                control={
                  <TextInputControl
                    leadingAdornment={<SearchAdornmentIcon />}
                    placeholder="キーワードで検索"
                  />
                }
                label="ドキュメント検索"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('addon-icon-input', 'leading-icon'),
        },
        {
          id: 'addon-icon-input-trailing-icon',
          name: 'trailing-icon',
          description: 'trailing icon で clear などの補助操作を添えます。',
          preview: (
            <PreviewCard
              description="値の末尾に補助操作を置きつつ、読み順と field 幅を崩しません。"
              label="trailing-icon">
              <InputField
                control={
                  <ClearableTextInputControl initialValue="請求書" />
                }
                helperText="候補を絞り込むキーワードを入力します。"
                label="検索条件"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('addon-icon-input', 'trailing-icon'),
        },
        {
          id: 'addon-icon-input-leading-and-trailing',
          name: 'leading-and-trailing',
          description: '左右両方の adornment を使っても text area を保ちます。',
          preview: (
            <PreviewCard
              description="leading / trailing を同時に入れても padding と focus ring を一貫させます。"
              label="leading-and-trailing">
              <InputField
                control={
                  <ClearableTextInputControl
                    initialValue="会議"
                    leadingAdornment={<SearchAdornmentIcon />}
                  />
                }
                helperText="query を保ったまま再調整できます。"
                label="検索ワード"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('addon-icon-input', 'leading-and-trailing'),
        },
      ] as const;
    case 'disabled-readonly-input':
      return [
        {
          id: 'disabled-readonly-input-disabled',
          name: 'disabled',
          description: 'disabled は操作不能な理由を一緒に示します。',
          preview: (
            <PreviewCard
              description="契約や権限により編集できない field を disabled で表します。"
              label="disabled">
              <InputField
                control={<TextInputControl defaultValue="契約プランで固定" disabled />}
                helperText="Businessプラン以上で編集できます。"
                label="請求先コード"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('disabled-readonly-input', 'disabled'),
        },
        {
          id: 'disabled-readonly-input-read-only',
          name: 'read-only',
          description: 'readOnly は値を見せつつ編集だけ止める状態です。',
          preview: (
            <PreviewCard
              description="内容は確認できるが、直接編集はできない値に readOnly を使います。"
              label="read-only">
              <InputField
                control={<TextInputControl defaultValue="tokyo-head-office" readOnly />}
                helperText="識別子は作成時に自動採番されます。"
                label="チームID"
              />
            </PreviewCard>
          ),
          tabs: buildTabs('disabled-readonly-input', 'read-only'),
        },
        {
          id: 'disabled-readonly-input-required',
          name: 'required',
          description: 'required は label と helper で常設します。',
          preview: (
            <PreviewCard
              description="必須入力は placeholder や submit 時の error だけに頼らず、常時示します。"
              label="required">
              <InputField
                control={<TextInputControl placeholder="例: 東京本社" />}
                helperText="請求書に表示される名称です。"
                label="拠点名"
                required
              />
            </PreviewCard>
          ),
          tabs: buildTabs('disabled-readonly-input', 'required'),
        },
      ] as const;
    case 'custom-design-input':
      return [
        {
          id: 'custom-design-input-editorial-card',
          name: 'editorial-card',
          description: '文脈説明をまとめたカード surface に、編集可能な input を載せる自作デザインです。',
          preview: (
            <PreviewCard
              description="独自の header や badge を足しても、input 本体は label / helper / focus を保ちます。"
              label="editorial-card">
              <CustomDesignFrame
                badge="下書き"
                description="補足情報やトーンを field の外枠に寄せ、設定カードらしい見た目を作ります。"
                eyebrow="自作UI"
                footerNote="カード型設定やモーダル内で、入力の意図を強めたい場面に向きます。"
                title="公開プロフィール">
                <InputField
                  control={<TextInputControl defaultValue="Pattern Lab Japan" tone="brand" />}
                  helperText="プロフィールカードに表示される名称です。"
                  label="表示名"
                />
              </CustomDesignFrame>
            </PreviewCard>
          ),
          tabs: buildTabs('custom-design-input', 'editorial-card'),
        },
        {
          id: 'custom-design-input-status-panel',
          name: 'status-panel',
          description: '状態チップと運用メモをまとめ、非編集の理由を surface 側で伝える構成です。',
          preview: (
            <PreviewCard
              description="公開状態や固定値の理由を header / footer に逃がし、field 本体の責務を増やしすぎません。"
              label="status-panel">
              <CustomDesignFrame
                badge="公開中"
                description="状態チップや運用メモを header にまとめ、field 本体の役割を増やしすぎません。"
                eyebrow="自作UI"
                footerNote="公開後は URL を固定し、別導線から変更させます。"
                title="キャンペーン設定">
                <InputField
                  control={<TextInputControl defaultValue="spring-launch" readOnly tone="brand" />}
                  helperText="URL スラッグは公開後に固定されます。"
                  label="キャンペーンID"
                />
              </CustomDesignFrame>
            </PreviewCard>
          ),
          tabs: buildTabs('custom-design-input', 'status-panel'),
        },
      ] as const;
    default:
      return assertNever(entryId);
  }
}

export default function InputPatternDetailContent({entryId}: Props): ReactNode {
  const entry = inputPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown input pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={INPUT_CATEGORY_PATH}>入力</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={INPUT_PATTERN_PAGE_PATH}>入力デザインパターン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する TSX サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to={INPUT_PATTERN_PAGE_PATH}>入力デザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={INPUT_CATEGORY_PATH}>入力</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        helper / error / disabled の横断ルールは{' '}
        <Link to="/selector/states-and-validation">selector / states と validation の共通参照</Link>{' '}
        も合わせて確認してください。各 variant は <strong>1 variant = 1 code panel</strong>{' '}
        で分離しています。
      </p>
      <PatternReferenceContent
        notes={buildNotes(entry.id)}
        variantNote="各 variant は 1 preview + 1 code panel として分離し、差分だけを追えるようにしています。"
        variants={buildVariants(entry.id)}
      />
    </div>
  );
}
