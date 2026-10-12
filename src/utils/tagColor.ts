import type {TagColor} from '@/setting';

// Color of the first rule whose tag (or a nested tag under it) is in the title, case-insensitive
export const getTagColor = (title: string, tagColors: TagColor[] = []): string | undefined => {
  const tags = (title.match(/#[^\s#]+/g) ?? []).map((tag) => tag.slice(1).toLowerCase());
  return tagColors.find(({tag}) => {
    const name = tag.replace(/^#/, '').toLowerCase();
    return name && tags.some((t) => t === name || t.startsWith(`${name}/`));
  })?.color;
};
