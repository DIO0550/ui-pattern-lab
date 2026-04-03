import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import InputPatternMetadataPanel from '@site/src/components/InputPatternMetadataPanel';
import InputPatternSnippetPanel from '@site/src/components/InputPatternSnippetPanel';
import {buildInputDetailPath} from '@site/src/data/inputPatternPaths';
import type {InputPatternEntry} from '@site/src/data/inputPatternTypes';
import {assertNever} from '@site/src/utils/assertNever';

import {
  ClearableTextInputControl,
  CustomDesignFrame,
  InputField,
  PreviewCard,
  SearchAdornmentIcon,
  TextInputControl,
} from './shared';
import styles from './styles.module.css';

type Props = {
  entries: InputPatternEntry[];
  density: 'list' | 'detail';
};

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">入力パターンはまだありません</Heading>
      <p>カテゴリの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

function BasicInputPreview(): ReactNode {
  return (
    <PreviewCard
      description="label を主、placeholder を補助に寄せた最小構成です。"
      label="基本入力">
      <div className={styles.previewStack}>
        <InputField
          control={<TextInputControl defaultValue="株式会社サンプル" />}
          label="会社名"
        />
        <InputField
          control={<TextInputControl placeholder="例: 03-1234-5678" />}
          label="電話番号"
        />
      </div>
    </PreviewCard>
  );
}

function LabelHelperPreview(): ReactNode {
  return (
    <PreviewCard
      description="label だけで足りるケースと helper が必要なケースを並べて確認します。"
      label="ラベル・補助文付き入力">
      <div className={styles.previewStack}>
        <InputField
          control={<TextInputControl defaultValue="support@example.com" />}
          label="連絡先メールアドレス"
        />
        <InputField
          control={<TextInputControl defaultValue="@pattern-lab" />}
          helperText="公開 URL に使うため、英小文字・数字・ハイフンで入力します。"
          label="プロフィール URL"
        />
      </div>
    </PreviewCard>
  );
}

function ValidationStatePreview(): ReactNode {
  return (
    <PreviewCard
      description="neutral / error / success を helper text と一緒に扱います。"
      label="バリデーション状態入力">
      <div className={styles.previewStack}>
        <InputField
          control={<TextInputControl defaultValue="securepass" />}
          helperText="8文字以上で、数字と記号を1文字以上含めます。"
          label="パスワード"
        />
        <InputField
          control={<TextInputControl defaultValue="abc" state="error" />}
          errorText="8文字以上で入力してください。"
          label="パスワード"
        />
        <InputField
          control={<TextInputControl defaultValue="invoice@sample.co.jp" state="success" />}
          helperText="確認済みのメールアドレスです。"
          label="通知先メールアドレス"
        />
      </div>
    </PreviewCard>
  );
}

function AddonIconPreview(): ReactNode {
  return (
    <PreviewCard
      description="leading / trailing adornment を置いても label と読み順を維持します。"
      label="アドオン・アイコン付き入力">
      <div className={styles.previewStack}>
        <InputField
          control={
            <TextInputControl
              leadingAdornment={<SearchAdornmentIcon />}
              placeholder="キーワードで検索"
            />
          }
          label="ドキュメント検索"
        />
        <InputField
          control={
            <ClearableTextInputControl
              initialValue="請求書"
            />
          }
          helperText="候補を絞り込むキーワードを入力します。"
          label="検索条件"
        />
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
      </div>
    </PreviewCard>
  );
}

function DisabledReadonlyPreview(): ReactNode {
  return (
    <PreviewCard
      description="disabled / readOnly / required を別の意味として分けます。"
      label="無効・読み取り専用・必須入力">
      <div className={styles.previewStack}>
        <InputField
          control={<TextInputControl defaultValue="契約プランで固定" disabled />}
          helperText="Businessプラン以上で編集できます。"
          label="請求先コード"
        />
        <InputField
          control={<TextInputControl defaultValue="tokyo-head-office" readOnly />}
          helperText="識別子は作成時に自動採番されます。"
          label="チームID"
        />
        <InputField
          control={<TextInputControl placeholder="例: 東京本社" />}
          helperText="請求書に表示される名称です。"
          label="拠点名"
          required
        />
      </div>
    </PreviewCard>
  );
}

function CustomDesignPreview(): ReactNode {
  return (
    <PreviewCard
      description="標準 input の意味付けは保ちつつ、文脈や状態チップを独自の surface にまとめます。"
      label="自作デザイン入力">
      <div className={styles.previewStack}>
        <CustomDesignFrame
          badge="下書き"
          description="補足情報やトーンを field の外枠に寄せ、設定カードらしい見た目を作ります。"
          eyebrow="自作UI"
          footerNote="入力コントロール自体は通常の label / helper / focus を保ちます。"
          title="公開プロフィール">
          <InputField
            control={<TextInputControl defaultValue="Pattern Lab Japan" tone="brand" />}
            helperText="プロフィールカードに表示される名称です。"
            label="表示名"
          />
        </CustomDesignFrame>
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
      </div>
    </PreviewCard>
  );
}

function renderPreview(entryId: InputPatternEntry['id']): ReactNode {
  switch (entryId) {
    case 'basic-input':
      return <BasicInputPreview />;
    case 'label-helper-input':
      return <LabelHelperPreview />;
    case 'validation-state-input':
      return <ValidationStatePreview />;
    case 'addon-icon-input':
      return <AddonIconPreview />;
    case 'disabled-readonly-input':
      return <DisabledReadonlyPreview />;
    case 'custom-design-input':
      return <CustomDesignPreview />;
    default:
      return assertNever(entryId);
  }
}

export default function InputPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section aria-label="入力デザインパターンギャラリー" className={styles.root}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => (
          <article className={styles.card} id={entry.id} key={entry.id}>
            <div className={styles.cardHeader}>
              <div className={styles.entryHeader}>
                <Heading as="h3" className={styles.cardTitle}>
                  <Link className={styles.titleLink} to={buildInputDetailPath(entry.id)}>
                    {entry.title}
                  </Link>
                </Heading>
                <Link className={styles.detailLink} to={buildInputDetailPath(entry.id)}>
                  詳細へ
                </Link>
              </div>
              <p className={styles.cardSummary}>{entry.description}</p>
              <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                {entry.tags.map((tag) => (
                  <li className={styles.tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.demoPanel}>{renderPreview(entry.id)}</div>

            <InputPatternSnippetPanel
              density={density}
              entryId={entry.id}
              entryTitle={entry.title}
              snippets={entry.snippets}
            />

            <InputPatternMetadataPanel density={density} entry={entry} />
          </article>
        ))}
      </div>
    </section>
  );
}
