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
  type: string;
  component: string;
  editableFields: EditableField[];
  required: boolean;
  order: number;
}

export interface EditableField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  required: boolean;
  validation?: any[];
  config?: any;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  themes: TemplateTheme[];
  sections: TemplateSection[];
  defaultContent: { [key: string]: any };
  seoConfig: any;
  performanceScore: number;
  popularity: number;
  preview: {
    desktop: string;
    mobile: string;
    thumbnail: string;
  };
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
  content: { [key: string]: any };
  customCSS?: string;
  isPublished: boolean;
  publishedUrl?: string;
  analytics: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Business {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  contactInfo: any;
  settings: any;
  subscription: any;
  createdAt: Date;
}
