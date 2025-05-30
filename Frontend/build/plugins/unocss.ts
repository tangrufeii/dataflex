import process from "node:process";
import path from "node:path";
import UnoCSS from "unocss/vite";
import { presetIcons } from "unocss";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

export function setupUnocss(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path.join(process.cwd(), "src/assets/svg-icon");
  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");
  return UnoCSS({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: "inline-block"
        },
        collections: {
          [collectionName]: FileSystemIconLoader(
            localIconPath,
            svg =>
              svg
                .replace(/width="[^"]*"/i, "") // 移除 width
                .replace(/height="[^"]*"/i, "") // 移除 height
                .replace(/^<svg\s/, '<svg width="1em" height="1em" ') // 追加 em 单位
          )
        }
      })
    ]
  });
}
