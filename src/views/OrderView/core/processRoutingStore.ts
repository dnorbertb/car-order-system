import { useProcessConfigStore } from '@/stores/processConfigStore';
import { useOrderStore } from '@/stores/orderDataStore';
import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IOrderController } from '@/types/IOrderController';
import type { IPageConfig } from '@/types/IModel';

export const useProcessRoutingStore = defineStore('Process Routing Store', () => {
  const route = useRoute();
  const router = useRouter();

  // External stores
  const processStore = useProcessConfigStore();
  const orderStore = useOrderStore();

  // Data
  const orderController = ref<IOrderController>();
  const currentPage = reactive<IPageConfig>({
    name: '',
    route: '',
    title: '',
    components: [],
  });


  // Computed
  // Filters pages by controller rules
  const visiblePages = computed(() => {
    if (!orderController.value) return [];
    let tempPages: Array<IPageConfig> = [...processStore.pages];
    orderController.value.routing_rules.forEach((rule) => {
      tempPages = tempPages.filter((page) => {
        const pageNameEquality = page.name === rule.page_name;
        const rouleCheckResult = rule.visible_if(orderStore.orderData);
        return !(pageNameEquality && rouleCheckResult);
      });
    });
    return tempPages;
  });

  // Calculates current page index
  const currentPageIndex = computed(() =>
    visiblePages.value.findIndex((c) => c.route === currentPage.route),
  );

  // Calculating route progress
  const progress = computed(() => {
    if (!currentPageIndex) return 0;
    return Math.round(
      ((currentPageIndex.value + 1) / visiblePages.value.length) * 100,
    );
  });

  // Routes state
  const isFirstPage = computed(() => {
    if (!processStore.pages[0]) return true;
    return processStore.pages[0].route === currentPage.route;
  });
  const isLastPage = computed(() => visiblePages.value.length === currentPageIndex.value + 1);


  // Core methods
  // Starts routing 
  const startRouting = (controller: IOrderController) => {
    orderController.value = controller;
    const pageRoute = route.params.page as string;
    const requestedPage = visiblePages.value.find((p) => p.route === pageRoute);
    const page = requestedPage ? requestedPage : visiblePages.value[0];
    setCurrentPage(page);
  };

  // Helper methods
  // Goes forward
  const goForward = () => {
    if (isLastPage.value) {
      router.push({
        name: 'SummaryView',
        params: {
          controller: route.params.controller as string,
        },
        query: route.query
      });
      return;
    }
    const nextPage = visiblePages.value[currentPageIndex.value + 1];
    setCurrentPage(nextPage);
    return;
  };

  // Goes back
  const goBack = () => {
    const previousPage = visiblePages.value[currentPageIndex.value - 1];
    setCurrentPage(previousPage);
    return;
  };

  // Sets current page
  const setCurrentPage = (page: IPageConfig) => {
    const params = route.params;
    router.push({
      name: 'OrderView',
      params: {
        ...params,
        page: page.route
      },
      query: route.query
    });
    Object.assign(currentPage, page);
  };


  // Handling routing
  watch(() => route.params, (nV) => {
    if (nV.page) {
      const page = visiblePages.value.find(p => p.route === nV.page);
      Object.assign(currentPage, page)
    }
  });

  return {
    orderController,
    pages: visiblePages,
    currentPage,
    isFirstPage,
    isLastPage,
    progress,
    startRouting,
    goForward,
    goBack
  };
});
