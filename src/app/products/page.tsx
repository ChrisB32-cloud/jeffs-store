// 'use client';
import NavBar from '@/components/NavBar/NavBar';
import { posttoShopify } from '@/utilies';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from 'react';

async function handler() {
  const fetchData = `query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
      }
    }
  }`;
  const data = await posttoShopify(fetchData);
  if (data) {
    return data;
  } else {
    throw new Error('Error fetching products');
  }
}

export default async function Products() {
  const data = await handler();
  const productData = data.data.products.edges;

  interface ProductInterface {
    node: {
      id: Key | null | undefined;
      images: { edges: { node: { url: string | undefined } }[] };
      title:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<AwaitedReactNode>
        | null
        | undefined;
      description:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<AwaitedReactNode>
        | null
        | undefined;
    };
  }

  return (
    <div>
      <NavBar />
      <div className="bg-white py-24">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {productData.map((product: ProductInterface) => (
              <div
                key={product.node.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.url}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {/* <a href={product.href}> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.node.title}
                    {/* </a> */}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.node.description}
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    {/* <p className="text-sm italic text-gray-500">
                      {product.options}
                    </p> */}
                    {/* <p className="text-base font-medium text-gray-900">
                      {product.price}
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
