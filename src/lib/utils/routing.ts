// See: routify's helpers: https://github.com/roxiness/routify/blob/9a1b7f5f8fc950a344cf20f7cbaa760593ded8fb/runtime/helpers.js#L244-L268
export function url(currentUrl: URL, path: string) {
  // console.log({ $page, path });

  if (path == null) {
    return path;
  } else if (path.match(/^\.\.?\//)) {
    // Relative path (starts wtih `./` or `../`)
    // console.log('relative path');
    let [, breadcrumbs, relativePath] = path.match(/^([\.\/]+)(.*)/) as string[];
    let dir = currentUrl.pathname.replace(/\/$/, '');
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

export function isActive(currentUrl: URL, path: string) {
  if (path === '/') {
    // home must be direct match (otherwise matches all)
    return currentUrl.pathname === path;
  } else {
    // Matches full path next character is `/`
    return currentUrl.pathname.match(path + '($|\\/)') != null;
  }
}
