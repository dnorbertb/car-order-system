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
}