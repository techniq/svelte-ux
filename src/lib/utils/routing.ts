import { derived, get } from 'svelte/store';

import { page as pageStore } from '$app/stores';
// import { goto as gotoApp } from '$app/navigation';

// See: routify's helpers: https://github.com/roxiness/routify/blob/9a1b7f5f8fc950a344cf20f7cbaa760593ded8fb/runtime/helpers.js#L244-L268
export function url(path: string, page?: any) {
  const pageValue = page ?? get(pageStore);

  // console.log({ $page, path });

  if (path == null) {
    return path;
  } else if (path.match(/^\.\.?\//)) {
    // Relative path (starts wtih `./` or `../`)
    // console.log('relative path');
    let [, breadcrumbs, relativePath] = path.match(/^([\.\/]+)(.*)/);
    let dir = pageValue.path.replace(/\/$/, '');
    // console.log({ dir, breadcrumbs, relativePath });
    const traverse = breadcrumbs.match(/\.\.\//g) || [];
    // if this is a page, we want to traverse one step back to its folder
    // if (component.isPage) traverse.push(null)
    traverse.forEach(() => (dir = dir.replace(/\/[^\/]+\/?$/, '')));
    path = `${dir}/${relativePath}`.replace(/\/$/, '');
    path = path || '/'; // empty means root
    // console.groupEnd();
  } else if (path.match(/^\//)) {
    // Absolute path (starts with `/`)
    // console.log('absoute path');
    return path;
  } else {
    // Unknown (no named path)
    return path;
  }

  // console.log({ path });
  return path;
}

// export function goto(path: string, page?: any) {
//   const newPath = url(path, page);
//   // console.log('goto', { path, newPath });
//   return gotoApp(newPath);
// }

export const isActive = {
  subscribe(listener) {
    return derived(
      pageStore,
      ($page) =>
        function isActive(path: string) {
          // console.log({ $page, path });

          if (path === '/') {
            // home must be direct match (otherwise matches all)
            return $page.url.pathname === path;
          } else {
            return $page.url.pathname.startsWith(path);
          }

          // TODO: Support parent routes, likely somehting like routify...
          // path = url(path, null, { strict });
          // const currentPath = url(page.path, null, { strict });
          // const re = new RegExp('^' + path + '($|/)');
          // return !!currentPath.match(re);
        }
    ).subscribe(listener);
  },
};
