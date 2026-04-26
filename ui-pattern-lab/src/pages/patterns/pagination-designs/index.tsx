import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PaginationPatternPageContent from '@site/src/components/PaginationPatternPageContent';

export default function PaginationDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="ページネーションデザインパターン"
      description="page numbers、load more、infinite scroll を比較し、閲覧状態の制御としての適材適所を判断するページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            ページネーションデザインパターン
          </Heading>
          <p className="hero__subtitle">
            page numbers / load more / infinite scroll を比較し、位置把握、append の主導権、footer 到達性、
            page size control の置きどころを先に整理できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <PaginationPatternPageContent />
      </main>
    </Layout>
  );
}
