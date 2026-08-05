import type { Project } from "./types";

export interface ProjectDataProvider {
  getProjectByToken(token: string): Promise<Project | null>;
}

let _provider: ProjectDataProvider | null = null;

async function resolveProvider(): Promise<ProjectDataProvider> {
  if (_provider) return _provider;

  if (process.env.NODE_ENV === "development") {
    const { DemoProjectProvider } = await import("./demo");
    _provider = new DemoProjectProvider();
    return _provider;
  }

  // Future: swap in Notion provider when credentials are present
  // if (process.env.NOTION_API_KEY && process.env.NOTION_PROJECTS_DATABASE_ID) {
  //   const { NotionProjectProvider } = await import("./notion");
  //   _provider = new NotionProjectProvider();
  //   return _provider;
  // }

  _provider = { getProjectByToken: async () => null };
  return _provider;
}

/**
 * Server-side only. Retrieves a project by its secret token.
 * Returns null for unknown, expired, or inactive tokens.
 * Never call this from client components.
 */
export async function getProjectByToken(
  token: string,
): Promise<Project | null> {
  const provider = await resolveProvider();
  const project = await provider.getProjectByToken(token);
  if (!project || !project.active) return null;
  return project;
}
