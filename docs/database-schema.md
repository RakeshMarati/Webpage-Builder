# Firestore Collections Schema

## templates/
- id: string (auto-generated)
- name: string
- category: string (yoga, clinic, boutique, restaurant, education, services)
- industry: string
- description: string
- themes: array of theme objects
- sections: array of section definitions
- defaultContent: object with default values
- seoConfig: SEO configuration object
- performanceScore: number (0-100)
- popularity: number (usage count)
- preview: { desktop: string, mobile: string, thumbnail: string }
- tags: array of strings
- createdAt: timestamp
- updatedAt: timestamp

## userPages/
- id: string (auto-generated)
- userId: string (ref to users collection)
- businessId: string
- templateId: string (ref to templates)
- themeId: string
- content: object with customized content
- customCSS: string (optional)
- isPublished: boolean
- publishedUrl: string
- analytics: object with performance data
- createdAt: timestamp
- updatedAt: timestamp

## businesses/
- id: string (auto-generated)
- userId: string (owner)
- name: string
- category: string
- description: string
- contactInfo: object
- settings: object
- subscription: object
- createdAt: timestamp 