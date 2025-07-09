import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
  } from 'firebase/firestore';
  import { db, handleFirebaseError } from '../lib/firebase';
  import { Template, PageData } from '../types/template';
  import Logger from '../utils/logger';
  
  export class TemplateService {
    private static COLLECTION_NAME = 'templates';
  
    static async getAllTemplates(): Promise<{ success: boolean; data?: Template[]; error?: string }> {
      try {
        Logger.info('Fetching all templates', { component: 'TemplateService', action: 'getAllTemplates' });
  
        const templatesRef = collection(db, this.COLLECTION_NAME);
        const q = query(templatesRef, orderBy('popularity', 'desc'));
        const querySnapshot = await getDocs(q);
  
        const templates: Template[] = [];
        querySnapshot.forEach((doc) => {
          templates.push({ id: doc.id, ...doc.data() } as Template);
        });
  
        Logger.info(`Successfully fetched ${templates.length} templates`);
        return { success: true, data: templates };
      } catch (error) {
        const errorMessage = handleFirebaseError(error, 'getAllTemplates');
        Logger.error('Failed to fetch templates', error, { component: 'TemplateService' });
        return { success: false, error: errorMessage };
      }
    }
  
    static async getTemplatesByCategory(category: string): Promise<{ success: boolean; data?: Template[]; error?: string }> {
      try {
        Logger.info('Fetching templates by category', {
          component: 'TemplateService',
          action: 'getTemplatesByCategory',
          category
        });
  
        const templatesRef = collection(db, this.COLLECTION_NAME);
        const q = query(
          templatesRef,
          where('category', '==', category),
          orderBy('popularity', 'desc')
        );
        const querySnapshot = await getDocs(q);
  
        const templates: Template[] = [];
        querySnapshot.forEach((doc) => {
          templates.push({ id: doc.id, ...doc.data() } as Template);
        });
  
        return { success: true, data: templates };
      } catch (error) {
        const errorMessage = handleFirebaseError(error, 'getTemplatesByCategory');
        return { success: false, error: errorMessage };
      }
    }
  
    static async getTemplateById(templateId: string): Promise<{ success: boolean; data?: Template; error?: string }> {
      try {
        Logger.info('Fetching template by ID', {
          component: 'TemplateService',
          action: 'getTemplateById',
          templateId
        });
  
        const docRef = doc(db, this.COLLECTION_NAME, templateId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const template = { id: docSnap.id, ...docSnap.data() } as Template;
          return { success: true, data: template };
        } else {
          return { success: false, error: 'Template not found' };
        }
      } catch (error) {
        const errorMessage = handleFirebaseError(error, 'getTemplateById');
        return { success: false, error: errorMessage };
      }
    }
  
    static async createTemplate(templateData: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: string; error?: string }> {
      try {
        Logger.info('Creating new template', {
          component: 'TemplateService',
          action: 'createTemplate',
          templateName: templateData.name
        });
  
        const templatesRef = collection(db, this.COLLECTION_NAME);
        const docRef = await addDoc(templatesRef, {
          ...templateData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
  
        Logger.info(`Template created successfully with ID: ${docRef.id}`);
        return { success: true, data: docRef.id };
      } catch (error) {
        const errorMessage = handleFirebaseError(error, 'createTemplate');
        return { success: false, error: errorMessage };
      }
    }
  
    static async updateTemplate(templateId: string, updates: Partial<Template>): Promise<{ success: boolean; error?: string }> {
      try {
        Logger.info('Updating template', {
          component: 'TemplateService',
          action: 'updateTemplate',
          templateId
        });
  
        const docRef = doc(db, this.COLLECTION_NAME, templateId);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: new Date(),
        });
  
        return { success: true };
      } catch (error) {
        const errorMessage = handleFirebaseError(error, 'updateTemplate');
        return { success: false, error: errorMessage };
      }
    }
  
    static async incrementPopularity(templateId: string): Promise<void> {
      try {
        const docRef = doc(db, this.COLLECTION_NAME, templateId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const currentPopularity = docSnap.data().popularity || 0;
          await updateDoc(docRef, {
            popularity: currentPopularity + 1,
            updatedAt: new Date(),
          });
        }
      } catch (error) {
        Logger.error('Failed to increment template popularity', error, {
          component: 'TemplateService',
          templateId,
        });
      }
    }
  }
  