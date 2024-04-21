export type CardProps = {
  id: string;
  title: string;
  repeatLevel: number;
  type: 'word' | 'image';
  description?: string;
  image?: string;
};
