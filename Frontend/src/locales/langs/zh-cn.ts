const local: App.I18n.Schema = {
  system: {
    title: "Soybean 管理系统",
    updateTitle: "系统版本更新通知",
    updateContent: "检测到系统有新版本发布，是否立即刷新页面？",
    updateConfirm: "立即刷新",
    updateCancel: "稍后再说"
  },
  common: {
    action: "操作",
    add: "新增",
    addSuccess: "添加成功",
    backToHome: "返回首页",
    batchDelete: "批量删除",
    cancel: "取消",
    close: "关闭",
    check: "勾选",
    expandColumn: "展开列",
    columnSetting: "列设置",
    config: "配置",
    confirm: "确认",
    delete: "删除",
    deleteSuccess: "删除成功",
    confirmDelete: "确认删除吗？",
    edit: "编辑",
    warning: "警告",
    error: "错误",
    index: "序号",
    keywordSearch: "请输入关键词搜索",
    logout: "退出登录",
    logoutConfirm: "确认退出登录吗？",
    lookForward: "敬请期待",
    modify: "修改",
    modifySuccess: "修改成功",
    noData: "无数据",
    operate: "操作",
    pleaseCheckValue: "请检查输入的值是否合法",
    refresh: "刷新",
    reset: "重置",
    search: "搜索",
    switch: "切换",
    tip: "提示",
    trigger: "触发",
    update: "更新",
    updateSuccess: "更新成功",
    userCenter: "个人中心",
    yesOrNo: {
      yes: "是",
      no: "否"
    }
  },
  request: {
    logout: "请求失败后登出用户",
    logoutMsg: "用户状态失效，请重新登录",
    logoutWithModal: "请求失败后弹出模态框再登出用户",
    logoutWithModalMsg: "用户状态失效，请重新登录",
    refreshToken: "请求的token已过期，刷新token",
    tokenExpired: "token已过期"
  },
  theme: {
    themeSchema: {
      title: "主题模式",
      light: "亮色模式",
      dark: "暗黑模式",
      system: "跟随系统"
    },
    grayscale: "灰色模式",
    colourWeakness: "色弱模式",
    layoutMode: {
      title: "布局模式",
      vertical: "左侧菜单模式",
      "vertical-mix": "左侧菜单混合模式",
      horizontal: "顶部菜单模式",
      "horizontal-mix": "顶部菜单混合模式",
      reverseHorizontalMix: "一级菜单与子级菜单位置反转"
    },
    recommendColor: "应用推荐算法的颜色",
    recommendColorDesc: "推荐颜色的算法参照",
    themeColor: {
      title: "主题颜色",
      primary: "主色",
      info: "信息色",
      success: "成功色",
      warning: "警告色",
      error: "错误色",
      followPrimary: "跟随主色"
    },
    scrollMode: {
      title: "滚动模式",
      wrapper: "外层滚动",
      content: "主体滚动"
    },
    page: {
      animate: "页面切换动画",
      mode: {
        title: "页面切换动画类型",
        "fade-slide": "滑动",
        fade: "淡入淡出",
        "fade-bottom": "底部消退",
        "fade-scale": "缩放消退",
        "zoom-fade": "渐变",
        "zoom-out": "闪现",
        none: "无"
      }
    },
    fixedHeaderAndTab: "固定头部和标签栏",
    header: {
      height: "头部高度",
      breadcrumb: {
        visible: "显示面包屑",
        showIcon: "显示面包屑图标"
      },
      multilingual: {
        visible: "显示多语言按钮"
      }
    },
    tab: {
      visible: "显示标签栏",
      cache: "标签栏信息缓存",
      height: "标签栏高度",
      mode: {
        title: "标签栏风格",
        chrome: "谷歌风格",
        button: "按钮风格"
      }
    },
    sider: {
      inverted: "深色侧边栏",
      width: "侧边栏宽度",
      collapsedWidth: "侧边栏折叠宽度",
      mixWidth: "混合布局侧边栏宽度",
      mixCollapsedWidth: "混合布局侧边栏折叠宽度",
      mixChildMenuWidth: "混合布局子菜单宽度"
    },
    footer: {
      visible: "显示底部",
      fixed: "固定底部",
      height: "底部高度",
      right: "底部局右"
    },
    watermark: {
      visible: "显示全屏水印",
      text: "水印文本"
    },
    themeDrawerTitle: "主题配置",
    pageFunTitle: "页面功能",
    resetCacheStrategy: {
      title: "重置缓存策略",
      close: "关闭页面",
      refresh: "刷新页面"
    },
    configOperation: {
      copyConfig: "复制配置",
      copySuccessMsg: "复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings",
      resetConfig: "重置配置",
      resetSuccessMsg: "重置成功"
    }
  },
  route: {
    login: "登录",
    403: "无权限",
    404: "页面不存在",
    500: "服务器错误",
    "iframe-page": "外链页面",
    home: "首页",
    system: "系统管理",
    system_role: "角色管理",
    system_user: "用户管理",
    system_menu: "菜单管理",
    doc: "文档",
    doc_vue: "vue文档",
    doc_unocss: "Unocss文档",
    doc_naive_ui: "Naive UI文档",
    doc_alova: "Alova文档"
  },
  page: {
    sysMenu: {
      title: "菜单管理",
      button: {
        add: "新增菜单",
        addRoot: "新增根菜单",
        addChild: "添加子菜单",
        edit: "编辑菜单",
        delete: "删除菜单",
        expandAll: "展开全部",
        collapseAll: "折叠全部"
      },
      table: {
        columns: {
          id: "菜单ID",
          name: "菜单名称",
          i18nKey: "国际化键",
          type: "菜单类型",
          icon: "图标",
          path: "路由路径",
          component: "组件路径",
          perms: "权限标识",
          sort: "排序",
          visible: "是否显示",
          status: "状态",
          createTime: "创建时间",
          updateTime: "更新时间",
          action: "操作"
        },
        // 类型映射（对应实体类 type 字段）
        type: {
          1: "目录",
          2: "菜单",
          3: "按钮"
        },
        // 可见性映射（对应实体类 visible 字段）
        visible: {
          1: "显示",
          0: "隐藏"
        },
        // 状态映射（对应实体类 status 字段）
        status: {
          1: "正常",
          0: "停用"
        }
      },
      modal: {
        add: {
          title: "新增菜单",
          parentPlaceholder: "请选择父菜单（留空为根目录）"
        },
        edit: {
          title: "编辑菜单"
        },
        delete: {
          title: "删除菜单",
          message: "确认删除菜单【{name}】及其所有子菜单吗？"
        }
      },
      form: {
        rules: {
          name: {
            required: "请输入菜单名称",
            invalid: "菜单名称长度2-20位"
          },
          i18nKey: {
            invalid: "国际化键格式如：sys.menu.user"
          },
          path: {
            requiredForType: "目录和菜单需填写路由路径",
            invalid: "路由路径需以/开头（如/system/user）"
          },
          component: {
            requiredForMenu: "菜单类型需填写组件路径",
            invalid: "组件路径格式如：@/views/system/user/index.vue"
          },
          perms: {
            requiredForButton: "按钮类型需填写权限标识",
            invalid: "权限标识格式如：system:user:add"
          },
          sort: {
            invalid: "排序值需≥0"
          }
        }
      },
      message: {
        addSuccess: "菜单【{name}】添加成功！",
        editSuccess: "菜单【{name}】修改成功！",
        deleteSuccess: "菜单【{name}】删除成功！",
        cannotDeleteRoot: "根菜单不允许删除！"
      }
    },
    sysUser: {
      title: "用户管理",
      search: {
        username: "用户名",
        usernamePlaceholder: "请输入用户名",
        email: "邮箱",
        emailPlaceholder: "请输入邮箱",
        mobile: "手机号",
        mobilePlaceholder: "请输入手机号",
        status: "状态",
        statusPlaceholder: "请选择状态",
        deptId: "部门",
        deptIdPlaceholder: "请选择部门"
      },
      button: {
        add: "新增用户",
        edit: "编辑用户",
        delete: "删除用户",
        batchDelete: "批量删除",
        resetPwd: "重置密码",
        export: "导出数据"
      },
      table: {
        columns: {
          id: "用户ID",
          username: "用户名",
          realName: "真实姓名",
          avatar: "头像",
          email: "邮箱",
          mobile: "手机号",
          status: "状态",
          deptId: "部门",
          lastLoginIp: "最后登录IP",
          lastLoginTime: "最后登录时间",
          createTime: "创建时间",
          updateTime: "更新时间",
          action: "操作"
        },
        status: {
          enabled: "正常",
          disabled: "停用"
        }
      },
      modal: {
        add: {
          title: "新增用户"
        },
        edit: {
          title: "编辑用户"
        },
        delete: {
          title: "删除用户",
          message: "确认删除用户【{username}】吗？"
        },
        resetPwd: {
          title: "重置密码",
          message: "确认重置用户【{username}】的密码为默认密码？",
          success: "密码已重置为：123456"
        }
      },
      rules: {
        username: {
          required: "请输入用户名",
          invalid: "用户名长度为2-20位（字母/数字/下划线）"
        },
        password: {
          required: "请输入密码",
          invalid: "密码需6-18位（包含字母、数字、特殊符号）"
        },
        email: {
          invalid: "请输入正确的邮箱格式"
        },
        mobile: {
          invalid: "请输入正确的手机号格式"
        }
      },
      message: {
        addSuccess: "用户【{username}】添加成功！",
        editSuccess: "用户【{username}】修改成功！",
        deleteSuccess: "用户【{username}】删除成功！"
      }
    },
    login: {
      common: {
        loginOrRegister: "登录 / 注册",
        userNamePlaceholder: "请输入用户名",
        phonePlaceholder: "请输入手机号",
        codePlaceholder: "请输入验证码",
        passwordPlaceholder: "请输入密码",
        confirmPasswordPlaceholder: "请再次输入密码",
        codeLogin: "验证码登录",
        confirm: "确定",
        back: "返回",
        validateSuccess: "验证成功",
        loginSuccess: "登录成功",
        welcomeBack: "欢迎回来，{userName} ！"
      },
      pwdLogin: {
        rememberMe: "记住我",
        title: "密码登录",
        rememberMe: "记住我",
        forgetPassword: "忘记密码？",
        welcomeBack: "欢迎回来",
        registerPrompt: "还未注册？",
        registerAction: "立即注册，发现大量机会！",
        loginPrompt: "已有帐号？",
        loginAction: "有帐号就登录吧，好久不见了！",
        loginBtn: "登 录",
        registerBtn: "注 册",
        fbLogin: "使用 <span>facebook</span> 帐号登录",
        fbRegister: "使用 <span>facebook</span> 帐号注册"
      },
      codeLogin: {
        title: "验证码登录",
        getCode: "获取验证码",
        reGetCode: "{time}秒后重新获取",
        sendCodeSuccess: "验证码发送成功",
        imageCodePlaceholder: "请输入图片验证码"
      },
      register: {
        title: "注册账号",
        agreement: "我已经仔细阅读并接受",
        protocol: "《用户协议》",
        policy: "《隐私权政策》"
      },
      resetPwd: {
        title: "重置密码"
      },
      bindWeChat: {
        title: "绑定微信"
      }
    },
    home: {
      branchDesc:
        "为了方便大家开发和更新合并，我们对main分支的代码进行了精简，只保留了首页菜单，其余内容已移至example分支进行维护。预览地址显示的内容即为example分支的内容。",
      greeting: "早安，{userName}, 今天又是充满活力的一天!",
      weatherDesc: "今日多云转晴，20℃ - 25℃!",
      projectCount: "项目数",
      todo: "待办",
      message: "消息",
      downloadCount: "下载量",
      registerCount: "注册量",
      schedule: "作息安排",
      study: "学习",
      work: "工作",
      rest: "休息",
      entertainment: "娱乐",
      visitCount: "访问量",
      turnover: "成交额",
      dealCount: "成交量",
      projectNews: {
        title: "项目动态",
        moreNews: "更多动态",
        desc1: "Soybean 在2021年5月28日创建了开源项目 soybean-admin!",
        desc2: "Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。",
        desc3: "Soybean 准备为 soybean-admin 的发布做充分的准备工作!",
        desc4: "Soybean 正在忙于为soybean-admin写项目说明文档！",
        desc5: "Soybean 刚才把工作台页面随便写了一些，凑合能看了！"
      },
      creativity: "创意"
    }
  },
  form: {
    required: "不能为空",
    userName: {
      required: "请输入用户名",
      invalid: "用户名格式不正确"
    },
    phone: {
      required: "请输入手机号",
      invalid: "手机号格式不正确"
    },
    pwd: {
      required: "请输入密码",
      invalid: "密码格式不正确，6-18位字符，包含字母、数字、下划线"
    },
    confirmPwd: {
      required: "请输入确认密码",
      invalid: "两次输入密码不一致"
    },
    code: {
      required: "请输入验证码",
      invalid: "验证码格式不正确"
    },
    email: {
      required: "请输入邮箱",
      invalid: "邮箱格式不正确"
    }
  },
  dropdown: {
    closeCurrent: "关闭",
    closeOther: "关闭其它",
    closeLeft: "关闭左侧",
    closeRight: "关闭右侧",
    closeAll: "关闭所有"
  },
  icon: {
    themeConfig: "主题配置",
    themeSchema: "主题模式",
    lang: "切换语言",
    fullscreen: "全屏",
    fullscreenExit: "退出全屏",
    reload: "刷新页面",
    collapse: "折叠菜单",
    expand: "展开菜单",
    pin: "固定",
    unpin: "取消固定"
  },
  datatable: {
    itemCount: "共 {total} 条"
  }
};

export default local;
