import type { components } from "@/components";

export type IComponentKeys = keyof typeof components;

export interface IModel {
    processTitle: string,
    pages: Array<IPageConfig>
}

export interface IComponentConfig {
    name: IComponentKeys,
    props: Record<string, unknown>,
    summary?: {
        is_summary_item: boolean,
        title: string,
        icon: string,
        data_extractor: (dataStore: Record<string, string | boolean | number>) => Array<{ title: string, value: string }>
    }
}

export interface IPageConfig {
    name: string,
    title: string,
    route: string,
    components: Array<IComponentConfig>,
}