export default {
  bricks: [
    { name: 'aem-root' },
    { name: 'aem-header' },
    { name: 'aem-footer' },
  ],

  scripts: [
    { path: '/components/aem-tabs/aem-tabs.js', eager: true },
  ],

  css: [
    { path: '/styles/lazy-fonts.css' },
  ],
};
