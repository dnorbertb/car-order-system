import { defineAsyncComponent, type AsyncComponentLoader } from "vue";
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent.vue';



// This needs to be changed for all page loader, not single components, it looks bad
// Possible solution is to create same emit in every main component and emit it when component is mounted
// Then calculate if there is same amount of emits and components in config
// Add timeout to show error layout
const defineOrderComponent = (loader: AsyncComponentLoader) => defineAsyncComponent({
    loader: loader,
    loadingComponent: LoadingComponent,
    // errorComponent: LoadingComponent,
    // delay: 200,
    // timeout: 300
})

export const components = {
    HeadingComponent: defineOrderComponent(() => import('@/components/HeadingComponent/HeadingComponent.vue')),
    RadioSelectComponent: defineOrderComponent(() => import('@/components/RadioSelectComponent/RadioSelectComponent.vue')),
    TwoOptionsComponent: defineOrderComponent(() => import('@/components/TwoOptionsComponent/TwoOptionsComponent.vue')),
    DescriptionComponent: defineOrderComponent(() => import('@/components/DescriptionComponent/DescriptionComponent.vue')),
    ColorSelectComponent: defineOrderComponent(() => import('@/components/ColorSelectComponent/ColorSelectComponent.vue')),
    CheckboxesComponent: defineOrderComponent(() => import('@/components/CheckboxesComponent/CheckboxesComponent.vue')),
}


