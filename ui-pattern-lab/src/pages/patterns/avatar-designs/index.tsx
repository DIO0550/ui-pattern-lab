import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import AvatarPatternPageContent from '@site/src/components/AvatarPatternPageContent';

/** Renders the top-level avatar compare page route. */
export default function AvatarDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="アバターデザインパターン"
      description="avatar を size、shape、fallback、indicator、composition の観点から比較しながら選ぶためのページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            アバターデザインパターン
          </Heading>
          <p className="hero__subtitle">
            人物、組織、Bot などの主体表示を、単体、group、label
            付きの責務に分けて比較し、detail page で preview と CSS / TSX サンプルを確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <AvatarPatternPageContent />
      </main>
    </Layout>
  );
}
