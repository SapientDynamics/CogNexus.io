import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Chip = ({ children, leading, trailing, className = '', as = 'span', onClick, }) => {
    const base = `inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-900
    border bg-white rounded-full shadow-sm
    border-neutral-200/90
    select-none
    transition-[transform,box-shadow] duration-200 ease-out
    hover:translate-y-[-1px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--cnx-focus-ring,rgba(0,0,0,0.4))] focus-visible:ring-offset-white`;
    const style = {
        borderRadius: 'var(--cnx-chip-radius, 9999px)',
        backgroundColor: 'var(--cnx-chip-bg, rgba(255,255,255,0.95))',
        borderColor: 'var(--cnx-chip-border, rgba(0,0,0,0.08))',
        boxShadow: 'var(--cnx-chip-shadow, 0 2px 6px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06))',
    };
    const content = (_jsxs("span", { className: `${base} ${className}`, style: style, children: [leading ? _jsx("span", { className: "shrink-0", children: leading }) : null, _jsx("span", { className: "whitespace-nowrap", children: children }), trailing ? _jsx("span", { className: "shrink-0", children: trailing }) : null] }));
    if (as === 'button') {
        return (_jsx("button", { type: "button", onClick: onClick, className: "focus:outline-none", children: content }));
    }
    return content;
};
export default Chip;
