import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Template, PageData, TemplateTheme } from '../types/template';
import { TemplateService } from '../services/templateService';
import Logger from '../utils/logger';

interface TemplateState {
  templates: Template[];
  selectedTemplate: Template | null;
  selectedTheme: TemplateTheme | null;
  userPages: PageData[];
  currentPage: PageData | null;
  loading: boolean;
  error: string | null;
}

type TemplateAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TEMPLATES'; payload: Template[] }
  | { type: 'SET_SELECTED_TEMPLATE'; payload: Template | null }
  | { type: 'SET_SELECTED_THEME'; payload: TemplateTheme | null }
  | { type: 'SET_USER_PAGES'; payload: PageData[] }
  | { type: 'SET_CURRENT_PAGE'; payload: PageData | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PAGE_CONTENT'; payload: { pageId: string; content: any } };

const templateReducer = (state: TemplateState, action: TemplateAction): TemplateState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TEMPLATES':
      return { ...state, templates: action.payload, loading: false };
    case 'SET_SELECTED_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload,
        selectedTheme: action.payload?.themes[0] || null // Auto-select first theme
      };
    case 'SET_SELECTED_THEME':
      return { ...state, selectedTheme: action.payload };
    case 'SET_USER_PAGES':
      return { ...state, userPages: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_PAGE_CONTENT':
      const updatedPages = state.userPages.map(page =>
        page.id === action.payload.pageId
          ? { ...page, content: { ...page.content, ...action.payload.content } }
          : page
      );
      const updatedCurrentPage = state.currentPage?.id === action.payload.pageId
        ? { ...state.currentPage, content: { ...state.currentPage.content, ...action.payload.content } }
        : state.currentPage;
      return {
        ...state,
        userPages: updatedPages,
        currentPage: updatedCurrentPage
      };
    default:
      return state;
  }
};

interface TemplateContextType extends TemplateState {
  loadTemplates: () => Promise<void>;
  loadTemplatesByCategory: (category: string) => Promise<void>;
  selectTemplate: (template: Template) => void;
  selectTheme: (theme: TemplateTheme) => void;
  createPage: (pageData: Omit<PageData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
  updatePageContent: (pageId: string, content: any) => void;
  publishPage: (pageId: string) => Promise<boolean>;
  loadUserPages: (userId: string) => Promise<void>;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(templateReducer, {
    templates: [],
    selectedTemplate: null,
    selectedTheme: null,
    userPages: [],
    currentPage: null,
    loading: false,
    error: null,
  });

  const loadTemplates = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await TemplateService.getAllTemplates();
      if (result.success && result.data) {
        dispatch({ type: 'SET_TEMPLATES', payload: result.data });
        Logger.info(`Loaded ${result.data.length} templates`);
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to load templates' });
      }
    } catch (error) {
      Logger.error('Error loading templates', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load templates' });
    }
  };

  const loadTemplatesByCategory = async (category: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await TemplateService.getTemplatesByCategory(category);
      if (result.success && result.data) {
        dispatch({ type: 'SET_TEMPLATES', payload: result.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Failed to load templates' });
      }
    } catch (error) {
      Logger.error('Error loading templates by category', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load templates' });
    }
  };

  const selectTemplate = (template: Template) => {
    dispatch({ type: 'SET_SELECTED_TEMPLATE', payload: template });
    // Increment popularity when template is selected
    TemplateService.incrementPopularity(template.id);
    Logger.info('Template selected', { templateId: template.id, templateName: template.name });
  };

  const selectTheme = (theme: TemplateTheme) => {
    dispatch({ type: 'SET_SELECTED_THEME', payload: theme });
    Logger.info('Theme selected', { themeId: theme.id, themeName: theme.name });
  };

  const createPage = async (pageData: Omit<PageData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    try {
      const result = await TemplateService.createUserPage(pageData);
      if (result.success && result.data) {
        await loadUserPages(pageData.userId);
        return result.data;
      }
      return null;
    } catch (error) {
      Logger.error('Error creating page', error);
      return null;
    }
  };

  const updatePageContent = (pageId: string, content: any) => {
    dispatch({ type: 'UPDATE_PAGE_CONTENT', payload: { pageId, content } });
  };

  const publishPage = async (pageId: string): Promise<boolean> => {
    try {
      const result = await TemplateService.publishPage(pageId);
      if (result.success) {
        await loadUserPages(state.currentPage?.userId || '');
        return true;
      }
      return false;
    } catch (error) {
      Logger.error('Error publishing page', error);
      return false;
    }
  };

  const loadUserPages = async (userId: string) => {
    try {
      const result = await TemplateService.getUserPages(userId);
      if (result.success && result.data) {
        dispatch({ type: 'SET_USER_PAGES', payload: result.data });
      }
    } catch (error) {
      Logger.error('Error loading user pages', error);
    }
  };

  const value: TemplateContextType = {
    ...state,
    loadTemplates,
    loadTemplatesByCategory,
    selectTemplate,
    selectTheme,
    createPage,
    updatePageContent,
    publishPage,
    loadUserPages,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
