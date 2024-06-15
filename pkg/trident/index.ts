import { importTypes } from '@rancher/auto-import';
import { ActionLocation, IPlugin } from '@shell/core/types';
import extensionRouting from './routing/extension-routing';
import './assets/css/custom.css'
import { PRODUCT_NAME } from './config/constants';
import HomePage from './pages/HomePage.vue';
// Init the package
export default function(plugin: IPlugin): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');
  // Load a product
  plugin.addProduct(require('./product'));

  plugin.addRoutes(extensionRouting);

  // plugin.addAction(
  //   ActionLocation.HEADER,
  //   { product: [PRODUCT_NAME] },
  //   {
  //     tooltip:    'Make a wish',
  //     shortcut:   'b',
  //     icon:       'icon-monitoring',
  //     // svg:        require('./assets/img/star.svg'),
  //     invoke(opts: any, resources: any, globals: any) {
  //       console.log(`opts`, opts);
  //       console.log(`this`, this);
  //       console.log(`resources`, resources);
  //       // const router = (this as any).$router;
  //       // if (router) {
  //       //   router.push({ name: `${ PRODUCT_ROUTE_NAME }-c-cluster-${ WISH_PAGE_NAME }` });
  //       // }
  //     }
  //   }
  // );
}
