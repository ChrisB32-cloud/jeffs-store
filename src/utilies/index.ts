export async function posttoShopify(query: any) {
  try {
    const res = await fetch(`${process.env.SHOPIFY_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          process.env.SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
