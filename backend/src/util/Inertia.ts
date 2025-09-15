import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export function inertia(res: Response, component: string, props: any) {
  const indexHtml = readFileSync(
    join(__dirname, '..', '..', 'public', 'index.html'),
    'utf-8',
  );

  const page = {
    component,
    props,
    url: res.req.originalUrl,
    version: null,
  };

  const html = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="app" data-page='${JSON.stringify(page)}'></div>`,
  );

  res.send(html);
}
