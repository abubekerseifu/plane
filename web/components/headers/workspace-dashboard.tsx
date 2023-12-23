import { useState } from "react";
import { LayoutGrid } from "lucide-react";
// images
// components
import { ProductUpdatesModal } from "components/common";
import { Breadcrumbs } from "@plane/ui";

export const WorkspaceDashboardHeader = () => {
  const [isProductUpdatesModalOpen, setIsProductUpdatesModalOpen] = useState(false);
  // theme

  return (
    <>
      <ProductUpdatesModal isOpen={isProductUpdatesModalOpen} setIsOpen={setIsProductUpdatesModalOpen} />
      <div className="relative z-10 flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 border-b border-custom-border-200 bg-custom-sidebar-background-100 p-4">
        <div className="flex items-center gap-2 overflow-ellipsis whitespace-nowrap">
          <div>
            <Breadcrumbs>
              <Breadcrumbs.BreadcrumbItem
                type="text"
                icon={<LayoutGrid className="h-4 w-4 text-custom-text-300" />}
                label="Dashboard"
              />
            </Breadcrumbs>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3"/>
      </div>
    </>
  );
};
