const local: App.I18n.Schema = {
  system: {
    title: "SoybeanAdmin",
    updateTitle: "System Version Update Notification",
    updateContent:
      "A new version of the system has been detected. Do you want to refresh the page immediately?",
    updateConfirm: "Refresh immediately",
    updateCancel: "Later"
  },
  common: {
    action: "Action",
    add: "Add",
    addSuccess: "Add Success",
    backToHome: "Back to home",
    batchDelete: "Batch Delete",
    cancel: "Cancel",
    close: "Close",
    check: "Check",
    expandColumn: "Expand Column",
    columnSetting: "Column Setting",
    config: "Config",
    confirm: "Confirm",
    delete: "Delete",
    deleteSuccess: "Delete Success",
    confirmDelete: "Are you sure you want to delete?",
    edit: "Edit",
    warning: "Warning",
    error: "Error",
    index: "Index",
    keywordSearch: "Please enter keyword",
    logout: "Logout",
    logoutConfirm: "Are you sure you want to log out?",
    lookForward: "Coming soon",
    modify: "Modify",
    modifySuccess: "Modify Success",
    noData: "No Data",
    operate: "Operate",
    pleaseCheckValue: "Please check whether the value is valid",
    refresh: "Refresh",
    reset: "Reset",
    search: "Search",
    switch: "Switch",
    tip: "Tip",
    trigger: "Trigger",
    update: "Update",
    updateSuccess: "Update Success",
    userCenter: "User Center",
    yesOrNo: {
      yes: "Yes",
      no: "No"
    }
  },
  request: {
    logout: "Logout user after request failed",
    logoutMsg: "User status is invalid, please log in again",
    logoutWithModal: "Pop up modal after request failed and then log out user",
    logoutWithModalMsg: "User status is invalid, please log in again",
    refreshToken: "The requested token has expired, refresh the token",
    tokenExpired: "The requested token has expired"
  },
  theme: {
    themeSchema: {
      title: "Theme Schema",
      light: "Light",
      dark: "Dark",
      system: "Follow System"
    },
    grayscale: "Grayscale",
    colourWeakness: "Colour Weakness",
    layoutMode: {
      title: "Layout Mode",
      vertical: "Vertical Menu Mode",
      horizontal: "Horizontal Menu Mode",
      "vertical-mix": "Vertical Mix Menu Mode",
      "horizontal-mix": "Horizontal Mix menu Mode",
      reverseHorizontalMix: "Reverse first level menus and child level menus position"
    },
    recommendColor: "Apply Recommended Color Algorithm",
    recommendColorDesc: "The recommended color algorithm refers to",
    themeColor: {
      title: "Theme Color",
      primary: "Primary",
      info: "Info",
      success: "Success",
      warning: "Warning",
      error: "Error",
      followPrimary: "Follow Primary"
    },
    scrollMode: {
      title: "Scroll Mode",
      wrapper: "Wrapper",
      content: "Content"
    },
    page: {
      animate: "Page Animate",
      mode: {
        title: "Page Animate Mode",
        fade: "Fade",
        "fade-slide": "Slide",
        "fade-bottom": "Fade Zoom",
        "fade-scale": "Fade Scale",
        "zoom-fade": "Zoom Fade",
        "zoom-out": "Zoom Out",
        none: "None"
      }
    },
    fixedHeaderAndTab: "Fixed Header And Tab",
    header: {
      height: "Header Height",
      breadcrumb: {
        visible: "Breadcrumb Visible",
        showIcon: "Breadcrumb Icon Visible"
      },
      multilingual: {
        visible: "Display multilingual button"
      }
    },
    tab: {
      visible: "Tab Visible",
      cache: "Tag Bar Info Cache",
      height: "Tab Height",
      mode: {
        title: "Tab Mode",
        chrome: "Chrome",
        button: "Button"
      }
    },
    sider: {
      inverted: "Dark Sider",
      width: "Sider Width",
      collapsedWidth: "Sider Collapsed Width",
      mixWidth: "Mix Sider Width",
      mixCollapsedWidth: "Mix Sider Collapse Width",
      mixChildMenuWidth: "Mix Child Menu Width"
    },
    footer: {
      visible: "Footer Visible",
      fixed: "Fixed Footer",
      height: "Footer Height",
      right: "Right Footer"
    },
    watermark: {
      visible: "Watermark Full Screen Visible",
      text: "Watermark Text"
    },
    themeDrawerTitle: "Theme Configuration",
    pageFunTitle: "Page Function",
    resetCacheStrategy: {
      title: "Reset Cache Strategy",
      close: "Close Page",
      refresh: "Refresh Page"
    },
    configOperation: {
      copyConfig: "Copy Config",
      copySuccessMsg:
        'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: "Reset Config",
      resetSuccessMsg: "Reset Success"
    }
  },
  route: {
    login: "Login",
    403: "No Permission",
    404: "Page Not Found",
    500: "Server Error",
    "iframe-page": "Iframe",
    home: "Home",
    sys: "System Management",
    sysRole: "Role Management",
    sysUser: "User Management",
    sysMenu: "Menu Management",
    doc: "Document",
    doc_vue: "Vue Document",
    doc_unocss: "Unocss Document",
    doc_naive_ui: "Naive UI Document",
    doc_alova: "Alova Document"
  },
  page: {
    sysMenu: {
      title: "Menu Management",
      button: {
        add: "Add Menu",
        addRoot: "Add Root Menu",
        addChild: "Add Child Menu",
        edit: "Edit Menu",
        delete: "Delete Menu",
        expandAll: "Expand All",
        collapseAll: "Collapse All"
      },
      table: {
        columns: {
          id: "Menu ID",
          name: "Menu Name",
          i18nKey: "I18n Key",
          type: "Type",
          icon: "Icon",
          path: "Route Path",
          component: "Component Path",
          perms: "Permission Key",
          sort: "Sort",
          visible: "Visible",
          status: "Status",
          createTime: "Create Time",
          updateTime: "Update Time",
          action: "Action"
        },
        type: {
          1: "Directory",
          2: "Menu",
          3: "Button"
        },
        visible: {
          1: "Show",
          0: "Hide"
        },
        status: {
          1: "Enabled",
          0: "Disabled"
        }
      },
      modal: {
        add: {
          title: "Add Menu",
          parentPlaceholder: "Select parent (empty for root)"
        },
        edit: {
          title: "Edit Menu"
        },
        delete: {
          title: "Delete Menu",
          message: "Delete menu 【{name}】and all its children?"
        }
      },
      form: {
        rules: {
          name: {
            required: "Menu name is required",
            invalid: "Length 2-20 characters"
          },
          i18nKey: {
            invalid: "Format like: sys.menu.user"
          },
          path: {
            requiredForType: "Required for directory/menu",
            invalid: "Must start with / (e.g. /system/user)"
          },
          component: {
            requiredForMenu: "Required for menu type",
            invalid: "Format like: @/views/system/user/index.vue"
          },
          perms: {
            requiredForButton: "Required for button type",
            invalid: "Format like: system:user:add"
          },
          sort: {
            invalid: "Must ≥0"
          }
        }
      },
      message: {
        addSuccess: "Menu 【{name}】added!",
        editSuccess: "Menu 【{name}】updated!",
        deleteSuccess: "Menu 【{name}】deleted!",
        cannotDeleteRoot: "Root menu cannot be deleted!"
      }
    },
    sysUser: {
      title: "User Management",
      search: {
        username: "Username",
        usernamePlaceholder: "Please enter username",
        email: "Email",
        emailPlaceholder: "Please enter email",
        mobile: "Phone",
        mobilePlaceholder: "Please enter phone",
        status: "Status",
        statusPlaceholder: "Select status",
        deptId: "Department",
        deptIdPlaceholder: "Select department"
      },
      button: {
        add: "Add User",
        edit: "Edit User",
        delete: "Delete User",
        batchDelete: "Batch Delete",
        resetPwd: "Reset Password",
        export: "Export Data"
      },
      table: {
        columns: {
          id: "User ID",
          username: "Username",
          realName: "Real Name",
          avatar: "Avatar",
          email: "Email",
          mobile: "Phone",
          status: "Status",
          deptId: "Department",
          lastLoginIp: "Last Login IP",
          lastLoginTime: "Last Login Time",
          createTime: "Create Time",
          updateTime: "Update Time",
          action: "Action"
        },
        status: {
          enabled: "Enabled",
          disabled: "Disabled"
        }
      },
      modal: {
        add: {
          title: "Add User"
        },
        edit: {
          title: "Edit User"
        },
        delete: {
          title: "Delete User",
          message: "Confirm delete user 【{username}】?"
        },
        resetPwd: {
          title: "Reset Password",
          message: "Reset password for user 【{username}】to default?",
          success: "Password reset to: 123456"
        }
      },
      rules: {
        username: {
          required: "Please enter username",
          invalid: "Username length: 2-20 (letters/numbers/underscore)"
        },
        password: {
          required: "Please enter password",
          invalid: "Password requires 6-18 chars (letters/numbers/symbols)"
        },
        email: {
          invalid: "Invalid email format"
        },
        mobile: {
          invalid: "Invalid phone format"
        }
      },
      message: {
        addSuccess: "User 【{username}】added successfully!",
        editSuccess: "User 【{username}】updated successfully!",
        deleteSuccess: "User 【{username}】deleted successfully!"
      }
    },
    login: {
      common: {
        loginOrRegister: "Login / Register",
        userNamePlaceholder: "Please enter user name",
        phonePlaceholder: "Please enter phone number",
        codePlaceholder: "Please enter verification code",
        passwordPlaceholder: "Please enter password",
        confirmPasswordPlaceholder: "Please enter password again",
        codeLogin: "Verification code login",
        confirm: "Confirm",
        back: "Back",
        validateSuccess: "Verification passed",
        loginSuccess: "Login successfully",
        welcomeBack: "Welcome back, {userName} !"
      },
      pwdLogin: {
        rememberMe: "Remember me",
        title: "Password Login",
        rememberMe: "Remember me",
        forgetPassword: "Forget password?",
        welcomeBack: "Welcome back",
        registerPrompt: "Not registered yet?",
        registerAction: "Sign up now and discover great opportunities!",
        loginPrompt: "Already have an account?",
        loginAction: "Just log in, long time no see!",
        loginBtn: "Sign In",
        registerBtn: "Sign Up",
        fbLogin: "Sign in with <span>Facebook</span>",
        fbRegister: "Sign up with <span>Facebook</span>"
      },
      codeLogin: {
        title: "Verification Code Login",
        getCode: "Get verification code",
        reGetCode: "Reacquire after {time}s",
        sendCodeSuccess: "Verification code sent successfully",
        imageCodePlaceholder: "Please enter image verification code"
      },
      register: {
        title: "Register",
        agreement: "I have read and agree to",
        protocol: "《User Agreement》",
        policy: "《Privacy Policy》"
      },
      resetPwd: {
        title: "Reset Password"
      },
      bindWeChat: {
        title: "Bind WeChat"
      }
    },
    home: {
      branchDesc:
        "For the convenience of everyone in developing and updating the merge, we have streamlined the code of the main branch, only retaining the homepage menu, and the rest of the content has been moved to the example branch for maintenance. The preview address displays the content of the example branch.",
      greeting: "Good morning, {userName}, today is another day full of vitality!",
      weatherDesc: "Today is cloudy to clear, 20℃ - 25℃!",
      projectCount: "Project Count",
      todo: "Todo",
      message: "Message",
      downloadCount: "Download Count",
      registerCount: "Register Count",
      schedule: "Work and rest Schedule",
      study: "Study",
      work: "Work",
      rest: "Rest",
      entertainment: "Entertainment",
      visitCount: "Visit Count",
      turnover: "Turnover",
      dealCount: "Deal Count",
      projectNews: {
        title: "Project News",
        moreNews: "More News",
        desc1: "Soybean created the open source project soybean-admin on May 28, 2021!",
        desc2: "Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.",
        desc3: "Soybean is ready to do sufficient preparation for the release of soybean-admin!",
        desc4: "Soybean is busy writing project documentation for soybean-admin!",
        desc5: "Soybean just wrote some of the workbench pages casually, and it was enough to see!"
      },
      creativity: "Creativity"
    }
  },
  form: {
    required: "Cannot be empty",
    userName: {
      required: "Please enter user name",
      invalid: "User name format is incorrect"
    },
    phone: {
      required: "Please enter phone number",
      invalid: "Phone number format is incorrect"
    },
    pwd: {
      required: "Please enter password",
      invalid: "6-18 characters, including letters, numbers, and underscores"
    },
    confirmPwd: {
      required: "Please enter password again",
      invalid: "The two passwords are inconsistent"
    },
    code: {
      required: "Please enter verification code",
      invalid: "Verification code format is incorrect"
    },
    email: {
      required: "Please enter email",
      invalid: "Email format is incorrect"
    }
  },
  dropdown: {
    closeCurrent: "Close Current",
    closeOther: "Close Other",
    closeLeft: "Close Left",
    closeRight: "Close Right",
    closeAll: "Close All"
  },
  icon: {
    themeConfig: "Theme Configuration",
    themeSchema: "Theme Schema",
    lang: "Switch Language",
    fullscreen: "Fullscreen",
    fullscreenExit: "Exit Fullscreen",
    reload: "Reload Page",
    collapse: "Collapse Menu",
    expand: "Expand Menu",
    pin: "Pin",
    unpin: "Unpin"
  },
  datatable: {
    itemCount: "Total {total} items"
  }
};

export default local;
