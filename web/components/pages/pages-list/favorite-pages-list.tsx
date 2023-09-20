import { useRouter } from "next/router";

import useSWR from "swr";

// services
import pagesService from "services/page.service";
// components
import { PagesView } from "components/pages";
// types
import { TPagesListProps } from "./types";
// fetch-keys
import { FAVORITE_PAGES_LIST } from "constants/fetch-keys";

export const FavoritePagesList: React.FC<TPagesListProps> = ({ viewType }) => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const { data: pages } = useSWR(
    workspaceSlug && projectId ? FAVORITE_PAGES_LIST(projectId as string) : null,
    workspaceSlug && projectId
      ? () => pagesService.getPagesWithParams(workspaceSlug as string, projectId as string, "favorite")
      : null
  );

  return <PagesView pages={pages} viewType={viewType} />;
};
