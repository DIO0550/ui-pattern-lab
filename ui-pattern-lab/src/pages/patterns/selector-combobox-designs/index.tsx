import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SelectorPatternCollectionPageContent from '@site/src/components/SelectorPatternCollectionPageContent';

export default function SelectorComboboxDesignsPage(): ReactNode {
  return (
    <Layout
      title="Combobox デザインパターン"
      description="single-select combobox の baseline / grouped results / empty and loading states を、比較要点と compact preview で見比べるページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            Combobox デザインパターン
          </Heading>
          <p className="hero__subtitle">
            single-select の combobox 構造に限定して、baseline、grouped results、empty /
            loading states を比較要点と compact preview で見比べます。IME / async /
            popover はこのラボの実装範囲外です。
          </p>
        </div>
      </header>

      <main>
        <SelectorPatternCollectionPageContent
          backLinkLabel="セレクタデザインパターンへ戻る"
          backLinkPath="/patterns/selector-designs"
          categoryIds={['combobox']}
          description="検索、候補絞り込み、group label、status text を使って 1 つの既存候補へ絞り込む family です。"
          lead="このラボでは single-select / local state / non-async の構造デモだけを扱います。production-ready な IME、async 検索、popover 位置計算は別設計として切り分けます。"
          title="Combobox の比較"
        />
      </main>
    </Layout>
  );
}
