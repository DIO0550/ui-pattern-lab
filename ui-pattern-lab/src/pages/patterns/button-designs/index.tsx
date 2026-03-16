import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ButtonPatternPageContent from '@site/src/components/ButtonPatternPageContent';

export default function ButtonDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="ボタンデザインパターン"
      description="強調度、状態、危険操作、icon-only、トグル、余白設計を含むボタンUIパターンを、preview と CSS / TSX サンプルつきで比較します。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            ボタンデザインパターン
          </Heading>
          <p className="hero__subtitle">
            強調度、状態、危険操作、icon-only、トグル、余白設計を横断し、
            一覧では要約つきの CSS / TSX サンプルを折りたたみ、
            詳細ページでは全文を確認できます。
          </p>
        </div>
      </header>

      <main>
        <ButtonPatternPageContent />
      </main>
    </Layout>
  );
}
