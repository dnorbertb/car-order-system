export interface IPartnerData {
    id: number,
    name: string,
    text_identifier: string,
    logo: {
        url: string,
        alt: string
    },
    accent_color: {
        h: number
        s: number
        l: number
    },
    pricing: {
        products: Array<{ id: string, name: string, pricing: number }>;
    }
}