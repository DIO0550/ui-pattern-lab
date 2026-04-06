import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import {
  INPUT_CATEGORY_PATH,
  INPUT_PATTERN_PAGE_PATH,
} from '@site/src/data/inputPatternPaths';
import {inputPatternEntries} from '@site/src/data/inputPatternEntries';
import {inputPatternSnippets} from '@site/src/data/inputPatternSnippets';
import type {InputPatternEntryId} from '@site/src/data/inputPatternTypes';
import {assertNever} from '@site/src/utils/assertNever';
import type {ButtonReferenceNote} from '@site/src/components/ButtonReferenceLayout';

import {
  customDesignStateDefinitions,
  type CustomDesignVariantId,
  getCustomDesignPreviewDefinition,
  renderCustomDesignStatePreviewCard,
} from '@site/src/components/InputPatternGallery/customDesign';
import styles from './styles.module.css';

type Props = {
  entryId: InputPatternEntryId;
};

function resolveVariantId(entryId: InputPatternEntryId): CustomDesignVariantId {
  switch (entryId) {
    case 'outline-text-field':
      return 'outline';
    case 'filled-text-field':
      return 'filled';
    case 'underline-text-field':
      return 'underline';
    case 'borderless-text-field':
      return 'borderless';
    case 'pill-text-field':
      return 'pill';
    default:
      return assertNever(entryId);
  }
}

function buildNotes(entryId: InputPatternEntryId): readonly ButtonReferenceNote[] {
  switch (entryId) {
    case 'outline-text-field':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            'focus や error を素早く認識させたいのに輪郭差が弱いと、フォーム全体の中で現在地を見失いやすくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            '通常時は細い border、focus では ring、error では danger ring を足して、状態差を輪郭だけで読めるようにします。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '最も汎用的なフォーム、管理画面、設定 UI のように、ライブラリ風の標準解を自前で持ちたい場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            'label → input shell → helper を素直に縦積みし、ring が出てもレイアウトを押し出しにくい余白にします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'hover / focus / error / disabled を同じ shell の上で切り替え、状態ごとに別 component を増やさずに済むようにします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            'focus-visible 相当の見え方を ring と border で残しつつ、error は aria-invalid と文言で補って色だけに依存しません。',
        },
      ];
    case 'filled-text-field':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '塗り面を主役にすると focus が埋もれやすく、hover と active の差も曖昧になりがちです。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'filled surface を基準にしつつ、focus 時だけ background を締めて ring を足し、操作中の状態を塗りと輪郭の両方で示します。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            'カード UI、淡色テーマ、フォーム全体の圧を少し下げたいダッシュボードなどに向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            'surface の塊として見せるため、上下の padding を均一に取り、helper とのトーン差で読み順を保ちます。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'hover は背景差、focus は ring、error は赤みのある塗りで差分を重ね、filled でも現在地を見失わせません。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            '背景差だけで状態を済ませず、focus ring と error message を併記して、色覚差に依存しすぎない構成にします。',
        },
      ];
    case 'underline-text-field':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '下線主体の軽い見た目は密度を上げやすい反面、focus と error が弱いと入力位置を把握しづらくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            '通常時は細い下線、focus / error では下線色と厚みを変え、最小限の surface でも状態差を保てるようにします。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '密度高めの一覧フォーム、検索バー群、設定画面のサブ入力欄など、囲いを弱めたい場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '上下余白を薄くしつつ、下線が helper と干渉しないように input と helper の間に小さな呼吸を残します。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'hover / focus / error の差分を下線の色と影に寄せ、周囲の囲いを増やさずに状態を読めるようにします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            '細い下線だけで状態を伝えず、helper / error 文言と aria-invalid を併記して、読み上げでも意味が欠けないようにします。',
        },
      ];
    case 'borderless-text-field':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '枠線を弱めたデザインは軽く見える反面、focus と error が弱いと入力位置や異常状態を見落としやすくなります。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            '通常時はノイズを抑え、hover / focus / error でだけ下辺や ring を持ち上げて、必要なときだけ状態差を強く出します。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            'ツールバー、サブフォーム、一覧上の軽い編集 UI など、周囲に自然に馴染ませたい場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '左右 padding を薄めにして一覧密度を保ちつつ、helper と下辺の距離は近づけすぎないようにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            '常時の枠を減らすぶん、focus / error だけは下辺と ring を強め、状態差を埋もれさせないようにします。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            '静かな見た目でも focus-visible 相当の ring と error 文言を残し、色や下線だけで意味を済ませないようにします。',
        },
      ];
    case 'pill-text-field':
      return [
        {
          id: 'problem',
          label: '課題',
          value:
            '丸い search bar 風のデザインは軽く見せやすい反面、フォーム部品としての境界や focus を弱めがちです。',
        },
        {
          id: 'solution',
          label: '解決方法',
          value:
            'pill shell の丸みは保ちつつ、focus では ring、error では輪郭色を強めて、search field でも状態差を明確にします。',
        },
        {
          id: 'usecase',
          label: '使いどころ',
          value:
            '検索バー、quick filter、タグ検索のように、軽い印象と操作の拾いやすさを両立したい場面に向いています。',
        },
        {
          id: 'spacing',
          label: 'レイアウト',
          value:
            '丸みを保つため左右 padding を広めに取り、helper は壊さず下へ逃がして shell 内の密度を上げすぎないようにします。',
        },
        {
          id: 'state',
          label: '状態設計',
          value:
            'pill shell の軽さを保ちながら、hover / focus / error で border と ring を段階的に強め、検索 UI でも現在地を見失わせません。',
        },
        {
          id: 'a11y',
          label: 'アクセシビリティ',
          value:
            '丸い見た目でも native input のまま扱い、focus ring と helper / error 文言で状態差を補強します。',
        },
      ];
    default:
      return assertNever(entryId);
  }
}

function buildVariants(entryId: InputPatternEntryId): readonly PatternReferenceVariant[] {
  const variantId = resolveVariantId(entryId);

  return customDesignStateDefinitions.map((state) => ({
    id: `${entryId}-${state.id}`,
    name: state.label,
    description: state.description,
    preview: renderCustomDesignStatePreviewCard(variantId, state.id),
    previewClassName: styles.widePreview,
    tabs: buildReferenceCodeTabs(inputPatternSnippets[entryId][state.id]?.items),
  }));
}

export default function InputPatternDetailContent({entryId}: Props): ReactNode {
  const entry = inputPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown input pattern entry: ${entryId}`);
  }

  const definition = getCustomDesignPreviewDefinition(resolveVariantId(entry.id));

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={INPUT_CATEGORY_PATH}>テキストフィールド</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={INPUT_PATTERN_PAGE_PATH}>自作テキストフィールドデザイン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の default / error / disabled preview に加えて、対応する TSX / CSS サンプルと設計メモをまとめて確認できます。一覧へ戻る場合は{' '}
        <Link to={INPUT_PATTERN_PAGE_PATH}>自作テキストフィールドデザイン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={INPUT_CATEGORY_PATH}>テキストフィールド</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        よくある UI ライブラリの input と同じく、hover / focus / error / disabled まで含めた見え方を自作 CSS で整理しています。
      </p>
      <PatternReferenceContent
        notes={buildNotes(entry.id)}
        variantNote={`${definition.detailDescription} 各 variant は 1 preview + 1 code panel として分離し、TSX と CSS を同じ panel のタブで見比べられるようにしています。`}
        variantSectionLabel="状態"
        variants={buildVariants(entry.id)}
      />
    </div>
  );
}
