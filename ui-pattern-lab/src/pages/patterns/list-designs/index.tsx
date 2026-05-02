import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ListPatternPageContent from '@site/src/components/ListPatternPageContent';

export default function ListDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="リストデザインパターン"
      description="plain / divided / card list を、style、item content、behavior の判断軸で比較するページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            リストデザインパターン
          </Heading>
          <p className="hero__subtitle">
            同種の項目を縦に並べる list を、style、item content、behavior の判断軸で比較します。
            detail では plain / divided / card list の preview と CSS / TSX サンプルを確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <ListPatternPageContent />
      </main>
    </Layout>
  );
}
