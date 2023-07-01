const variants = {
    900: { s: 100, l: 35 },
    800: { s: 95, l: 40 },
    700: { s: 90, l: 45 },
    600: { s: 85, l: 50 },
    500: { s: 80, l: 55 },
    400: { s: 75, l: 60 },
    300: { s: 70, l: 70 },
    200: { s: 65, l: 80 },
    100: { s: 60, l: 90 },
    50: { s: 55, l: 95 },
    25: { s: 50, l: 98 },
};

export const setColorPalette = ({ h, s, l }: Record<string, number>) => {
    const root = document.querySelector(':root')! as HTMLElement;
    for (let v in variants) {
        const key = Number(v) as keyof typeof variants;
        const cs = variants[key].s;
        const cl = variants[key].l;
        const hslColor = `hsl(${h}, ${cs}%, ${cl}%)`
        root.style.setProperty(`--primary-${v}`, hslColor);
    }
}