export const convertDomainFromUrl = (url: string) => {
  try {
    if (!url) return null;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace(/^www\./, "");
  } catch (error) {
    return null;
  }
};
