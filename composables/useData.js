export const useData = () => {
  const config = useRuntimeConfig();
  const isDev = config.public.NODE_ENV == "development";

  return useState("data", () => ({
    isDev,
    isTablet: false,
    isMobile: false,
    activeTeam: { name: "Default team" },
  }));
};
