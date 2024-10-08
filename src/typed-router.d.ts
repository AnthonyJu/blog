/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/about': RouteRecordInfo<'/about', '/about', Record<never, never>, Record<never, never>>,
    '/blog/': RouteRecordInfo<'/blog/', '/blog', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/10_first-blog/': RouteRecordInfo<'/blog/2023/06/10_first-blog/', '/blog/2023/06/10_first-blog', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/12_matted-glass/': RouteRecordInfo<'/blog/2023/06/12_matted-glass/', '/blog/2023/06/12_matted-glass', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/14_theme-switch/': RouteRecordInfo<'/blog/2023/06/14_theme-switch/', '/blog/2023/06/14_theme-switch', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/18_play-and-play/': RouteRecordInfo<'/blog/2023/06/18_play-and-play/', '/blog/2023/06/18_play-and-play', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/20_rurouni-kenshin/': RouteRecordInfo<'/blog/2023/06/20_rurouni-kenshin/', '/blog/2023/06/20_rurouni-kenshin', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/22_blog-effect/': RouteRecordInfo<'/blog/2023/06/22_blog-effect/', '/blog/2023/06/22_blog-effect', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/28_custom-arcgis-popup/': RouteRecordInfo<'/blog/2023/06/28_custom-arcgis-popup/', '/blog/2023/06/28_custom-arcgis-popup', Record<never, never>, Record<never, never>>,
    '/blog/2023/06/30_plop-basic-usage/': RouteRecordInfo<'/blog/2023/06/30_plop-basic-usage/', '/blog/2023/06/30_plop-basic-usage', Record<never, never>, Record<never, never>>,
    '/blog/2023/07/07_grid-responsive-layout/': RouteRecordInfo<'/blog/2023/07/07_grid-responsive-layout/', '/blog/2023/07/07_grid-responsive-layout', Record<never, never>, Record<never, never>>,
    '/blog/2023/07/15_deep-clone/': RouteRecordInfo<'/blog/2023/07/15_deep-clone/', '/blog/2023/07/15_deep-clone', Record<never, never>, Record<never, never>>,
    '/blog/2023/07/23_arcgis-draw-arc/': RouteRecordInfo<'/blog/2023/07/23_arcgis-draw-arc/', '/blog/2023/07/23_arcgis-draw-arc', Record<never, never>, Record<never, never>>,
    '/blog/2023/07/31_july-summary/': RouteRecordInfo<'/blog/2023/07/31_july-summary/', '/blog/2023/07/31_july-summary', Record<never, never>, Record<never, never>>,
    '/blog/2023/08/03_unity-mini-map/': RouteRecordInfo<'/blog/2023/08/03_unity-mini-map/', '/blog/2023/08/03_unity-mini-map', Record<never, never>, Record<never, never>>,
    '/blog/2023/08/10_ts-decorator/': RouteRecordInfo<'/blog/2023/08/10_ts-decorator/', '/blog/2023/08/10_ts-decorator', Record<never, never>, Record<never, never>>,
    '/blog/2023/08/20_my-web-extensions/': RouteRecordInfo<'/blog/2023/08/20_my-web-extensions/', '/blog/2023/08/20_my-web-extensions', Record<never, never>, Record<never, never>>,
    '/blog/2023/09/01_console-usage/': RouteRecordInfo<'/blog/2023/09/01_console-usage/', '/blog/2023/09/01_console-usage', Record<never, never>, Record<never, never>>,
    '/blog/2023/09/12_create-vr-urp-starter/': RouteRecordInfo<'/blog/2023/09/12_create-vr-urp-starter/', '/blog/2023/09/12_create-vr-urp-starter', Record<never, never>, Record<never, never>>,
    '/blog/2023/09/24_team-building/': RouteRecordInfo<'/blog/2023/09/24_team-building/', '/blog/2023/09/24_team-building', Record<never, never>, Record<never, never>>,
    '/blog/2023/10/03_ts-in-vue3/': RouteRecordInfo<'/blog/2023/10/03_ts-in-vue3/', '/blog/2023/10/03_ts-in-vue3', Record<never, never>, Record<never, never>>,
    '/blog/2023/10/22_arcgis-feature-reduction/': RouteRecordInfo<'/blog/2023/10/22_arcgis-feature-reduction/', '/blog/2023/10/22_arcgis-feature-reduction', Record<never, never>, Record<never, never>>,
    '/blog/2023/10/31_october-summary/': RouteRecordInfo<'/blog/2023/10/31_october-summary/', '/blog/2023/10/31_october-summary', Record<never, never>, Record<never, never>>,
    '/blog/2023/11/17_forgettable/': RouteRecordInfo<'/blog/2023/11/17_forgettable/', '/blog/2023/11/17_forgettable', Record<never, never>, Record<never, never>>,
    '/blog/2023/11/30_november-summary/': RouteRecordInfo<'/blog/2023/11/30_november-summary/', '/blog/2023/11/30_november-summary', Record<never, never>, Record<never, never>>,
    '/blog/2023/12/02_ios-listing-process/': RouteRecordInfo<'/blog/2023/12/02_ios-listing-process/', '/blog/2023/12/02_ios-listing-process', Record<never, never>, Record<never, never>>,
    '/blog/2023/12/06_unity-in-web/': RouteRecordInfo<'/blog/2023/12/06_unity-in-web/', '/blog/2023/12/06_unity-in-web', Record<never, never>, Record<never, never>>,
    '/blog/2023/12/29_slam-dunk/': RouteRecordInfo<'/blog/2023/12/29_slam-dunk/', '/blog/2023/12/29_slam-dunk', Record<never, never>, Record<never, never>>,
    '/blog/2024/01/17_moyu/': RouteRecordInfo<'/blog/2024/01/17_moyu/', '/blog/2024/01/17_moyu', Record<never, never>, Record<never, never>>,
    '/blog/2024/01/31_january-summary/': RouteRecordInfo<'/blog/2024/01/31_january-summary/', '/blog/2024/01/31_january-summary', Record<never, never>, Record<never, never>>,
    '/blog/2024/02/21_element-dynamic-import/': RouteRecordInfo<'/blog/2024/02/21_element-dynamic-import/', '/blog/2024/02/21_element-dynamic-import', Record<never, never>, Record<never, never>>,
    '/blog/2024/02/29_february-summary/': RouteRecordInfo<'/blog/2024/02/29_february-summary/', '/blog/2024/02/29_february-summary', Record<never, never>, Record<never, never>>,
    '/blog/2024/03/19_github-git-proxy/': RouteRecordInfo<'/blog/2024/03/19_github-git-proxy/', '/blog/2024/03/19_github-git-proxy', Record<never, never>, Record<never, never>>,
    '/blog/2024/03/31_march-summary/': RouteRecordInfo<'/blog/2024/03/31_march-summary/', '/blog/2024/03/31_march-summary', Record<never, never>, Record<never, never>>,
    '/blog/2024/04/08_jsdoc/': RouteRecordInfo<'/blog/2024/04/08_jsdoc/', '/blog/2024/04/08_jsdoc', Record<never, never>, Record<never, never>>,
    '/note/': RouteRecordInfo<'/note/', '/note', Record<never, never>, Record<never, never>>,
    '/note/ArcGIS-Map/advanced-usage': RouteRecordInfo<'/note/ArcGIS-Map/advanced-usage', '/note/ArcGIS-Map/advanced-usage', Record<never, never>, Record<never, never>>,
    '/note/ArcGIS-Map/basic-use': RouteRecordInfo<'/note/ArcGIS-Map/basic-use', '/note/ArcGIS-Map/basic-use', Record<never, never>, Record<never, never>>,
    '/note/Git/commit-submit-specification': RouteRecordInfo<'/note/Git/commit-submit-specification', '/note/Git/commit-submit-specification', Record<never, never>, Record<never, never>>,
    '/note/HTML/html5-new-features': RouteRecordInfo<'/note/HTML/html5-new-features', '/note/HTML/html5-new-features', Record<never, never>, Record<never, never>>,
    '/note/JavaScript/es2023': RouteRecordInfo<'/note/JavaScript/es2023', '/note/JavaScript/es2023', Record<never, never>, Record<never, never>>,
    '/note/JavaScript/es6': RouteRecordInfo<'/note/JavaScript/es6', '/note/JavaScript/es6', Record<never, never>, Record<never, never>>,
    '/note/JavaScript/es7-es13': RouteRecordInfo<'/note/JavaScript/es7-es13', '/note/JavaScript/es7-es13', Record<never, never>, Record<never, never>>,
    '/note/JavaScript/js-basic': RouteRecordInfo<'/note/JavaScript/js-basic', '/note/JavaScript/js-basic', Record<never, never>, Record<never, never>>,
    '/note/Markdown/basic-grammar': RouteRecordInfo<'/note/Markdown/basic-grammar', '/note/Markdown/basic-grammar', Record<never, never>, Record<never, never>>,
    '/note/Others/centos': RouteRecordInfo<'/note/Others/centos', '/note/Others/centos', Record<never, never>, Record<never, never>>,
    '/note/Others/npm-options': RouteRecordInfo<'/note/Others/npm-options', '/note/Others/npm-options', Record<never, never>, Record<never, never>>,
    '/note/ThreeJS/new-scene': RouteRecordInfo<'/note/ThreeJS/new-scene', '/note/ThreeJS/new-scene', Record<never, never>, Record<never, never>>,
    '/note/TypeScript/ts-basic': RouteRecordInfo<'/note/TypeScript/ts-basic', '/note/TypeScript/ts-basic', Record<never, never>, Record<never, never>>,
    '/note/Unity/vr-informal-essay': RouteRecordInfo<'/note/Unity/vr-informal-essay', '/note/Unity/vr-informal-essay', Record<never, never>, Record<never, never>>,
    '/roast/': RouteRecordInfo<'/roast/', '/roast', Record<never, never>, Record<never, never>>,
    '/search': RouteRecordInfo<'/search', '/search', Record<never, never>, Record<never, never>>,
  }
}
