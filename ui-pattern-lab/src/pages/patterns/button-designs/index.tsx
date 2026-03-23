import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ButtonPatternPageContent from '@site/src/components/ButtonPatternPageContent';

export default function ButtonDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="ボタンデザインパターン"
      description="強調度、状態、危険操作、icon-only、トグル、余白設計を、比較要点とプレビューを先に見ながら選び分けられるページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            ボタンデザインパターン
          </Heading>
          <p className="hero__subtitle">
            強調度、状態、危険操作、icon-only、トグル、余白設計を先に比較し、
            一覧では判断に必要な preview と要点だけを並べ、詳細ページで CSS / TSX
            サンプル全文を確認できます。
          </p>
        </div>
      </header>

      <main>
        <ButtonPatternPageContent />
      </main>
    </Layout>
  );
}
