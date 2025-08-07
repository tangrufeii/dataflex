import FramePageComponent from "../../views/common/iframe-page/[url].vue";
export const DOCUMENT_ROUTES = [
  {
    title: "文档",
    icon: "document-folder",
    path: "/document",
    perms: null,
    type: 1,
    sort: 0,
    visible: 1,
    status: 1,
    i18nKey: "doc",
    parentId: 0,
    children: [
      {
        name: "alova文档",
        i18nKey: "doc_alova",
        icon: "local-alova",
        path: "/document/alova",
        component: FramePageComponent,
        isFrame: 1,
        url: "https://unocss.nodejs.cn/integrations/vite",
        props: {
          url: "https://alova.js.org/zh-CN/"
        },
        visible: 1,
        status: 1,
        sort: 0,
        type: 2
      },
      {
        name: "unocss文档",
        i18nKey: "doc_unocss",
        icon: "local-vue",
        path: "/document/unocss",
        component: FramePageComponent,
        isFrame: 1,
        status: 1,
        sort: 0,
        visible: 1,
        props: {
          url: "https://unocss.nodejs.cn/integrations/vite"
        },
        url: "https://unocss.nodejs.cn/integrations/vite",
        type: 2
      }
    ]
  }
] as const;
