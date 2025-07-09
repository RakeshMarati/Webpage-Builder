import { Template, TemplateTheme } from '../types/template';

// Common themes that work across industries
export const createThemes = (industry: string): TemplateTheme[] => {
  const baseThemes = {
    modern: {
      id: 'modern',
      name: 'Modern',
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#6c5ce7',
        background: '#ffffff',
        text: '#2d3748',
        muted: '#718096',
      },
      typography: {
        headingFont: 'Inter, sans-serif',
        bodyFont: 'Inter, sans-serif',
        accentFont: 'Inter, sans-serif',
      },
      spacing: {
        section: '5rem',
        element: '2rem',
        component: '1rem',
      },
      borderRadius: {
        small: '0.375rem',
        medium: '0.75rem',
        large: '1.5rem',
      },
      shadows: {
        light: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        heavy: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
    classic: {
      id: 'classic',
      name: 'Classic',
      colors: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#e74c3c',
        background: '#ffffff',
        text: '#2c3e50',
        muted: '#7f8c8d',
      },
      typography: {
        headingFont: 'Georgia, serif',
        bodyFont: 'Arial, sans-serif',
        accentFont: 'Georgia, serif',
      },
      spacing: {
        section: '4rem',
        element: '1.5rem',
        component: '0.75rem',
      },
      borderRadius: {
        small: '0.25rem',
        medium: '0.5rem',
        large: '1rem',
      },
      shadows: {
        light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        medium: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        heavy: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
      },
    },
    vibrant: {
      id: 'vibrant',
      name: 'Vibrant',
      colors: {
        primary: '#e74c3c',
        secondary: '#f39c12',
        accent: '#9b59b6',
        background: '#ffffff',
        text: '#2c3e50',
        muted: '#95a5a6',
      },
      typography: {
        headingFont: 'Poppins, sans-serif',
        bodyFont: 'Open Sans, sans-serif',
        accentFont: 'Poppins, sans-serif',
      },
      spacing: {
        section: '6rem',
        element: '2.5rem',
        component: '1.25rem',
      },
      borderRadius: {
        small: '0.5rem',
        medium: '1rem',
        large: '2rem',
      },
      shadows: {
        light: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        medium: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
        heavy: '0 16px 32px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  };

  // Customize themes based on industry
  const industryCustomizations = {
    yoga: {
      modern: { colors: { primary: '#9CAF88', secondary: '#B8C5A6', accent: '#E8F5E8' } },
      classic: { colors: { primary: '#8B5A3C', secondary: '#D4B896', accent: '#F5E6D3' } },
      vibrant: { colors: { primary: '#FF6B6B', secondary: '#FFD93D', accent: '#6BCF7F' } },
    },
    clinic: {
      modern: { colors: { primary: '#0066CC', secondary: '#00A86B', accent: '#FF6B35' } },
      classic: { colors: { primary: '#2C5282', secondary: '#3182CE', accent: '#38A169' } },
      vibrant: { colors: { primary: '#4299E1', secondary: '#48BB78', accent: '#ED8936' } },
    },
    boutique: {
      modern: { colors: { primary: '#D53F8C', secondary: '#ED64A6', accent: '#F687B3' } },
      classic: { colors: { primary: '#744C9E', secondary: '#9F7AEA', accent: '#D69E2E' } },
      vibrant: { colors: { primary: '#E53E3E', secondary: '#DD6B20', accent: '#38B2AC' } },
    },
    restaurant: {
      modern: { colors: { primary: '#D69E2E', secondary: '#F6AD55', accent: '#FBD38D' } },
      classic: { colors: { primary: '#C05621', secondary: '#DD6B20', accent: '#ED8936' } },
      vibrant: { colors: { primary: '#E53E3E', secondary: '#F56500', accent: '#D69E2E' } },
    },
    education: {
      modern: { colors: { primary: '#3182CE', secondary: '#4299E1', accent: '#63B3ED' } },
      classic: { colors: { primary: '#2B6CB0', secondary: '#3182CE', accent: '#4299E1' } },
      vibrant: { colors: { primary: '#9F7AEA', secondary: '#B794F6', accent: '#D6BCFA' } },
    },
    services: {
      modern: { colors: { primary: '#38A169', secondary: '#48BB78', accent: '#68D391' } },
      classic: { colors: { primary: '#2F855A', secondary: '#38A169', accent: '#48BB78' } },
      vibrant: { colors: { primary: '#00B5D8', secondary: '#0BC5EA', accent: '#76E4F7' } },
    },
  };

  return Object.entries(baseThemes).map(([key, theme]) => ({
    ...theme,
    colors: {
      ...theme.colors,
      ...(industryCustomizations[industry]?.[key]?.colors || {}),
    },
  }));
};

// Yoga Studio Template
export const yogaStudioTemplate: Omit<Template, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Yoga Studio Harmony',
  category: 'yoga',
  industry: 'Fitness & Wellness',
  description: 'Perfect for yoga instructors, meditation centers, and wellness studios. Features class schedules, instructor profiles, and booking integration.',
  conversionRate: '18-25%',
  preview: {
    desktop: '/template-previews/yoga-desktop.jpg',
    mobile: '/template-previews/yoga-mobile.jpg',
    thumbnail: '/template-previews/yoga-thumb.jpg',
  },
  themes: createThemes('yoga'),
  sections: [
    {
      id: 'hero',
      type: 'hero',
      component: 'YogaHeroSection',
      editableFields: [
        {
          id: 'headline',
          type: 'text',
          label: 'Main Headline',
          placeholder: 'Find Your Inner Peace',
          maxLength: 60,
          required: true,
          validation: [{ type: 'minLength', value: 10 }],
        },
        {
          id: 'subheadline',
          type: 'textarea',
          label: 'Subheadline',
          placeholder: 'Join our community of wellness seekers...',
          maxLength: 200,
          required: true,
        },
        {
          id: 'ctaText',
          type: 'text',
          label: 'Call to Action Button',
          placeholder: 'Start Your Journey',
          maxLength: 25,
          required: true,
        },
        {
          id: 'backgroundImage',
          type: 'image',
          label: 'Background Image',
          required: true,
          config: { dimensions: '1920x1080', aspectRatio: '16:9' },
        },
      ],
      required: true,
      order: 1,
    },
    {
      id: 'instructor',
      type: 'about',
      component: 'InstructorProfileSection',
      editableFields: [
        {
          id: 'instructorName',
          type: 'text',
          label: 'Instructor Name',
          placeholder: 'Sarah Johnson',
          maxLength: 50,
          required: true,
        },
        {
          id: 'credentials',
          type: 'text',
          label: 'Credentials',
          placeholder: 'RYT-500, Meditation Teacher',
          maxLength: 100,
          required: false,
        },
        {
          id: 'bio',
          type: 'textarea',
          label: 'Biography',
          placeholder: 'Sarah has been practicing yoga for over 10 years...',
          maxLength: 500,
          required: true,
        },
        {
          id: 'instructorImage',
          type: 'image',
          label: 'Instructor Photo',
          required: true,
          config: { dimensions: '400x400', aspectRatio: '1:1' },
        },
      ],
      required: true,
      order: 2,
    },
    {
      id: 'services',
      type: 'services',
      component: 'YogaServicesSection',
      editableFields: [
        {
          id: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          placeholder: 'Our Classes',
          maxLength: 50,
          required: true,
        },
        {
          id: 'services',
          type: 'select',
          label: 'Class Types',
          required: true,
          config: {
            multiple: true,
            options: [
              { value: 'hatha', label: 'Hatha Yoga' },
              { value: 'vinyasa', label: 'Vinyasa Flow' },
              { value: 'yin', label: 'Yin Yoga' },
              { value: 'meditation', label: 'Meditation' },
              { value: 'prenatal', label: 'Prenatal Yoga' },
              { value: 'restorative', label: 'Restorative Yoga' },
            ],
          },
        },
      ],
      required: true,
      order: 3,
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      component: 'TestimonialsSection',
      editableFields: [
        {
          id: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          placeholder: 'What Our Students Say',
          maxLength: 50,
          required: true,
        },
        {
          id: 'testimonial1',
          type: 'textarea',
          label: 'First Testimonial',
          placeholder: 'This studio changed my life...',
          maxLength: 200,
          required: true,
        },
        {
          id: 'client1Name',
          type: 'text',
          label: 'Client 1 Name',
          placeholder: 'Maria S.',
          maxLength: 30,
          required: true,
        },
      ],
      required: false,
      order: 4,
    },
    {
      id: 'contact',
      type: 'contact',
      component: 'ContactSection',
      editableFields: [
        {
          id: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          placeholder: 'Start Your Journey Today',
          maxLength: 50,
          required: true,
        },
        {
          id: 'offerTitle',
          type: 'text',
          label: 'Free Offer Title',
          placeholder: 'Free First Class',
          maxLength: 30,
          required: true,
        },
        {
          id: 'offerDescription',
          type: 'textarea',
          label: 'Offer Description',
          placeholder: 'Book your complimentary first class and discover the transformative power of yoga.',
          maxLength: 150,
          required: true,
        },
      ],
      required: true,
      order: 5,
    },
  ],
  defaultContent: {
    headline: 'Find Your Inner Peace Through Yoga',
    subheadline: 'Join our welcoming community and discover the transformative power of yoga in a serene, supportive environment.',
    ctaText: 'Start Your Journey',
    backgroundImage: '/stock-images/yoga-hero.jpg',
    instructorName: 'Sarah Johnson',
    credentials: 'RYT-500, Meditation Teacher',
    bio: 'Sarah has been practicing yoga for over 10 years and teaching for 5. She believes in making yoga accessible to everyone, regardless of experience level.',
    instructorImage: '/stock-images/yoga-instructor.jpg',
    sectionTitle: 'Our Classes',
    services: ['hatha', 'vinyasa', 'meditation'],
    testimonial1: 'Sarah\'s classes are amazing! I feel so much more centered and peaceful after each session.',
    client1Name: 'Maria S.',
    offerTitle: 'Free First Class',
    offerDescription: 'Book your complimentary first class and discover the transformative power of yoga.',
  },
  seoConfig: {
    title: 'Yoga Studio - Find Inner Peace | {{businessName}}',
    description: 'Transform your mind and body with our expert yoga instruction. Join our welcoming community for classes suitable for all levels.',
    keywords: ['yoga classes', 'meditation', 'wellness', 'fitness', 'mindfulness'],
    ogImage: '/template-previews/yoga-og.jpg',
  },
  performanceScore: 95,
  popularity: 0,
  tags: ['yoga', 'wellness', 'fitness', 'meditation', 'health'],
};

// Medical Clinic Template
export const medicalClinicTemplate: Omit<Template, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Medical Care Professional',
  category: 'clinic',
  industry: 'Healthcare',
  description: 'Designed for doctors, dentists, and healthcare professionals. Features appointment booking, service listings, and patient testimonials.',
  conversionRate: '22-30%',
  preview: {
    desktop: '/template-previews/clinic-desktop.jpg',
    mobile: '/template-previews/clinic-mobile.jpg',
    thumbnail: '/template-previews/clinic-thumb.jpg',
  },
  themes: createThemes('clinic'),
  sections: [
    {
      id: 'hero',
      type: 'hero',
      component: 'ClinicHeroSection',
      editableFields: [
        {
          id: 'headline',
          type: 'text',
          label: 'Main Headline',
          placeholder: 'Trusted Healthcare in Your Community',
          maxLength: 60,
          required: true,
        },
        {
          id: 'subheadline',
          type: 'textarea',
          label: 'Subheadline',
          placeholder: 'Providing compassionate, comprehensive medical care...',
          maxLength: 200,
          required: true,
        },
        {
          id: 'ctaText',
          type: 'text',
          label: 'Call to Action Button',
          placeholder: 'Book Appointment',
          maxLength: 25,
          required: true,
        },
        {
          id: 'backgroundImage',
          type: 'image',
          label: 'Background Image',
          required: true,
          config: { dimensions: '1920x1080', aspectRatio: '16:9' },
        },
      ],
      required: true,
      order: 1,
    },
    {
      id: 'doctor',
      type: 'about',
      component: 'DoctorProfileSection',
      editableFields: [
        {
          id: 'doctorName',
          type: 'text',
          label: 'Doctor Name',
          placeholder: 'Dr. Rajesh Kumar',
          maxLength: 50,
          required: true,
        },
        {
          id: 'specialization',
          type: 'text',
          label: 'Specialization',
          placeholder: 'General Medicine, MBBS, MD',
          maxLength: 100,
          required: true,
        },
        {
          id: 'experience',
          type: 'text',
          label: 'Years of Experience',
          placeholder: '15+ years',
          maxLength: 20,
          required: true,
        },
        {
          id: 'bio',
          type: 'textarea',
          label: 'Biography',
          placeholder: 'Dr. Kumar has been serving the community for over 15 years...',
          maxLength: 500,
          required: true,
        },
        {
          id: 'doctorImage',
          type: 'image',
          label: 'Doctor Photo',
          required: true,
          config: { dimensions: '400x400', aspectRatio: '1:1' },
        },
      ],
      required: true,
      order: 2,
    },
    {
      id: 'services',
      type: 'services',
      component: 'MedicalServicesSection',
      editableFields: [
        {
          id: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          placeholder: 'Our Services',
          maxLength: 50,
          required: true,
        },
        {
          id: 'services',
          type: 'select',
          label: 'Medical Services',
          required: true,
          config: {
            multiple: true,
            options: [
              { value: 'general', label: 'General Consultation' },
              { value: 'preventive', label: 'Preventive Care' },
              { value: 'chronic', label: 'Chronic Disease Management' },
              { value: 'pediatric', label: 'Pediatric Care' },
              { value: 'women', label: 'Women\'s Health' },
              { value: 'elderly', label: 'Elderly Care' },
            ],
          },
        },
      ],
      required: true,
      order: 3,
    },
  ],
  defaultContent: {
    headline: 'Trusted Healthcare in Your Community',
    subheadline: 'Providing compassionate, comprehensive medical care with a focus on prevention and wellness for you and your family.',
    ctaText: 'Book Appointment',
    backgroundImage: '/stock-images/clinic-hero.jpg',
    doctorName: 'Dr. Rajesh Kumar',
    specialization: 'General Medicine, MBBS, MD',
    experience: '15+ years',
    bio: 'Dr. Kumar has been serving the community for over 15 years, providing compassionate and comprehensive medical care to patients of all ages.',
    doctorImage: '/stock-images/doctor-profile.jpg',
    sectionTitle: 'Our Services',
    services: ['general', 'preventive', 'chronic'],
  },
  seoConfig: {
    title: 'Medical Clinic - Trusted Healthcare | {{businessName}}',
    description: 'Comprehensive medical care with experienced doctors. Book your appointment today for quality healthcare services.',
    keywords: ['medical clinic', 'doctor', 'healthcare', 'appointment', 'consultation'],
    ogImage: '/template-previews/clinic-og.jpg',
  },
  performanceScore: 98,
  popularity: 0,
  tags: ['healthcare', 'medical', 'clinic', 'doctor', 'appointment'],
};

// Export all templates for seeding
export const allTemplates = [
  yogaStudioTemplate,
  medicalClinicTemplate,
  // Add more templates as you create them
];

// Function to seed the database
export const seedTemplateDatabase = async () => {
  try {
    Logger.info('Starting template database seeding');

    for (const template of allTemplates) {
      const result = await TemplateService.createTemplate(template);
      if (result.success) {
        Logger.info(`Template "${template.name}" seeded successfully`);
      } else {
        Logger.error(`Failed to seed template "${template.name}"`, result.error);
      }
    }

    Logger.info('Template database seeding completed');
  } catch (error) {
    Logger.error('Error seeding template database', error);
  }
};
