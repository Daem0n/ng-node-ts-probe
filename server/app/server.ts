import {Application} from './app';

const app = new Application();
Application.Current = app;
app.start();
