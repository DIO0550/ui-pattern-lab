import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProgressPatternPageContent from '@site/src/components/ProgressPatternPageContent';

export default function ProgressDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="プログレスデザインパターン"
      description="linear / circular determinate、indeterminate、spinner、skeleton、stepper を、比較要点と preview を先に見ながら選び分けられるページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            プログレスデザインパターン
          </Heading>
          <p className="hero__subtitle">
            known total / unknown total、linear / radial、layout 保持、local / section /
            multi-step の違いを先に比較し、一覧では判断に必要な preview と要点だけを並べ、詳細ページで
            CSS / TSX サンプル全文を確認できます。
          </p>
        </div>
      </header>

      <main>
        <ProgressPatternPageContent />
      </main>
    </Layout>
  );
}
