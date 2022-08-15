import pkg from '@woocommerce/woocommerce-rest-api';
import { WP_KEY, WP_SECRET, ROOT } from '$lib/constants';
const WooCommerceRestApi = pkg.default;

const wcClient = new WooCommerceRestApi({
	url: ROOT,
	consumerKey: WP_KEY,
	consumerSecret: WP_SECRET,
	version: 'wc/v3'
});

export default wcClient;
