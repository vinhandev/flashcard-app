export type CardProps = {
  title: string;
  repeatLevel: 0 | 1;
  type: 'word' | 'image';
  description?: string;
  image?: string;
};
