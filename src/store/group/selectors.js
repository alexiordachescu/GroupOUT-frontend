export const selectGroups = (state) => state.groupReducer.groups;

export const selectGroupsWithFilters = (filters) => (state) => {
  const { tags, groupSize } = filters;

  let groups = [...state.groupReducer.groups];

  console.log("WHAT IS TAGS", tags);
  console.log("WHAT IS GROUPSIZE", groupSize);

  if (tags && tags.length > 0) {
    groups = groups.filter((group) => {
      let doesGroupHaveOneOfSelectedTags = false;
      const groupTagNames = group.tags.map((t) => t.name);
      tags.forEach((selectedTag) => {
        if (groupTagNames.includes(selectedTag)) {
          doesGroupHaveOneOfSelectedTags = true;
        }
      });
      return doesGroupHaveOneOfSelectedTags;
    });
  }

  if (groupSize && groupSize.length > 0) {
    groups = groups.filter((group) => {
      let doesGroupHaveRequestedSize = false;
      groupSize.forEach((input) => {
        if (group.maxUsers >= input) {
          doesGroupHaveRequestedSize = true;
        }
      });
      return doesGroupHaveRequestedSize;
    });
  }

  return groups;
};
