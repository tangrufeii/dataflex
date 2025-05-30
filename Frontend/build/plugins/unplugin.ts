import process from "node:process";
import path from "node:path";
import type { PluginOption } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

  const localIconPath = path.join(process.cwd(), "src/assets/svg-icon");

  /** 本地图标集合的名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");

  const plugins: PluginOption[] = [
    /**
     * 本地图标纯css式使用
     * 使用实例:
     * <div class="icon-local-vue"></div>
     */
    Icons({
      compiler: "vue3",
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      // 新增配置：允许导出整个集合
      autoInstall: true,
      iconCustomizer(collection, icon, props) {
        props["data-icon"] = `${collection}:${icon}`;
      },
      defaultClass: "inline-block"
    }),
    /**
     * 本地图标组件式使用
     * 使用方式:
     * <local-icon-vue />
     */
    Components({
      dts: "src/typings/components.d.ts",
      types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ]
    }),
    /**
     * 本地图标雪碧图插件
     * 使用方式
     *     <svg v-if="isLocalIcon" class="icon" aria-hidden="true">
     *       <!-- symbolId格式需与配置一致 -->
     *           格式由下方的symbolId:${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]制定
     *       <use xlink:href="#local-icon-vue" />
     *       local-icon对应VITE_ICON_LOCAL_PREFIX,vue为svg图片名称对应src/assets/svg-icon/vue.svg
     *     </svg>
     */
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/svg-icon")],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__"
    })
  ];

  return plugins;
}
