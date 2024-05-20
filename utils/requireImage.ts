const glob = import.meta.glob('~/assets/image/**', {
  eager: true
});
const images = Object.fromEntries(Object.entries(glob).map(([key, value]: any) => [key, value.default]));

export default (path: string) => images[`/assets/image/${path}`];
