import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import AlertPatternPageContent from '@site/src/components/AlertPatternPageContent';

/** Renders the top-level alert compare page route. */
export default function AlertDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="アラートデザインパターン"
      description="ページ内に残る Alert を、severity、visual style、behavior の観点から比較しながら選ぶためのページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            アラートデザインパターン
          </Heading>
          <p className="hero__subtitle">
            info / success / warning / error / neutral の severity と、base / outlined / elevated /
            compact / action / dismissible の違いを比較し、detail page で preview と CSS / TSX
            サンプルを確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <AlertPatternPageContent />
      </main>
    </Layout>
  );
}
