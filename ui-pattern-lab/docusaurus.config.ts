import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'UIパターンラボ',
  tagline: '実践的なUIパターンとレイアウト例を集めたリファレンス',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://DIO0550.github.io',
  baseUrl: '/ui-pattern-lab/',

  organizationName: 'DIO0550',
  projectName: 'ui-pattern-lab',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/DIO0550/ui-pattern-lab/tree/main/ui-pattern-lab/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/DIO0550/ui-pattern-lab/tree/main/ui-pattern-lab/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'UIパターンラボ',
      logo: {
        alt: 'UIパターンラボのロゴ',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ドキュメント',
          items: [
            {
              label: '目次',
              to: '/',
            },
            {
              label: 'テーブル',
              to: '/table',
            },
            {
              label: '省略表示',
              to: '/ellipsis-display',
            },
            {
              label: 'ボタン',
              to: '/button',
            },
          ],
        },
        {
          title: 'その他',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DIO0550/ui-pattern-lab',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UI Pattern Lab. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
