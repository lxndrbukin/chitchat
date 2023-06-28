import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app: any) {
  app.use(
    ['/_api', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};