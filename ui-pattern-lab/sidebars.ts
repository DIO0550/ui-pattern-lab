import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  patternsSidebar: [
    'index',
    {
      type: 'category',
      label: 'テーブル',
      link: {
        type: 'doc',
        id: 'table',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'table/responsive-stack',
        'table/horizontal-scroll',
        'table/sticky-header',
        'table/cell-truncation',
      ],
    },
    {
      type: 'category',
      label: 'リスト',
      link: {
        type: 'doc',
        id: 'list',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'list/plain-list',
        'list/divided-list',
        'list/card-list',
      ],
    },
    {
      type: 'category',
      label: '表示制限',
      link: {
        type: 'doc',
        id: 'ellipsis-display',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'ellipsis-display/single-line-ellipsis',
        'ellipsis-display/multi-line-clamp',
        'ellipsis-display/full-text-supplement',
        'ellipsis-display/accessible-disclosure',
      ],
    },
    {
      type: 'category',
      label: 'ボタン',
      link: {
        type: 'doc',
        id: 'button',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'button/hierarchy-and-emphasis',
        'button/interactive-states',
        'button/destructive-actions',
        'button/icon-and-compound-actions',
        'button/button-group',
        'button/button-toolbar',
        'button/toggle-and-selection',
        'button/spacing-and-sizing',
      ],
    },
    {
      type: 'category',
      label: 'バッジ',
      link: {
        type: 'doc',
        id: 'badge',
      },
      collapsible: true,
      collapsed: false,
      items: ['badge/text-and-number-badge'],
    },
    {
      type: 'category',
      label: 'チェックボックス',
      link: {
        type: 'doc',
        id: 'checkbox',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'checkbox/multiple-independent-selection',
        'checkbox/selectable-cards',
        'checkbox/single-checkbox-and-indeterminate',
        'checkbox/states-and-accessibility',
        'checkbox/mobile-and-touch-targets',
      ],
    },
    {
      type: 'category',
      label: 'セレクタ',
      link: {
        type: 'doc',
        id: 'selector',
      },
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'ラジオボタン',
          collapsible: true,
          collapsed: true,
          items: [
            'selector/radio-group-single-selection',
            'selector/selectable-radio-cards',
          ],
        },
        {
          type: 'category',
          label: 'ネイティブセレクト',
          collapsible: true,
          collapsed: true,
          items: ['selector/native-select-compact-options'],
        },
        {
          type: 'category',
          label: 'カスタムセレクト',
          collapsible: true,
          collapsed: true,
          items: [
            'selector/custom-select-outline-listbox',
            'selector/custom-select-soft-options',
            'selector/custom-select-card-options',
          ],
        },
        {
          type: 'category',
          label: 'コンボボックス',
          collapsible: true,
          collapsed: true,
          items: [
            'selector/combobox-search-and-filter',
            'selector/combobox-grouped-results',
            'selector/combobox-empty-and-loading-states',
          ],
        },
        {
          type: 'category',
          label: '状態・バリデーション',
          collapsible: true,
          collapsed: true,
          items: ['selector/states-and-validation'],
        },
      ],
    },
    {
      type: 'category',
      label: 'プログレス',
      link: {
        type: 'doc',
        id: 'progress',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'progress/progress-bar-determinate',
        'progress/circular-progress-determinate',
        'progress/progress-bar-indeterminate',
        'progress/loading-spinner',
        'progress/skeleton-placeholder',
        'progress/stepper-status-tracker',
      ],
    },
    {
      type: 'category',
      label: '表示制御',
      link: {
        type: 'doc',
        id: 'controller',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'controller/segmented-view-switcher',
        'controller/tabs-inline-panel-switcher',
        'controller/sort-filter-toolbar',
        'controller/pagination-and-page-size-controller',
        'controller/range-slider-filter',
        'controller/quantity-stepper-control',
      ],
    },
    {
      type: 'category',
      label: 'ページネーション',
      link: {
        type: 'doc',
        id: 'pagination',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'pagination/page-numbers',
        'pagination/load-more',
        'pagination/infinite-scroll',
      ],
    },
    {
      type: 'category',
      label: 'タブ',
      link: {
        type: 'doc',
        id: 'tabs',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'tabs/underline-tabs',
        'tabs/pill-tabs',
        'tabs/boxed-tabs',
        'tabs/vertical-tabs',
      ],
    },
    {
      type: 'category',
      label: 'テキストフィールド',
      link: {
        type: 'doc',
        id: 'input',
      },
      collapsible: true,
      collapsed: false,
      items: [
        'input/outline-text-field',
        'input/filled-text-field',
        'input/underline-text-field',
        'input/borderless-text-field',
        'input/pill-text-field',
      ],
    },
  ],
};

export default sidebars;
