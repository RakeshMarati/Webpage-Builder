export interface TemplateTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    accentFont: string;
  };
  spacing: {
    section: string;
    element: string;
    component: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    light: string;
    medium: string;
    heavy: string;
  };
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'about' | 'services' | 'testimonials' | 'contact' | 'footer';
  component: string;
  editableFields: EditableField[];
  required: boolean;
  order: number;
}

export interface EditableField {
  id: string;
  type: 'text' | 'textarea' | 'image' | 'color' | 'select' | 'boolean';
  label: string;
  placeholder?: string;
  maxLength?: number;
  required: boolean;
  validation?: ValidationRule[];
  config?: FieldConfig;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  conversionRate: string;
  preview: {
    desktop: string;
    mobile: string;
    thumbnail: string;
  };
  themes: TemplateTheme[];
  sections: TemplateSection[];
  defaultContent: { [key: string]: any };
  seoConfig: SEOConfiguration;
  performanceScore: number;
  popularity: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageData {
  id: string;
  userId: string;
  businessId: string;
  templateId: string;
  themeId: string;
  title: string;
  slug: string;
  content: { [key: string]: any };
  customCSS?: string;
  seoData: SEOData;
  isPublished: boolean;
  publishedUrl?: string;
  analytics: PageAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValidationRule {
  type: string;
  message?: string;
  [key: string]: any;
}

export interface FieldConfig {
  [key: string]: any;
}

export interface SEOConfiguration {
  title: string;
  description: string;
  keywords?: string[];
  [key: string]: any;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  [key: string]: any;
}

export interface PageAnalytics {
  views: number;
  clicks: number;
  [key: string]: any;
}
