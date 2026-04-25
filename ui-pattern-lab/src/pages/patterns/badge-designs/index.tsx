import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BadgePatternPageContent from '@site/src/components/BadgePatternPageContent';

/** Renders the top-level badge compare page route. */
export default function BadgeDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="バッジデザインパターン"
      description="補足ラベルとしての badge を、variant、色、件数表示の観点から比較しながら選ぶためのページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            バッジデザインパターン
          </Heading>
          <p className="hero__subtitle">
            Filled / Outlined / Soft / Surface の違いと、色や件数表示の収まりを先に比較し、detail
            page で preview と CSS / TSX サンプルを確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <BadgePatternPageContent />
      </main>
    </Layout>
  );
}
