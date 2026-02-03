import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Bootstrapping the Angular application
bootstrapApplication(App, appConfig)
  .catch(error => {
    console.error('Application bootstrap failed:', error);
  });
