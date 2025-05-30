import {
  createDiscreteApi,
  type DialogOptions,
  type MessageOptions,
  type NotificationOptions
} from "naive-ui";
import type { DialogApiInjection, DialogReactive } from "naive-ui/lib/dialog/src/DialogProvider";
import type { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import type { NotificationApiInjection } from "naive-ui/lib/notification/src/NotificationProvider";
import type { LoadingBarInst } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";

// 创建 Discrete API 实例
const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "notification",
  "dialog",
  "loadingBar"
]);

/**
 * Naive UI 工具增强类
 */
export class NaiveUtils {
  // 原始 API 暴露
  static readonly message: MessageApiInjection = message;
  static readonly notification: NotificationApiInjection = notification;
  static readonly dialog: DialogApiInjection = dialog;
  static readonly loadingBar: LoadingBarInst = loadingBar;

  /**
   * 消息提示封装
   */
  static success(content: string, options?: MessageOptions) {
    return message.success(content, options);
  }

  static error(content: string, options?: MessageOptions) {
    return message.error(content, options);
  }

  static info(content: string, options?: MessageOptions) {
    return message.info(content, options);
  }

  static warning(content: string, options?: MessageOptions) {
    return message.warning(content, options);
  }

  static loading(content: string, options?: MessageOptions) {
    return message.loading(content, options);
  }

  /**
   * 通知提示封装
   */
  static notifySuccess(title: string, content?: string, options?: NotificationOptions) {
    return notification.success({
      title,
      content: content ?? "",
      duration: 2500,
      ...options
    });
  }

  static notifyError(title: string, content?: string, options?: NotificationOptions) {
    return notification.error({
      title,
      content: content ?? "",
      duration: 0, // 错误通知不自动关闭
      ...options
    });
  }

  static notifyInfo(title: string, content?: string, options?: NotificationOptions) {
    return notification.info({
      title,
      content: content ?? "",
      duration: 2000,
      ...options
    });
  }

  static notifyWarning(title: string, content?: string, options?: NotificationOptions) {
    return notification.warning({
      title,
      content: content ?? "",
      duration: 3000,
      ...options
    });
  }

  /**
   * 对话框封装
   */
  static confirm(title: string, content: string, options?: Partial<DialogOptions>): Promise<void> {
    return new Promise((resolve, reject) => {
      const d = dialog.warning({
        title,
        content,
        positiveText: "确认",
        negativeText: "取消",
        closable: false,
        ...options,
        onPositiveClick: () => {
          options?.onPositiveClick?.();
          resolve();
        },
        onNegativeClick: () => {
          options?.onNegativeClick?.();
          reject(new Error("用户取消操作"));
        },
        onClose: () => {
          options?.onClose?.();
          reject(new Error("对话框已关闭"));
        }
      });
    });
  }

  static showSuccessDialog(options: DialogOptions): DialogReactive {
    return dialog.success({
      title: "操作成功",
      positiveText: "知道了",
      ...options
    });
  }

  static showErrorDialog(options: DialogOptions): DialogReactive {
    return dialog.error({
      title: "操作失败",
      positiveText: "我知道了",
      ...options
    });
  }

  static showInfoDialog(options: DialogOptions): DialogReactive {
    return dialog.info({
      title: "信息提示",
      positiveText: "确定",
      ...options
    });
  }

  /**
   * 加载条封装
   */
  static startLoading(): void {
    loadingBar.start();
  }

  static finishLoading(): void {
    loadingBar.finish();
  }

  static errorLoading(): void {
    loadingBar.error();
  }

  /**
   * 组合操作：显示加载条同时执行异步任务
   */
  static async withLoading<T>(promise: Promise<T>): Promise<T> {
    try {
      this.startLoading();
      const result = await promise;
      this.finishLoading();
      return result;
    } catch (error) {
      this.errorLoading();
      throw error;
    }
  }

  /**
   * 组合操作：确认对话框 + 加载状态
   */
  static async confirmWithLoading(title: string, content: string, action: () => Promise<void>) {
    try {
      await this.confirm(title, content);
      return await this.withLoading(action());
    } catch (error) {
      this.notifyError("操作取消", (error as Error).message);
      throw error;
    }
  }
}

/**
 * 导出单例实例
 */
export const $$naive = Object.freeze(new NaiveUtils());
