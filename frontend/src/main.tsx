import {createRoot} from 'react-dom/client'
import type {ComponentType} from "react";
import {createInertiaApp} from "@inertiajs/react";
import './styles/globals.scss'

export interface PageProps<T = Record<string, unknown>> {
    props: T;
    component: string;
    url: string;
    version?: string;
}

const pages = import.meta.glob('./pages/*.tsx');

createInertiaApp({
    resolve: async (name) => {
        const importPage = pages[`./pages/${name}.tsx`];
        if (!importPage) throw new Error(`Unknown page: ${name}`);
        const module = (await importPage()) as { default: ComponentType<PageProps> };
        return module.default;
    },
    setup({el, App, props}) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

