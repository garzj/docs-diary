import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';

const projectTitle = "John's Random Docs";

const config: Config = {
  title: projectTitle,
  url: 'https://docs.garz.dev/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'garzj',
  projectName: 'docs-diary',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/garzj/docs-diary/edit/master/',
          showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.scss',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: projectTitle,
      logo: {
        alt: "Doc's Diary",
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://garz.dev',
          target: '_self',
          className: 'header-website-link',
          title: 'Main site',
          position: 'right',
        },
        {
          href: 'https://github.com/garzj/docs-diary',
          className: 'header-github-link',
          title: 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ${projectTitle}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
    algolia: {
      appId: 'ZOV7YG0IO7',
      apiKey: 'cbcf8f5cf3277f7b618328dfddcd1a5c',
      indexName: 'garz',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
