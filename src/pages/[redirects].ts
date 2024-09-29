import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const getStaticPaths = () => {
  // workaround to allow dynamic creation of cloudflare redirects
  return [{ params: { redirects: "_redirects" } }];
};

export const GET: APIRoute = async () => {
  const redirects: string[] = [];

  const projects = (await getCollection("projects")).filter((project) => project.data.download && project.data.download.link);
  redirects.push("\n# project downloads");
  projects
    .map((project) => `/${project.id} ${project.data.download!.link} 303`)
    .flatMap((redirect) => [redirect, `/download${redirect}`])
    .forEach((redirect) => redirects.push(redirect));
  redirects.push("\n# project redirects");
  projects
    .filter((project) => project.data.paths)
    .flatMap((project) => project.data.paths!.map((path) => `/${path} /download/${project.id} 301`))
    .forEach((redirect) => redirects.push(redirect));

  const tools = (await getCollection("tools")).filter((tool) => tool.data.download);
  redirects.push("\n# tool downloads");
  tools
    .map((project) => `/${project.id} ${project.data.download!} 303`)
    .flatMap((redirect) => [redirect, `/download/tool${redirect}`])
    .forEach((redirect) => redirects.push(redirect));
  redirects.push("\n# tool redirects");
  tools
    .filter((project) => project.data.paths)
    .flatMap((project) => project.data.paths!.map((path) => `/${path} /download/tool/${project.id} 301`))
    .forEach((redirect) => redirects.push(redirect));

  return new Response(redirects.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
