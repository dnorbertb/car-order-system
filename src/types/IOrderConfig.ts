




// interface IBundleData {
//     id: number,
//     type: string,
//     name: string,
//     external_service_id: string,
//     price: number,
//     fees: Array<unknown>,
//     included: Array<string>,
// }

// interface IProductData {
//     id: number,
//     type: string,
//     name: string,
//     external_service_id: string,
//     is_subscription: boolean,
//     subscription_period: 'month' | 'year',
//     price: number,
//     fees: Array<unknown>
// }

// type IFormationFees = Record<'standard' | 'expedited', { name: string, amount: number }>


// export interface IOrderConfig {
//     process_data: {
//         id: number,
//         partner_id: number,
//         process_type: string,
//         language: string,
//         content: IProcessContent,
//         pricing: {
//             bundles: Array<IBundleData>,
//             products: Array<IProductData>,
//             formation_fees?: IFormationFees
//         }
//     }
// }