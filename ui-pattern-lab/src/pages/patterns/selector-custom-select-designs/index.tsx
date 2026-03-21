import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SelectorPatternCollectionPageContent from '@site/src/components/SelectorPatternCollectionPageContent';

export default function SelectorCustomSelectDesignsPage(): ReactNode {
  return (
    <Layout
      title="Custom select デザインパターン"
      description="native select では足りないときの custom select variation を、preview と CSS / TSX サンプルつきで比較します。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            Custom select デザインパターン
          </Heading>
          <p className="hero__subtitle">
            native select を使えるならそちらを優先し、visual richness や option row の自前表現が
            必要なときだけ custom select family を比較します。
          </p>
        </div>
      </header>

      <main>
        <SelectorPatternCollectionPageContent
          backLinkLabel="セレクタデザインパターンへ戻る"
          backLinkPath="/patterns/selector-designs"
          categoryIds={['custom-select']}
          description="button trigger、grouped listbox、option row の見せ方を変えながら、single-select の責務を保つ family です。"
          lead="native select では足りない visual richness や supporting text が必要な場合にだけ custom select を選びます。候補比較が主題なら radio card、検索が主題なら combobox を検討してください。"
          title="Custom select の比較"
        />
      </main>
    </Layout>
  );
}
