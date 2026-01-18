import { createVNode, render, App, CSSProperties, inject } from 'vue';
import ToastComponent from './components/ToastContainer.vue';

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
            position: 'top', // Changed default to top as it's more standard for stacks, but center is fine too. Let's stick to center to match old default if possible, but stack usually implies top/bottom. Let's use 'top' as default for modern feel.
            useHtml: false,
        };

        Object.assign(globalOpt, options);

        // Cache for containers by position
        const containers = new Map<string, any>();

        const showToast: ShowToast = (message: string, options?: ToastOptions | (() => void)): ToastInstance => {
            let localOpt: ToastOptions = { ...globalOpt };
            let callback: (() => void) | null = null;

            if (typeof options === 'object') {
                Object.assign(localOpt, options);
            } else if (typeof options === 'function') {
                callback = options;
            }

            if (typeof document === 'undefined') {
                return { close: () => { }, update: () => { } };
            }

            // Ensure valid position
            const position = localOpt.position || 'top';

            // Get or create container for this position
            let containerInstance = containers.get(position);

            if (!containerInstance) {
                const containerEl = document.createElement('div');
                document.body.appendChild(containerEl);

                const vm = createVNode(ToastComponent, {
                    position: position,
                    zIndex: localOpt.zIndex
                });

                // Inherit app context
                vm.appContext = app._context;

                render(vm, containerEl);

                // Expose the component instance
                containerInstance = vm.component?.exposed;
                containers.set(position, containerInstance);
            }

            // Add toast to container
            // The container's add method returns a handle with close/update
            const instance = containerInstance.add(message, {
                ...localOpt,
                onClose: callback
            });

            return instance;
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