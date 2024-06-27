// Don't forget to create a VueJS page called index.vue in the /pages folder!!!
import TridentPage from '../pages/TridentPage.vue';
import WikiPage from '../pages/WikiPage.vue';
import WishPage from '../pages/WishPage.vue';
import DevToolsPage from '../pages/DevToolsPage.vue';
import HomePage from '../pages/HomePage.vue';
import SamplePage from '../pages/SamplePage.vue';
import HomePage1 from '../pages/homepage-1.vue';

import { PRODUCT_NAME, PRODUCT_ROUTE_NAME, BLANK_CLUSTER, TRIDENT_PAGE_NAME, WIKI_PAGE_NAME, HOME, DEV_TOOLS_PAGE_NAME, WISH_PAGE_NAME, SAMPLE_PAGE } from '../config/constants';

const routes = [
  {
    name: `${PRODUCT_ROUTE_NAME}-c-cluster-${HOME}`,
    path: `/${PRODUCT_ROUTE_NAME}/c/:cluster/${HOME}`,
    component: HomePage,
    meta: {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  },
  // {
  //   name: `${PRODUCT_ROUTE_NAME}-c-cluster-${HOME}1`,
  //   path: `/${PRODUCT_ROUTE_NAME}/c/:cluster/${HOME}1`,
  //   component: HomePage1,
  //   meta: {
  //     product: PRODUCT_NAME,
  //     cluster: BLANK_CLUSTER,
  //     pkg:     PRODUCT_NAME
  //   }
  // },
  {
    name:      `${ PRODUCT_ROUTE_NAME }-c-cluster-${ TRIDENT_PAGE_NAME }`,
    path:      `/${ PRODUCT_ROUTE_NAME }/c/:cluster/${TRIDENT_PAGE_NAME}`,
    component: TridentPage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  },
  {
    name:      `${ PRODUCT_ROUTE_NAME }-c-cluster-${ DEV_TOOLS_PAGE_NAME }`,
    path:      `/${ PRODUCT_ROUTE_NAME }/c/:cluster/${DEV_TOOLS_PAGE_NAME}`,
    component: DevToolsPage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  },
  {
    name:      `${ PRODUCT_ROUTE_NAME }-c-cluster-${ WIKI_PAGE_NAME }`,
    path:      `/${ PRODUCT_ROUTE_NAME }/c/:cluster/${WIKI_PAGE_NAME}`,
    component: WikiPage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  },
  {
    name:      `${ PRODUCT_ROUTE_NAME }-c-cluster-${ WISH_PAGE_NAME }`,
    path:      `/${ PRODUCT_ROUTE_NAME }/c/:cluster/${WISH_PAGE_NAME}`,
    component: WishPage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  },
  {
    name:      `${ PRODUCT_ROUTE_NAME }-c-cluster-${ SAMPLE_PAGE }`,
    path:      `/${ PRODUCT_ROUTE_NAME }/c/:cluster/${SAMPLE_PAGE}`,
    component: SamplePage,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    }
  }
];

export default routes;