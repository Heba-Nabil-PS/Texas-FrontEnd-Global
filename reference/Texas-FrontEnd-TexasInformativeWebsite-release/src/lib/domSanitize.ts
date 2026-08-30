import DOMPurify from "isomorphic-dompurify";

export const domSanitize = (value: string) => {
  if (!value?.trim()) return "";

  return DOMPurify.sanitize(value?.trim(), { ADD_ATTR: ["target"] });
};
