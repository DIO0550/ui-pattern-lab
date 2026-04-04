import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import clsx from 'clsx';

import {PreviewCard} from './shared';
import styles from './customDesign.module.css';

export type CustomDesignVariantId =
  | 'outline'
  | 'filled'
  | 'underline'
  | 'borderless'
  | 'pill';
export type CustomDesignStateId = 'default' | 'error' | 'disabled';

type CustomDesignTextInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'className' | 'disabled' | 'value'
> & {
  variant: CustomDesignVariantId;
  state?: CustomDesignStateId;
  label: string;
  helperText?: string;
  errorText?: string;
  value?: string;
};

export type CustomDesignPreviewDefinition = {
  id: CustomDesignVariantId;
  label: string;
  previewDescription: string;
  detailDescription: string;
};

export type CustomDesignStateDefinition = {
  id: CustomDesignStateId;
  label: string;
  description: string;
  helperText?: string;
  errorText?: string;
  value?: string;
  placeholder?: string;
};

const previewStates: readonly CustomDesignStateId[] = ['default', 'error', 'disabled'];

export const customDesignPreviewDefinitions = [
  {
    id: 'outline',
    label: 'アウトライン型テキストフィールド',
    previewDescription:
      'もっとも汎用的なライブラリ風スタイルです。border と ring で hover / focus / error を明快に出します。',
    detailDescription:
      '輪郭線を主役にしたデザインで、hover・focus・error・disabled の差分を最短で認識させたいときに向いています。',
  },
  {
    id: 'filled',
    label: 'フィルド型テキストフィールド',
    previewDescription:
      '塗りのある surface を基準にしたライブラリ風スタイルです。focus で ring を足しつつ背景差で状態を見せます。',
    detailDescription:
      '背景面のトーン差で密度を下げつつ、focus では ring と border を足して操作中の状態を伝えるデザインです。',
  },
  {
    id: 'underline',
    label: 'アンダーライン型テキストフィールド',
    previewDescription:
      '下線主体のライブラリ風スタイルです。情報密度を保ちつつ、focus と error を下線の変化で見せます。',
    detailDescription:
      '輪郭を薄くして下線へ視線を集めるデザインで、フォーム密度を高めたい面でも focus と error を保ちやすい構成です。',
  },
  {
    id: 'borderless',
    label: 'ボーダーレス型テキストフィールド',
    previewDescription:
      '輪郭を極力消したライブラリ風スタイルです。hover と focus でだけ surface を持ち上げて状態を見せます。',
    detailDescription:
      '常時の枠線を弱めてノイズを減らしつつ、focus と error だけは下辺や ring で拾いやすくするデザインです。',
  },
  {
    id: 'pill',
    label: 'ピル型テキストフィールド',
    previewDescription:
      '丸みを強くしたライブラリ風スタイルです。検索バーのような軽さを保ちつつ focus ring をしっかり出します。',
    detailDescription:
      'search field に近い丸い shell を持つデザインで、軽い見た目を保ちながら focus / error を明確に示したい場面に向いています。',
  },
] as const satisfies readonly CustomDesignPreviewDefinition[];

export const customDesignStateDefinitions = [
  {
    id: 'default',
    label: 'default',
    description: '通常時の見た目です。ラベル、placeholder、helper を基準状態として確認します。',
    helperText: '公開ページに表示される名称です。',
    placeholder: '例: Pattern Lab',
  },
  {
    id: 'error',
    label: 'error',
    description: 'error 時の輪郭色、メッセージ、input 本体の見え方を確認します。',
    errorText: '2 文字以上で入力してください。',
    value: 'P',
  },
  {
    id: 'disabled',
    label: 'disabled',
    description: 'disabled 時のトーンダウンと入力不可状態を確認します。',
    helperText: 'ロール設定によりこの項目は固定です。',
    value: 'system-generated',
  },
] as const satisfies readonly CustomDesignStateDefinition[];

function StateBadge({state}: {state: CustomDesignStateId}): ReactNode {
  return <span className={styles.stateBadge}>{state}</span>;
}

export function getCustomDesignPreviewDefinition(
  variantId: CustomDesignVariantId,
): CustomDesignPreviewDefinition {
  const definition = customDesignPreviewDefinitions.find((item) => item.id === variantId);

  if (!definition) {
    throw new Error(`Unknown custom design preview definition: ${variantId}`);
  }

  return definition;
}

export function getCustomDesignStateDefinition(
  stateId: CustomDesignStateId,
): CustomDesignStateDefinition {
  const definition = customDesignStateDefinitions.find((item) => item.id === stateId);

  if (!definition) {
    throw new Error(`Unknown custom design state definition: ${stateId}`);
  }

  return definition;
}

export function CustomDesignTextInput({
  variant,
  state = 'default',
  label,
  helperText,
  errorText,
  value,
  placeholder,
  ...inputProps
}: CustomDesignTextInputProps): ReactNode {
  const isDisabled = state === 'disabled' || inputProps.disabled === true;
  const helperMessage = state === 'error' ? errorText : helperText;

  return (
    <div className={styles.field} data-demo-state={state} data-variant={variant}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{label}</label>
        <StateBadge state={state} />
      </div>
      <div className={clsx(styles.controlShell, state === 'error' && styles.controlShellError)}>
        <input
          aria-invalid={state === 'error' ? 'true' : undefined}
          className={styles.control}
          defaultValue={value}
          disabled={isDisabled}
          placeholder={placeholder}
          type="text"
          {...inputProps}
        />
      </div>
      {helperMessage ? (
        <p className={clsx(styles.helperText, state === 'error' && styles.helperTextError)}>
          {helperMessage}
        </p>
      ) : null}
    </div>
  );
}

function renderStatePreview(variant: CustomDesignVariantId, state: CustomDesignStateId): ReactNode {
  const stateDefinition = getCustomDesignStateDefinition(state);

  return (
    <CustomDesignTextInput
      errorText={stateDefinition.errorText}
      helperText={stateDefinition.helperText}
      label="表示名"
      placeholder={stateDefinition.placeholder}
      state={state}
      value={stateDefinition.value}
      variant={variant}
    />
  );
}

function DesignPreviewStack({variant}: {variant: CustomDesignVariantId}): ReactNode {
  return (
    <div className={styles.previewStack}>
      {previewStates.map((state) => (
        <div className={styles.previewStateBlock} key={state}>
          {renderStatePreview(variant, state)}
        </div>
      ))}
    </div>
  );
}

export function renderCustomDesignPreviewCard(
  definition: CustomDesignPreviewDefinition,
): ReactNode {
  return (
    <PreviewCard
      className={styles.variantCard}
      description={definition.previewDescription}
      label={definition.label}>
      <DesignPreviewStack variant={definition.id} />
    </PreviewCard>
  );
}

export function renderCustomDesignStatePreviewCard(
  variant: CustomDesignVariantId,
  state: CustomDesignStateId,
): ReactNode {
  const stateDefinition = getCustomDesignStateDefinition(state);

  return (
    <PreviewCard
      className={styles.variantCard}
      description={stateDefinition.description}
      label={stateDefinition.label}>
      {renderStatePreview(variant, state)}
    </PreviewCard>
  );
}
