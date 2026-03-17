import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import EllipsisDisplayPatternPageContent from '@site/src/components/EllipsisDisplayPatternPageContent';

export default function EllipsisDisplayDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="省略表示パターン"
      description="1行省略、複数行 clamp、全文補足、アクセシブルな開閉を含む省略表示パターンを、preview と CSS / TSX 例つきで比較します。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            省略表示パターン
          </Heading>
          <p className="hero__subtitle">
            1行省略、複数行 clamp、全文補足、アクセシブルな開閉を横断し、
            一覧では要約つきの CSS / TSX 例を折りたたみ、詳細ページでは全文を
            確認できます。
          </p>
        </div>
      </header>

      <main>
        <EllipsisDisplayPatternPageContent />
      </main>
    </Layout>
  );
}
