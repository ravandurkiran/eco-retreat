import Image from "next/image";
import { deleteGalleryImage, uploadGalleryImage } from "@/lib/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Gallery</h1>
      <p className="mt-2 text-sm text-foreground/70">JPEG, PNG, or WebP up to 2 MB. Images appear on the public gallery page.</p>

      <form action={uploadGalleryImage} className="mt-8 max-w-lg space-y-4 rounded-xl border border-sand bg-cream p-6">
        <h2 className="font-serif text-lg text-forest">Upload</h2>
        <label className="block text-sm">
          Image file
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp" required className="mt-1 w-full text-sm" />
        </label>
        <label className="block text-sm">
          Alt text
          <input name="alt" required defaultValue="The Eco Retreat" className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
        </label>
        <button type="submit" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream">
          Upload
        </button>
      </form>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <li key={img.id} className="rounded-xl border border-sand bg-cream p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="300px" />
            </div>
            <p className="mt-2 text-sm text-foreground/80">{img.alt}</p>
            <form action={deleteGalleryImage} className="mt-2">
              <input type="hidden" name="id" value={img.id} />
              <button type="submit" className="text-sm text-red-700 hover:underline">
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>
      {images.length === 0 ? <p className="mt-6 text-sm text-foreground/60">No images yet.</p> : null}
    </div>
  );
}
