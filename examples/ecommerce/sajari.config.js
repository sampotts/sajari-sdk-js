import filterTypes from './src/components/Filters/types';

/**
 * Your environment configuration
 */
export default {
  // These details can be found in your console
  project: '1588205875936974083',
  collection: 'sajari1',
  pipeline: 'query',
  version: undefined, // undefined will use the default version

  // For production this can be undefined
  endpoint: 'https://jsonapi-us-valkyrie-beta1.sajari.net',

  // Whether to enable grid view by default
  display: 'grid',

  // Which facets to display
  // Order in the UI is defined by their order here
  // field: Field to use in results
  // title: Title to display for the filter
  // type: The type of filter to be displayed
  // sort: Whether to sort based on the count
  facets: [
    { field: 'product_type', title: 'Category', sort: true, transform: 'titlecase' },
    { field: 'vendor', title: 'Brand', sort: true },
    // { field: 'price_range', title: 'Price', type: filterTypes.price },
    { field: 'imageTags', title: 'Color', type: filterTypes.color },
    // { field: 'rating', title: 'Rating', type: filterTypes.rating },
  ],

  // Set the tracking config
  tracking: {
    field: 'title', // Usually this is 'url'
  },

  // A map for data fields
  // If a function is specified, the record data will be passed as the single argument
  fields: {
    image: 'image',
    url: 'url',
    title: 'title',
    description: 'body_html',
    // rating: 'rating',
    price: 'price',
    freeShipping: 'free_shipping',
    category: ['product_type', 'titlecase'],
  },
};
