import type { IOrderController } from "@/types/IOrderController";

export const car: IOrderController = {
    loader: async ({ route }) => {
        // Different api shots here 
        const { product, language } = route.params as Record<string, string>;
        const modelLoader = () => import(`@/models/${product}/${product}.${language}.ts`);
        const model = await modelLoader();
        return model.model;
    },
    submitter: () => {
    },
    routing_rules: [
        { page_name: 'CompanyAddressPage', visible_if: (object: { [key: string]: unknown }) => object['virtual-address-selected'] === 'yes' },
        { page_name: 'MailingAddressPage', visible_if: (object: { [key: string]: unknown }) => object['virtual-address-selected'] === 'yes' },
    ],
}