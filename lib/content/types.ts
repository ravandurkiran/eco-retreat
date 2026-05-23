export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "links"; title?: string; items: { text: string; href: string }[] };

export type PageContent = {
  kicker?: string;
  title: string;
  intro: string;
  blocks: ContentBlock[];
};

export type ProgramContent = PageContent & {
  slug: string;
  label: string;
  priceInr?: number;
  bookable: boolean;
};
