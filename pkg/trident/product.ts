import { PRODUCT_NAME, PRODUCT_ROUTE_NAME, BLANK_CLUSTER, CUSTOM_K8S_RESOURCE_NAME, TRIDENT_PAGE_NAME, WIKI_PAGE_NAME, HOME, DEV_TOOLS_PAGE_NAME, SAMPLE_PAGE } from './config/constants';
// import { IPlugin } from '@shell/core/types';
export function init($plugin: any, store: any) {
  const { product, basicType, virtualType } = $plugin.DSL(store, PRODUCT_NAME);

  product({
    icon:    'application',
    inStore: 'management',
    weight:  100,
    to:      {
      name:      `${PRODUCT_NAME}-c-cluster-${HOME}`,
      params:      {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER,
        pkg:     PRODUCT_NAME
      }
    }
  });

  // defining a k8s resource as page
  // configureType(CUSTOM_K8S_RESOURCE_NAME, {
  //   displayName: 'some-custom-name-you-wish-to-assign-to-this-resource',
  //   isCreatable: true,
  //   isEditable:  true,
  //   isRemovable: true,
  //   showAge:     true,
  //   showState:   true,
  //   canYaml:     true,
  //   customRoute: {
  //     name: `${ PRODUCT_ROUTE_NAME }-c-cluster-resource`,
  //     params: {
  //       product: PRODUCT_NAME,
  //       cluster: BLANK_CLUSTER,
  //       resource: CUSTOM_K8S_RESOURCE_NAME
  //     }
  //   }
  // });
  // weightType(HOME, 1004, true)
  virtualType({
    labelKey: 'product.labels.home',
    name: HOME,
    weight: 5,
    route: {
      name: `${PRODUCT_ROUTE_NAME}-c-cluster-${HOME}`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // virtualType({
  //   labelKey: 'Home 1',
  //   name: HOME+"1",
  //   route: {
  //     name: `${PRODUCT_ROUTE_NAME}-c-cluster-${HOME}1`,
  //     params: {
  //       product: PRODUCT_NAME,
  //       cluster: BLANK_CLUSTER
  //     }
  //   }
  // });

  // weightType(TRIDENT_PAGE_NAME, 1005, true)
  virtualType({
    labelKey: 'product.labels.localTesting',
    name:     TRIDENT_PAGE_NAME,
    weight: 4,
    route:    {
      name:   `${ PRODUCT_ROUTE_NAME }-c-cluster-${ TRIDENT_PAGE_NAME }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // weightType(DEV_TOOLS_PAGE_NAME, 1002, true)
  virtualType({
    labelKey: 'product.labels.devTools',
    name:     DEV_TOOLS_PAGE_NAME,
    weight: 3,
    route:    {
      name:   `${ PRODUCT_ROUTE_NAME }-c-cluster-${ DEV_TOOLS_PAGE_NAME }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // weightType(WIKI_PAGE_NAME, 1001, true)
  virtualType({
    labelKey: 'product.labels.wiki',
    name:     WIKI_PAGE_NAME,
    weight: 2,
    route:    {
      name:   `${ PRODUCT_ROUTE_NAME }-c-cluster-${ WIKI_PAGE_NAME }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  virtualType({
    labelKey: 'product.app-launcher',
    name:     SAMPLE_PAGE,
    weight: 1,
    route:    {
      name:   `${ PRODUCT_ROUTE_NAME }-c-cluster-${ SAMPLE_PAGE }`,
      params: {
        product: PRODUCT_NAME,
        cluster: BLANK_CLUSTER
      }
    }
  });

  // registering the defined pages as side-menu entries
  basicType([HOME]);
  basicType([TRIDENT_PAGE_NAME]);
  basicType([DEV_TOOLS_PAGE_NAME]);
  basicType([WIKI_PAGE_NAME]);
  basicType([SAMPLE_PAGE]);
}