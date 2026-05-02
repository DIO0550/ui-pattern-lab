import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import TabsPatternPageContent from '@site/src/components/TabsPatternPageContent';

export default function TabsDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="タブデザインパターン"
      description="underline、pills、boxed、vertical tabs を比較し、同一ページ内 panel 切り替えとしての適材適所を判断するページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            タブデザインパターン
          </Heading>
          <p className="hero__subtitle">
            下線型 / ピル型 / ボックス型 / 縦型を比較し、見た目の強さ、レイアウト適性、情報密度、
            `tablist` / `tabpanel` の semantics を先に整理できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <TabsPatternPageContent />
      </main>
    </Layout>
  );
}
