import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const getStaticPaths = () => {
  // workaround to allow dynamic creation of cloudflare redirects
  return [{ params: { redirects: "_redirects" } }];
};

export const GET: APIRoute = async () => {
  const projects = await getCollection("projects");
  const redirectsContent = projects
    .filter((project) => project.data.download && project.data.download.link)
    .flatMap((project) => {
      const allPaths = [];
      allPaths.push(`download/${project.id}`);
      if (project.data.paths) {
        allPaths.push(project.data.paths);
      }
      return allPaths.map((path) => `/${path} ${project.data.download!.link} 301`);
    })
    .join("\n");
  return new Response(redirectsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
