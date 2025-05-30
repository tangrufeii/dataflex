<template>
  <n-card class="dowebok" :class="{ 's--signup': isSignUp }" content-style="padding:0px;">
    <div
      class="form sign-in"
      style="height: calc(100%); border-radius: 4px"
      content-style="padding:0px;">
      <n-card>
        <div class="setting-in">
          <theme-switch />
          <LangSwitch :lang="appStore.locale" :lang-options="localeOptions" />
        </div>
      </n-card>
      <n-card style="height: 100%" content-style="height:100%">
        <n-h2>{{ $t("page.login.pwdLogin.welcomeBack") }}</n-h2>
        <div class="form-n">
          <n-form ref="form" :model="model" :rules="rules" style="width: 300px; margin-top: 50px">
            <n-form-item :label="$t('page.login.common.userNamePlaceholder')" path="username">
              <n-input v-model:value="model.username" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item :label="$t('page.login.common.passwordPlaceholder')" path="password">
              <n-input v-model:value="model.password" type="password" @keydown.enter.prevent />
            </n-form-item>
            <n-checkbox v-model:checked="rememberMe">
              {{ $t("page.login.pwdLogin.rememberMe") }}
            </n-checkbox>
          </n-form>
        </div>
        <p class="forgot-pass">
          <a href="javascript:" @click.prevent="handleForgotPassword">
            {{ $t("page.login.pwdLogin.forgetPassword") }}
          </a>
        </p>
        <n-button class="submit" @click="handleLogin">
          {{ $t("page.login.pwdLogin.loginBtn") }}
        </n-button>
        <n-button class="fb-btn" v-html="$t('page.login.pwdLogin.fbLogin')" />
      </n-card>
    </div>
    <div class="sub-cont">
      <n-card style="margin-bottom: -4px">
        <div class="setting-up">
          <theme-switch />
          <LangSwitch :lang="appStore.locale" :lang-options="localeOptions" />
        </div>
      </n-card>
      <div class="img">
        <div class="img__text m--up">
          <h2>{{ $t("page.login.pwdLogin.registerPrompt") }}</h2>
          <p>{{ $t("page.login.pwdLogin.registerAction") }}</p>
        </div>
        <div class="img__text m--in">
          <h2>{{ $t("page.login.pwdLogin.loginPrompt") }}</h2>
          <p>{{ $t("page.login.pwdLogin.loginAction") }}</p>
        </div>
        <div class="img__btn" @click="toggleForm">
          <span class="m--up">{{ $t("page.login.pwdLogin.registerBtn") }}</span>
          <span class="m--in">{{ $t("page.login.pwdLogin.loginBtn") }}</span>
        </div>
      </div>
      <n-card class="form sign-up">
        <div>
          <h2>{{ $t("page.login.pwdLogin.registerAction") }}</h2>
          <div class="form-n">
            <n-form ref="form" :model="model" :rules="rules" style="width: 300px; margin-top: 50px">
              <n-form-item :label="$t('page.login.common.userNamePlaceholder')" path="username">
                <n-input v-model:value="model.username" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item :label="$t('page.login.common.passwordPlaceholder')" path="password">
                <n-input v-model:value="model.password" type="password" @keydown.enter.prevent />
              </n-form-item>
            </n-form>
          </div>
          <n-button class="submit" @click="handleRegister">
            {{ $t("page.login.pwdLogin.registerBtn") }}
          </n-button>
          <n-button class="fb-btn" v-html="$t('page.login.pwdLogin.fbRegister')" />
        </div>
      </n-card>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import LangSwitch from "@/components/common/LangSwitch.vue";
import ThemeSwitch from "@/components/common/ThemeSwitch.vue";
import { computed, ref, useTemplateRef } from "vue";
import { useAppStore } from "@/stores/modules/app";
import {
  darkTheme,
  type FormItemRule,
  type FormRules,
  type GlobalTheme,
  useOsTheme
} from "naive-ui";
import { ThemeMode } from "~/types/enums/theme.ts";
import { $t } from "@/locales";
import { router } from "@/router";

interface ModelType {
  username: string | null;
  password: string | null;
  reenteredPassword?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formRef = useTemplateRef("form");
const isSignUp = ref(false);
const loginEmail = ref("");
const loginPassword = ref("");
const registerUsername = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const appStore = useAppStore();
const osTheme = ref(useOsTheme());
const rememberMe = ref(false);
const localeOptions = [
  {
    label: "中文",
    key: "zh-CN"
  },
  {
    label: "English",
    key: "en-US"
  }
];
const model = ref<ModelType>({
  age: null,
  password: null,
  reenteredPassword: null
});
const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};
// eslint-disable-next-line vue/return-in-computed-property
const isDark = computed<GlobalTheme | null>(() => {
  if (appStore.themeMode === ThemeMode.DARK) {
    return darkTheme;
  }
  if (appStore.themeMode === ThemeMode.LIGHT) {
    return null;
  }
  if (appStore.themeMode === ThemeMode.SYSTEM) {
    if (osTheme.value && osTheme.value === "dark") {
      return darkTheme;
    }
    return null;
  }
});
const emit = defineEmits<{
  (e: "login", payload: { email: string; password: string }): void;
  (e: "register", payload: { username: string; email: string; password: string }): void;
  (e: "forgot-password", email: string): void;
}>();

const toggleForm = () => {
  isSignUp.value = !isSignUp.value;
};

const handleLogin = () => {
  /** 编程式导航 **/
  router.push("/home");
  emit("login", {
    ...model.value
  });
};

const handleRegister = () => {
  emit("register", {
    ...model.value
  });
};

const handleForgotPassword = () => {
  emit("forgot-password", loginEmail.value);
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: #ededed;
}
.dowebok {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 550px;
  margin: -300px 0 0 -450px;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  transition: transform 0.6s ease-in-out;
}

.dowebok.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: flex;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url("@/assets/images/bg.jpg");
  background-size: cover;
  transition: transform 0.6s ease-in-out;
}

.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.dowebok.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0;
  text-align: center;
  color: #fff;
  transition: transform 0.6s ease-in-out;
}

.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

.img__text p {
  font-size: 14px;
  line-height: 1.5;
}

.dowebok.s--signup .img__text.m--up {
  transform: translateX(520px);
}
.img__text.m--in {
  transform: translateX(-520px);
}

.dowebok.s--signup .img__text.m--in {
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
}

.img__btn span.m--in {
  transform: translateY(-72px);
}

.dowebok.s--signup .img__btn span.m--in {
  transform: translateY(0);
}

.dowebok.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #909399;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}
.forgot-pass a:hover {
  color: cornflowerblue;
}
.forgot-pass a {
  color: #cfcfcf;
}

.submit {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.dowebok.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 0.6s;
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  transform: translate3d(-900px, 0, 0);
}
.dowebok.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}
.setting-in {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.setting-up {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.form-n {
  display: flex;
  justify-content: center;
}
</style>
