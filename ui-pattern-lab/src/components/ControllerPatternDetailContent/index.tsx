import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import ControllerPatternGallery from '@site/src/components/ControllerPatternGallery';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {controllerPatternEntries} from '@site/src/data/controllerPatternEntries';
import type {ControllerPatternEntryId} from '@site/src/data/controllerPatternTypes';

import styles from './styles.module.css';

type ControllerPatternDetailContentProps = {
  entryId: ControllerPatternEntryId;
};

type RelatedResource = {
  title: string;
  description: string;
  to: string;
};

const relatedResources: readonly RelatedResource[] = [
  {
    title: 'ボタン',
    description:
      '単発 action、danger action、icon-only action など、button 側へ残す責務を確認したいときの参照先です。',
    to: '/button',
  },
  {
    title: 'セレクタ',
    description:
      'フォーム値入力としての radio / select / combobox と、即時反映する表示制御の境界は selector 側で補完します。',
    to: '/selector',
  },
  {
    title: 'テーブル',
    description:
      'pagination や sort / density が効く先の table layout や column 構成は table カテゴリが担当します。',
    to: '/table',
  },
  {
    title: 'プログレス',
    description:
      'progress の stepper と quantity stepper の違い、状態表示と値操作の切り分けを確認できます。',
    to: '/progress',
  },
] as const;

function buildContextNote(entryId: ControllerPatternEntryId): ReactNode | null {
  if (entryId === 'segmented-view-switcher') {
    return (
      <>
        少数の mode を常時押し分ける local UI state だけを controller に寄せ、フォーム送信前提の単一選択なら{' '}
        <Link to="/selector">セレクタ</Link> 側で扱います。単発 action の toggle 群へ寄せすぎる場合は{' '}
        <Link to="/button">ボタン</Link>、panel semantics や arrow key を前提にする場合は{' '}
        <Link to="/controller/tabs-inline-panel-switcher">tabs inline panel switcher</Link>{' '}
        を参照してください。URL 同期や永続化はこの pattern のスコープ外です。
      </>
    );
  }

  if (entryId === 'tabs-inline-panel-switcher') {
    return (
      <>
        同一画面内の panel switch に限定し、別 URL へ遷移させる IA は navigation へ分けます。少数の
        mode toggle だけで済むなら{' '}
        <Link to="/controller/segmented-view-switcher">segmented view switcher</Link>{' '}
        の方が軽量です。
      </>
    );
  }

  if (entryId === 'sort-filter-toolbar') {
    return (
      <>
        filter input 自体は <Link to="/selector">セレクタ</Link> や{' '}
        <Link to="/checkbox">チェックボックス</Link> の責務に残し、この pattern では一覧全体へどう適用するかをまとめます。
      </>
    );
  }

  if (entryId === 'pagination-and-page-size-controller') {
    return (
      <>
        table layout や list item の見せ方ではなく、結果セットの閲覧位置を制御する面に集中します。対象が table
        であっても、表そのものの責務は <Link to="/table">テーブル</Link> に残します。
      </>
    );
  }

  if (entryId === 'range-slider-filter') {
    return (
      <>
        厳密な数値入力やフォーム送信が主なら number input 側へ寄せます。controller では single slider
        を優先し、drag の直後に結果が変わる連続調整として扱います。dual-thumb は将来拡張として切り出します。
      </>
    );
  }

  if (entryId === 'quantity-stepper-control') {
    return (
      <>
        progress の stepper は multi-step 状態表示、こちらは numeric adjustment です。単なる plus / minus
        button 群ではなく、min / max と disabled state を含む control として設計します。
      </>
    );
  }

  return null;
}

export default function ControllerPatternDetailContent({
  entryId,
}: ControllerPatternDetailContentProps): ReactNode {
  const entry = controllerPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown controller pattern entry: ${entryId}`);
  }

  const contextNote = buildContextNote(entry.id);

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/controller">表示制御</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/controller-designs">表示制御デザインパターン</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview demo に加えて、対応する CSS / TSX
        サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/patterns/controller-designs">表示制御デザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to="/controller">表示制御</Link> を参照してください。
      </p>
      {contextNote ? <p className={styles.contextNote}>{contextNote}</p> : null}
      <ControllerPatternGallery density="detail" entries={[entry]} />
      <section className={styles.relatedSection}>
        <Heading as="h2">関連ページ</Heading>
        <div className={styles.relatedGrid}>
          {relatedResources.map((resource) => (
            <PatternCatalogCard
              description={resource.description}
              eyebrow="関連ページ"
              key={resource.to}
              title={resource.title}
              to={resource.to}
              tone="muted"
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
