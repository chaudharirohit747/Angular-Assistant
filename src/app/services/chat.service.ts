import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly API_URL = 'YOUR_API_ENDPOINT';

  constructor(private http: HttpClient) {}

  async getAnswer(question: string): Promise<string> {
    try {
      const mockResponses: { [key: string]: { keywords: string[], answer: string } } = {
        // Core Concepts
        'angular': {
          keywords: ['what is angular', 'angular framework', 'about angular', 'learn angular'],
          answer: 'Angular is a powerful TypeScript-based web application framework developed by Google. It provides features like:\n1. Component-based architecture\n2. Two-way data binding\n3. Dependency injection\n4. Comprehensive template system\n5. Rich ecosystem of tools and libraries'
        },
        'typescript': {
          keywords: ['typescript', 'ts', 'type', 'typing'],
          answer: 'TypeScript is a superset of JavaScript that adds static typing. Key features:\n1. Type annotations\n2. Interfaces and classes\n3. Generics\n4. Decorators used in Angular\n5. Enhanced IDE support'
        },

        // Installation & Setup
        'install': {
          keywords: ['install', 'setup', 'start', 'begin', 'how to install', 'installation'],
          answer: 'To install Angular, follow these steps:\n1. Install Node.js from nodejs.org\n2. Install Angular CLI: npm install -g @angular/cli\n3. Create new project: ng new my-app\n4. Run project: ng serve'
        },
        'version': {
          keywords: ['version', 'update', 'upgrade', 'latest'],
          answer: 'Check Angular versions:\n1. Angular version: ng version\n2. Node.js version: node -v\n3. npm version: npm -v\n4. Update Angular: ng update @angular/core @angular/cli\n5. Update dependencies: npm update'
        },

        // Components & Templates
        'component': {
          keywords: ['component', 'components', 'create component', 'how to create component'],
          answer: 'Components are the fundamental building blocks of Angular applications. A component consists of:\n1. TypeScript class (@Component decorator)\n2. HTML template\n3. CSS styles\n4. Lifecycle hooks\n5. Input/Output properties\n\nCreate using: ng generate component my-component'
        },
        'template': {
          keywords: ['template', 'html', 'view', 'template syntax'],
          answer: 'Angular templates support:\n1. Data binding syntax\n2. Template expressions\n3. Template statements\n4. Template variables\n5. Template reference variables (#var)'
        },

        // Services & DI
        'service': {
          keywords: ['service', 'services', 'create service', 'how to use service'],
          answer: 'Services in Angular are classes that can be shared across components to handle:\n1. Data management\n2. Business logic\n3. External interactions\n4. State management\n5. Reusable functionality'
        },
        'dependency': {
          keywords: ['dependency', 'injection', 'di', 'inject', 'provider'],
          answer: 'Dependency Injection (DI) in Angular:\n1. Register provider in module/component\n2. Inject in constructor\n3. Hierarchical injection system\n4. Provider scope\n5. Custom injection tokens'
        },

        // Forms & Validation
        'form': {
          keywords: ['form', 'forms', 'how to create form', 'form validation'],
          answer: 'Angular provides two form approaches:\n1. Template-driven forms: Simple, [(ngModel)]\n2. Reactive forms: More control, FormGroup\n3. Form validation\n4. Custom validators\n5. Form arrays and groups'
        },
        'validation': {
          keywords: ['validate', 'validation', 'validator', 'form validation'],
          answer: 'Form validation features:\n1. Built-in validators\n2. Custom validators\n3. Async validators\n4. Cross-field validation\n5. Error handling & display'
        },

        // Routing & Navigation
        'routing': {
          keywords: ['route', 'routing', 'router', 'navigation', 'how to add routing'],
          answer: 'Angular Router features:\n1. Path-based routing\n2. Child routes\n3. Route parameters\n4. Route guards\n5. Lazy loading'
        },
        'navigation': {
          keywords: ['navigate', 'navigation', 'link', 'router link'],
          answer: 'Navigation methods:\n1. routerLink directive\n2. Router.navigate()\n3. Router.navigateByUrl()\n4. Navigation extras\n5. Location service'
        },

        // State Management
        'state': {
          keywords: ['state', 'management', 'store', 'data management'],
          answer: 'State management options:\n1. Services with BehaviorSubject\n2. NgRx store\n3. Akita\n4. NGXS\n5. Local/Session storage'
        },
        'ngrx': {
          keywords: ['ngrx', 'store', 'redux', 'state management'],
          answer: 'NgRx features:\n1. Store for state\n2. Actions for events\n3. Reducers for state changes\n4. Effects for side effects\n5. Selectors for state queries'
        },

        // HTTP & APIs
        'http': {
          keywords: ['http', 'api', 'rest', 'ajax', 'how to make api calls'],
          answer: 'HttpClient features:\n1. GET/POST/PUT/DELETE methods\n2. Request/Response interceptors\n3. Error handling\n4. Progress events\n5. JSONP support'
        },
        'api': {
          keywords: ['api', 'rest', 'backend', 'server'],
          answer: 'API integration best practices:\n1. Service abstraction\n2. Error handling\n3. Retry logic\n4. Caching\n5. Authentication headers'
        },

        // Security
        'security': {
          keywords: ['secure', 'security', 'protect', 'safe', 'how to secure', 'make secure'],
          answer: 'Angular security best practices:\n1. XSS protection using built-in sanitization\n2. CSRF protection with HTTP interceptors\n3. Content Security Policy implementation\n4. Safe navigation operator usage\n5. Input validation and sanitization\n6. Secure authentication with JWT/OAuth\n7. Route guards for protected routes\n8. HTTPS enforcement\n9. Regular dependency updates\n10. Security headers configuration'
        },
        'authentication': {
          keywords: ['auth', 'login', 'jwt', 'oauth', 'how to add authentication'],
          answer: 'Authentication methods in Angular:\n1. JWT tokens for stateless auth\n2. OAuth/OpenID Connect integration\n3. Session-based authentication\n4. Route guards for protected routes\n5. HTTP interceptors for auth headers'
        },

        // Testing
        'testing': {
          keywords: ['test', 'testing', 'unit test', 'e2e', 'how to test'],
          answer: 'Angular testing types:\n1. Unit testing with Jasmine\n2. Integration testing\n3. E2E testing with Protractor/Cypress\n4. Component testing\n5. Service testing'
        },
        'unit': {
          keywords: ['unit test', 'jasmine', 'karma'],
          answer: 'Unit testing components:\n1. TestBed configuration\n2. Component creation\n3. Template binding tests\n4. Service mocking\n5. Async testing'
        },

        // Performance
        'performance': {
          keywords: ['performance', 'optimize', 'speed', 'fast', 'how to improve performance'],
          answer: 'Performance optimization:\n1. Change detection strategy\n2. Lazy loading\n3. Pure pipes\n4. TrackBy function\n5. Web workers\n6. Bundle size optimization\n7. Tree shaking\n8. Ahead-of-Time compilation\n9. Server-side rendering\n10. Progressive web apps'
        },

        // Deployment
        'deployment': {
          keywords: ['deploy', 'deployment', 'publish', 'how to deploy'],
          answer: 'Deployment steps:\n1. Production build (ng build --prod)\n2. Environment configuration\n3. Server setup\n4. CI/CD pipeline\n5. Monitoring setup'
        },

        // Libraries
        'material': {
          keywords: ['material', 'ui', 'components', 'angular material'],
          answer: 'Angular Material features:\n1. UI components\n2. Theming system\n3. Accessibility\n4. Responsive layouts\n5. CDK utilities'
        },
        'rxjs': {
          keywords: ['rxjs', 'observable', 'subject', 'async'],
          answer: 'RxJS in Angular:\n1. Observables\n2. Operators\n3. Subjects\n4. Error handling\n5. Subscription management'
        }
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      const lowerQuestion = question.toLowerCase();
      
      // Try to find a match using keywords
      for (const [_, value] of Object.entries(mockResponses)) {
        if (value.keywords.some(keyword => lowerQuestion.includes(keyword))) {
          return value.answer;
        }
      }

      // If no match found, provide a helpful response
      return "I can help you with Angular topics like:\n- Components and Services\n- Forms and Validation\n- Routing and Navigation\n- State Management\n- Security and Authentication\n- Performance and Testing\n\nTry asking questions like:\n- 'How to create a component?'\n- 'How to secure Angular apps?'\n- 'How to add authentication?'";
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }
}
