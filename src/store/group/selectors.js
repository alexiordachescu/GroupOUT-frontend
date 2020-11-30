export const selectGroups = (state) => state.groupReducer.groups;

export const selectGroupsWithFilters = (filters) => (state) => {
  const { tags, groupSize } = filters;

  let groups = [...state.groupReducer.groups];

  if (tags) {
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

  if (groupSize) {
    // filter groups by group size
    groups = groups.filter();
  }

  return groups;
};
