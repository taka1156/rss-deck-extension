import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/theme.css';
import DemoArticle from './DemoArticle';
import './demo-article.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Demo article page root element was not found');

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <DemoArticle />
  </StrictMode>,
);
