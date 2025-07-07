import React from 'react';
import { render, act } from '@testing-library/react';
import { TemplateProvider, useTemplate } from './TemplateContext';

// Mock TemplateService
jest.mock('../services/templateService', () => ({
  getAllTemplates: jest.fn().mockResolvedValue({ success: true, data: [
    { id: '1', name: 'Yoga', themes: [{ id: 't1', name: 'Modern' }], category: 'yoga', industry: '', description: '', conversionRate: '', preview: { desktop: '', mobile: '', thumbnail: '' }, sections: [], defaultContent: {}, seoConfig: {}, performanceScore: 0, popularity: 0, tags: [], createdAt: new Date(), updatedAt: new Date() }
  ] }),
  getTemplatesByCategory: jest.fn().mockResolvedValue({ success: true, data: [] }),
  createUserPage: jest.fn().mockResolvedValue({ success: true, data: 'page-1' }),
  incrementPopularity: jest.fn(),
  publishPage: jest.fn().mockResolvedValue({ success: true }),
  getUserPages: jest.fn().mockResolvedValue({ success: true, data: [] }),
}));

const TestComponent = () => {
  const {
    templates,
    selectedTemplate,
    selectedTheme,
    selectTemplate,
    selectTheme,
    createPage,
    updatePageContent,
    userPages,
    loadTemplates,
  } = useTemplate();

  React.useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return (
    <div>
      <div data-testid="templates">{templates.length}</div>
      <div data-testid="selected-template">{selectedTemplate?.name || ''}</div>
      <div data-testid="selected-theme">{selectedTheme?.name || ''}</div>
      <button data-testid="select-template" onClick={() => selectTemplate(templates[0])}>Select Template</button>
      <button data-testid="select-theme" onClick={() => selectTheme(templates[0].themes[0])}>Select Theme</button>
      <button data-testid="create-page" onClick={async () => await createPage({ userId: 'u1', businessId: 'b1', templateId: '1', themeId: 't1', title: 'Test', slug: 'test', content: {}, seoData: {}, isPublished: false, analytics: {}, createdAt: new Date(), updatedAt: new Date() })}>Create Page</button>
      <button data-testid="update-page-content" onClick={() => updatePageContent('page-1', { field: 'value' })}>Update Page Content</button>
      <div data-testid="user-pages">{userPages.length}</div>
    </div>
  );
};

describe('TemplateContext', () => {
  it('loads templates and allows template selection', async () => {
    const { findByTestId, getByTestId } = render(
      <TemplateProvider>
        <TestComponent />
      </TemplateProvider>
    );
    expect(await findByTestId('templates')).toHaveTextContent('1');
    act(() => {
      getByTestId('select-template').click();
    });
    expect(getByTestId('selected-template').textContent).toBe('Yoga');
  });

  it('allows theme selection', async () => {
    const { findByTestId, getByTestId } = render(
      <TemplateProvider>
        <TestComponent />
      </TemplateProvider>
    );
    await findByTestId('templates');
    act(() => {
      getByTestId('select-template').click();
      getByTestId('select-theme').click();
    });
    expect(getByTestId('selected-theme').textContent).toBe('Modern');
  });

  it('creates a page and updates page content', async () => {
    const { findByTestId, getByTestId } = render(
      <TemplateProvider>
        <TestComponent />
      </TemplateProvider>
    );
    await findByTestId('templates');
    act(() => {
      getByTestId('create-page').click();
      getByTestId('update-page-content').click();
    });
    expect(getByTestId('user-pages')).toBeDefined();
  });
}); 