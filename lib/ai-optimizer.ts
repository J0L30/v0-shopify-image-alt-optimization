import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface OptimizationOptions {
  productTitle: string
  productDescription?: string
  productType?: string
  keywords?: string[]
  keywordDensity?: number
  language?: string
  maxLength?: number
  accessibilityLevel?: "basic" | "wcag" | "ada"
}

export async function generateOptimizedAltText(imageUrl: string, options: OptimizationOptions) {
  try {
    const startTime = Date.now()

    // Set defaults
    const {
      productTitle,
      productDescription = "",
      productType = "",
      keywords = [],
      keywordDensity = 70,
      language = "en",
      maxLength = 125,
      accessibilityLevel = "wcag",
    } = options

    // Build the prompt
    const prompt = buildAltTextPrompt(
      imageUrl,
      productTitle,
      productDescription,
      productType,
      keywords,
      keywordDensity,
      language,
      maxLength,
      accessibilityLevel,
    )

    // Generate alt text using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 100,
      temperature: 0.3,
    })

    // Calculate processing time
    const processingTime = Date.now() - startTime

    // If processing takes too long, fall back to template-based alt text
    if (processingTime > 5000) {
      console.warn(`AI generation took too long (${processingTime}ms), falling back to template`)
      return {
        altText: generateTemplateAltText(productTitle, productType, keywords),
        processingTime,
        method: "template-fallback",
      }
    }

    return {
      altText: text.trim(),
      processingTime,
      method: "ai-generated",
    }
  } catch (error) {
    console.error("Error generating alt text:", error)

    // Fall back to template-based alt text on error
    return {
      altText: generateTemplateAltText(options.productTitle, options.productType, options.keywords),
      processingTime: 0,
      method: "template-fallback-error",
    }
  }
}

function buildAltTextPrompt(
  imageUrl: string,
  productTitle: string,
  productDescription: string,
  productType: string,
  keywords: string[],
  keywordDensity: number,
  language: string,
  maxLength: number,
  accessibilityLevel: string,
): string {
  return `
Generate an SEO-optimized alt text for a product image.

PRODUCT INFORMATION:
- Title: ${productTitle}
- Description: ${productDescription}
- Type: ${productType}
- Target Keywords: ${keywords.join(", ")}

REQUIREMENTS:
- Keyword Density: ${keywordDensity}% (higher means more keyword-focused, lower means more natural language)
- Language: ${language}
- Maximum Length: ${maxLength} characters
- Accessibility Level: ${accessibilityLevel}

GUIDELINES:
- Be descriptive but concise
- Include key product features visible in the image
- Avoid phrases like "image of" or "picture of"
- Incorporate primary keywords naturally
- Follow WCAG accessibility guidelines
- Do not use decorative or meaningless text

OUTPUT:
Provide ONLY the alt text with no additional commentary or explanation.
`
}

function generateTemplateAltText(productTitle: string, productType?: string, keywords?: string[]): string {
  // Simple template-based fallback
  if (keywords && keywords.length > 0) {
    return `${productTitle} - ${keywords.slice(0, 2).join(", ")}${productType ? ` - ${productType}` : ""}`
  }

  return `${productTitle}${productType ? ` - ${productType}` : ""}`
}
