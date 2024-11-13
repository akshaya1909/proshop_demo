import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Creates a new slice, productsApiSlice, which extends apiSlice by injecting new endpoints specific to products.
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // get Api
        getProducts: builder.query({

            // actual HTTP request configuration:
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // otherwise we have to refresh the page
            providesTags: ['Products'],

            // to keep cached data for 5 seconds after it’s no longer used by any component. 
            // This prevents unnecessary re-fetching if the data is briefly unmounted and then remounted.
            keepUnusedDataFor: 5,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
url: `${PRODUCTS_URL}/${data.productId}`,
method: 'PUT',
body: data
            }),
            invalidatesTags: ['Products']
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            }),
        })
    }),
})

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation} = productsApiSlice;