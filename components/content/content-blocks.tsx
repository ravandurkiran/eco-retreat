import Link from "next/link";
import type { ContentBlock } from "@/lib/content/types";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-eco space-y-6 text-foreground/90">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed">
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="font-serif text-2xl font-semibold text-forest">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <div key={i}>
                {block.title ? (
                  <h3 className="mb-3 font-serif text-xl font-semibold text-forest">{block.title}</h3>
                ) : null}
                <ul className="list-disc space-y-2 pl-6">
                  {block.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "links":
            return (
              <div key={i}>
                {block.title ? (
                  <h3 className="mb-3 font-serif text-xl font-semibold text-forest">{block.title}</h3>
                ) : null}
                <ul className="flex flex-col gap-2">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="font-medium text-forest underline hover:no-underline">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
