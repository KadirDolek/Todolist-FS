import './bootstrap';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import 'tailwindcss';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});