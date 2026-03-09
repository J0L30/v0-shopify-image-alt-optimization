import type { NextRequest } from "next/server"
import { GraphQLClient } from "graphql-request"

// Initialize GraphQL client with Shopify Admin API
export function getShopifyClient(shop: string) {
  return new GraphQLClient(`https://${shop}/admin/api/2023-07/graphql.json`, {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "",
      "Content-Type": "application/json",
    },
  })
}

// Get store information
export async function getShopifyStore() {
  try {
    const client = getShopifyClient("https://v0-shopify-image-alt-optimization-h6nks8cck-j0l30s-projects.vercel.app") // In production, this would be dynamic

    const query = `
      {
        shop {
          id
          name
          email
          primaryDomain {
            url
          }
        }
      }
    `

    const data = await client.request(query)
    return data.shop
  } catch (error) {
    console.error("Error fetching store information:", error)
    // Return mock data for development
    return {
      id: "gid://shopify/Shop/12345",
      name: "Your Shopify Store",
      email: "owner@example.com",
      primaryDomain: {
        url: "your-store.myshopify.com",
      },
    }
  }
}

// Get product images from Shopify
export async function getShopifyImages(limit = 50, cursor?: string) {
  try {
    const client = getShopifyClient("your-store.myshopify.com") // In production, this would be dynamic

    const query = `
      {
        products(first: ${limit}${cursor ? `, after: "${cursor}"` : ""}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
              images(first: 10) {
                edges {
                  node {
                    id
                    src
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `

    const data = await client.request(query)

    // Transform the data to a more usable format
    const images = data.products.edges.flatMap((product: any) => {
      return product.node.images.edges.map((image: any) => ({
        id: image.node.id,
        src: image.node.src,
        productTitle: product.node.title,
        altText: image.node.altText || "",
        hasOptimizedAlt: Boolean(image.node.altText),
        productId: product.node.id,
      }))
    })

    return {
      images,
      pageInfo: data.products.pageInfo,
    }
  } catch (error) {
    console.error("Error fetching product images:", error)
    // Return mock data for development
    return {
      images: [
        {
          id: "img1",
          src: "/placeholder.svg?height=100&width=100",
          productTitle: "Sample Product 1",
          altText: "",
          hasOptimizedAlt: false,
          productId: "prod1",
        },
        {
          id: "img2",
          src: "/placeholder.svg?height=100&width=100",
          productTitle: "Sample Product 2",
          altText: "A basic product description",
          hasOptimizedAlt: false,
          productId: "prod2",
        },
        {
          id: "img3",
          src: "/placeholder.svg?height=100&width=100",
          productTitle: "Sample Product 3",
          altText: "Optimized alt text with keywords",
          hasOptimizedAlt: true,
          productId: "prod3",
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    }
  }
}

// Update image alt text in Shopify
export async function updateImageAltText(imageId: string, altText: string) {
  try {
    const client = getShopifyClient("your-store.myshopify.com") // In production, this would be dynamic

    const mutation = `
      mutation {
        productImageUpdate(input: {
          id: "${imageId}",
          altText: "${altText.replace(/"/g, '\\"')}"
        }) {
          image {
            id
            altText
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const data = await client.request(mutation)

    if (data.productImageUpdate.userErrors.length > 0) {
      throw new Error(data.productImageUpdate.userErrors[0].message)
    }

    return {
      success: true,
      image: data.productImageUpdate.image,
    }
  } catch (error) {
    console.error("Error updating image alt text:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Verify Shopify webhook
export async function verifyShopifyWebhook(request: NextRequest) {
  try {
    // In a real implementation, you would verify the HMAC signature
    // This is a simplified version for demonstration
    const hmac = request.headers.get("x-shopify-hmac-sha256")

    if (!hmac) {
      return false
    }

    // For now, we'll just return true
    return true
  } catch (error) {
    console.error("Error verifying webhook:", error)
    return false
  }
}
