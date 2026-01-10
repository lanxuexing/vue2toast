import { createVNode, render, App, CSSProperties, inject } from 'vue';
import ToastComponent from './components/Toast.vue';

export interface ToastOptions {
    /**
     * Duration in milliseconds before the toast automatically closes.
     * Set to 0 to disable auto-close.
     * @default 3000
     */
    duration?: number;

    /**
     * Whether to pause the auto-close timer when mouse hovers over the toast.
     * @default true
     */
    pauseOnHover?: boolean;

    /**
     * Custom CSS class name(s) to apply to the toast element.
     */
    className?: string | object | string[];

    /**
     * Custom inline styles to apply to the toast element.
     */
    style?: CSSProperties;

    /**
     * Z-index of the toast container.
     * @default 9999
     */
    zIndex?: number;

    /**
     * Position of the toast on the screen.
     * @default 'center'
     */
    position?: 'top' | 'bottom' | 'center';

    /**
     * Whether to interpret the message property as HTML content.
     * ⚠️ Be careful with XSS vulnerabilities when enabling this.
     * @default false
     */
    useHtml?: boolean;

    [key: string]: any;
}

export interface ToastInstance {
    close: () => void;
    update: (message: string) => void;
}

export type ShowToast = (message: string, options?: ToastOptions | (() => void)) => ToastInstance;

// Module Augmentation for Global Properties
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: ShowToast;
    }
}

const ToastKey = Symbol('Toast');

const Toast = {
    install(app: App, options: ToastOptions = {}) {
        let globalOpt: ToastOptions = {
            duration: 3000,
            pauseOnHover: true,
            zIndex: 9999,
            position: 'center',
            useHtml: false,
        };

        Object.assign(globalOpt, options);

        const showToast: ShowToast = (message: string, options?: ToastOptions | (() => void)): ToastInstance => {
            let localOpt: ToastOptions = { ...globalOpt };
            let callback: (() => void) | null = null;

            if (typeof options === 'object') {
                Object.assign(localOpt, options);
            } else if (typeof options === 'function') {
                callback = options;
            }

            // SSR Guard: If document is undefined (server-side), return a no-op instance.
            if (typeof document === 'undefined') {
                return {
                    close: () => { },
                    update: () => { }
                };
            }

            const container = document.createElement('div');
            document.body.appendChild(container);

            let timer: any = null;

            const startTimer = () => {
                if (localOpt.duration && localOpt.duration > 0) {
                    timer = setTimeout(() => {
                        close();
                    }, localOpt.duration);
                }
            };

            const clearTimer = () => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            };

            let vm = createVNode(ToastComponent, {
                zIndex: localOpt.zIndex,
                position: localOpt.position,
                useHtml: localOpt.useHtml,
                customClass: localOpt.className,
                customStyle: localOpt.style,
                onMouseenter: () => {
                    if (localOpt.pauseOnHover) clearTimer();
                },
                onMouseleave: () => {
                    if (localOpt.pauseOnHover) startTimer();
                }
            });

            // Best Practice: Inherit AppContext
            // This allows the toast component to access global properties, plugins, and dependency injection from the main app.
            vm.appContext = app._context;

            render(vm, container);

            const instance = vm.component?.exposed as { visible: { value: boolean }, message: { value: string } } | undefined;

            if (instance) {
                instance.message.value = message;
                instance.visible.value = true;
            }

            const close = () => {
                if (instance) instance.visible.value = false;
                clearTimer();
                setTimeout(() => {
                    if (container && container.parentNode) {
                        render(null, container);
                        container.parentNode.removeChild(container);
                    }
                    if (callback) callback();
                }, 300);
            };

            startTimer();

            return {
                close,
                update: (newMessage: string) => {
                    if (instance) instance.message.value = newMessage;
                }
            };
        }

        app.config.globalProperties.$toast = showToast;
        app.provide(ToastKey, showToast);
    }
};

export const useToast = (): ShowToast => {
    const toast = inject<ShowToast>(ToastKey);
    if (!toast) {
        throw new Error('Toast plugin not installed');
    }
    return toast;
};

export default Toast;