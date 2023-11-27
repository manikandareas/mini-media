export const extractTagsFromStatus = (status: string) => {
  return status.match(/#\S+/g);
};
