import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SelectorPatternPageContent from '@site/src/components/SelectorPatternPageContent';

export default function SelectorDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="セレクタデザインパターン"
      description="selector 全体の判断ハブとして、radio / native select / custom select / combobox / reference family を比較軸から選び分けるページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            セレクタデザインパターン
          </Heading>
          <p className="hero__subtitle">
            フォーム入力として 1 つの値を選ぶ UI を、候補の見え方、検索必要性、validation、
            モバイル適性の比較から整理し、そこから family ごとの compare page や
            baseline detail page へ進みます。
          </p>
        </div>
      </header>

      <main>
        <SelectorPatternPageContent />
      </main>
    </Layout>
  );
}
