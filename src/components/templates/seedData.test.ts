import { allTemplates } from './seedData';
import { Template } from '../../types/template';

describe('Seed Data Templates', () => {
  it('should conform to the Template interface', () => {
    allTemplates.forEach((template) => {
      // Basic required fields
      expect(typeof template.name).toBe('string');
      expect(typeof template.category).toBe('string');
      expect(typeof template.industry).toBe('string');
      expect(typeof template.description).toBe('string');
      expect(Array.isArray(template.themes)).toBe(true);
      expect(Array.isArray(template.sections)).toBe(true);
      expect(typeof template.defaultContent).toBe('object');
      expect(typeof template.seoConfig).toBe('object');
      expect(typeof template.performanceScore).toBe('number');
      expect(typeof template.popularity).toBe('number');
      expect(typeof template.preview).toBe('object');
      expect(Array.isArray(template.tags)).toBe(true);
    });
  });

  it('should reference preview images', () => {
    allTemplates.forEach((template) => {
      expect(typeof template.preview.desktop).toBe('string');
      expect(typeof template.preview.mobile).toBe('string');
      expect(typeof template.preview.thumbnail).toBe('string');
      // You can add more checks for file existence if needed
    });
  });
}); 