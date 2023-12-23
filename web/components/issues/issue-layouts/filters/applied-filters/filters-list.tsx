import { observer } from "mobx-react-lite";
import { useMobxStore } from "lib/mobx/store-provider";
// components
import {
  AppliedDateFilters,
  AppliedLabelsFilters,
  AppliedMembersFilters,
  AppliedPriorityFilters,
  AppliedProjectFilters,
  AppliedStateFilters,
  AppliedStateGroupFilters,
} from "components/issues";
// icons
import { X } from "lucide-react";
// helpers
import { replaceUnderscoreIfSnakeCase } from "helpers/string.helper";
// types
import {ICycle, IIssueFilterOptions, IIssueLabel, IProject, IState, IUserLite } from "types";
// constants
import { EUserWorkspaceRoles } from "constants/workspace";
import { AppliedCycleFilters } from "./cycle";

type Props = {
  appliedFilters: IIssueFilterOptions;
  handleClearAllFilters: () => void;
  handleRemoveFilter: (key: keyof IIssueFilterOptions, value: string | null) => void;
  labels?: IIssueLabel[] | undefined;
  members?: IUserLite[] | undefined;
  projects?: IProject[] | undefined;
  states?: IState[] | undefined;
  cycles?: ICycle[] | undefined;
};

const membersFilters = ["assignees", "mentions", "created_by", "subscriber"];
const dateFilters = ["start_date", "target_date"];

export const AppliedFiltersList: React.FC<Props> = observer((props) => {
  const { appliedFilters, handleClearAllFilters, handleRemoveFilter, labels, members, projects, states, cycles } = props;

  const {
    user: { currentProjectRole },
  } = useMobxStore();

  if (!appliedFilters) return null;

  if (Object.keys(appliedFilters).length === 0) return null;

  const isEditingAllowed = currentProjectRole && currentProjectRole >= EUserWorkspaceRoles.MEMBER;

  return (
    <div className="flex flex-wrap items-stretch gap-2 bg-custom-background-100">
      {Object.entries(appliedFilters).map(([key, value]) => {
        const filterKey = key as keyof IIssueFilterOptions;

        if (!value) return;

        return (
          <div
            key={filterKey}
            className="flex flex-wrap items-center gap-2 rounded-md border border-custom-border-200 px-2 py-1 capitalize"
          >
            <span className="text-xs text-custom-text-300">{replaceUnderscoreIfSnakeCase(filterKey)}</span>
            <div className="flex flex-wrap items-center gap-1">
              {membersFilters.includes(filterKey) && (
                <AppliedMembersFilters
                  editable={isEditingAllowed}
                  handleRemove={(val) => handleRemoveFilter(filterKey, val)}
                  members={members}
                  values={value}
                />
              )}
              {dateFilters.includes(filterKey) && (
                <AppliedDateFilters handleRemove={(val) => handleRemoveFilter(filterKey, val)} values={value} />
              )}
              {filterKey === "labels" && (
                <AppliedLabelsFilters
                  editable={isEditingAllowed}
                  handleRemove={(val) => handleRemoveFilter("labels", val)}
                  labels={labels}
                  values={value}
                />
              )}
              {filterKey === "priority" && (
                <AppliedPriorityFilters
                  editable={isEditingAllowed}
                  handleRemove={(val) => handleRemoveFilter("priority", val)}
                  values={value}
                />
              )}
              {filterKey === "state" && states && (
                <AppliedStateFilters
                  editable={isEditingAllowed}
                  handleRemove={(val) => handleRemoveFilter("state", val)}
                  states={states}
                  values={value}
                />
              )}
              {filterKey === "state_group" && (
                <AppliedStateGroupFilters
                  handleRemove={(val) => handleRemoveFilter("state_group", val)}
                  values={value}
                />
              )}
              {filterKey === "project" && (
                <AppliedProjectFilters
                  editable={isEditingAllowed}
                  handleRemove={(val) => handleRemoveFilter("project", val)}
                  projects={projects}
                  values={value}
                />
              )}
               {filterKey === "cycle" && (
                <AppliedCycleFilters
                  handleRemove={(val) => handleRemoveFilter("cycle", val)}
                  cycles={cycles}
                  values={value}
                />
              )}
              {isEditingAllowed && (
                <button
                  type="button"
                  className="grid place-items-center text-custom-text-300 hover:text-custom-text-200"
                  onClick={() => handleRemoveFilter(filterKey, null)}
                >
                  <X size={12} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        );
      })}
      {isEditingAllowed && (
        <button
          type="button"
          onClick={handleClearAllFilters}
          className="flex items-center gap-2 rounded-md border border-custom-border-200 px-2 py-1 text-xs text-custom-text-300 hover:text-custom-text-200"
        >
          Clear all
          <X size={12} strokeWidth={2} />
        </button>
      )}
    </div>
  );
});
