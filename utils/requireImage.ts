export default (path: string) =>
  new URL(`../assets/image/${path}`, import.meta.url).href;
