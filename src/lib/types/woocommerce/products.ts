export interface Products {
	data: Product[];
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	type: string;
	status: string;
	featured: boolean;
	catalog_visibility: string;
	description: string;
	short_description: string;
	sku: string;
	price: string;
	regular_price: string;
	sale_price: string;
	date_on_sale_from: null;
	date_on_sale_from_gmt: null;
	date_on_sale_to: null;
	date_on_sale_to_gmt: null;
	on_sale: boolean;
	purchasable: boolean;
	total_sales: number;
	virtual: boolean;
	downloadable: boolean;
	downloads: any[];
	download_limit: number;
	download_expiry: number;
	external_url: string;
	button_text: string;
	tax_status: string;
	tax_class: string;
	manage_stock: boolean;
	stock_quantity: number;
	backorders: string;
	backorders_allowed: boolean;
	backordered: boolean;
	low_stock_amount: null;
	sold_individually: boolean;
	weight: string;
	dimensions: Dimensions;
	shipping_required: boolean;
	shipping_taxable: boolean;
	shipping_class: string;
	shipping_class_id: number;
	reviews_allowed: boolean;
	average_rating: string;
	rating_count: number;
	upsell_ids: any[];
	cross_sell_ids: any[];
	parent_id: number;
	purchase_note: string;
	categories: Category[];
	tags: any[];
	images: Image[];
	attributes: any[];
	default_attributes: any[];
	variations: any[];
	grouped_products: any[];
	menu_order: number;
	price_html: string;
	related_ids: number[];
	meta_data: MetaDatum[];
	stock_status: string;
	has_options: boolean;
	yoast_head: string;
	yoast_head_json: YoastHeadJSON;
	_links: Links;
}

export interface Links {
	self: Collection[];
	collection: Collection[];
}

export interface Collection {
	href: string;
}

export interface Category {
	id: number;
	name: string;
	slug: string;
}

export interface Dimensions {
	length: string;
	width: string;
	height: string;
}

export interface Image {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

export interface MetaDatum {
	id?: number;
	key: string;
	value: ValueClass | string;
}

export interface ValueClass {
	subscription_schemes: any[];
}

export interface YoastHeadJSON {
	title: string;
	robots: Robots;
	canonical: string;
	og_locale: string;
	og_type: string;
	og_title: string;
	og_description: string;
	og_url: string;
	og_site_name: string;
	article_publisher: string;
	og_image: OgImage[];
	twitter_card: string;
	twitter_misc: TwitterMisc;
	schema: Schema;
}

export interface OgImage {
	width: number;
	height: number;
	url: string;
	type: string;
}

export interface Robots {
	index: string;
	follow: string;
	'max-snippet': string;
	'max-image-preview': string;
	'max-video-preview': string;
}

export interface Schema {
	'@context': string;
	'@graph': Graph[];
}

export interface Graph {
	'@type': string;
	'@id': string;
	url?: string;
	name?: string;
	isPartOf?: Breadcrumb;
	datePublished?: string;
	dateModified?: string;
	breadcrumb?: Breadcrumb;
	inLanguage?: string;
	potentialAction?: PotentialAction[];
	itemListElement?: ItemListElement[];
	description?: string;
}

export interface Breadcrumb {
	'@id': string;
}

export interface ItemListElement {
	'@type': string;
	position: number;
	name: string;
	item?: string;
}

export interface PotentialAction {
	'@type': string;
	target: string[] | TargetClass;
	'query-input'?: string;
}

export interface TargetClass {
	'@type': string;
	urlTemplate: string;
}

export interface TwitterMisc {
	'Est. reading time': string;
}
