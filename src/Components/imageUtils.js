const AIRBNB_IMAGE_WIDTH_PARAM = /([?&])im_w=\d+/;

export function imageWithWidth(url, width) {
  if (typeof url !== "string" || !url) {
    return url;
  }

  if (AIRBNB_IMAGE_WIDTH_PARAM.test(url)) {
    return url.replace(AIRBNB_IMAGE_WIDTH_PARAM, `$1im_w=${width}`);
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}im_w=${width}`;
}

export function imageSrcSet(url, widths = [320, 480, 720]) {
  if (typeof url !== "string" || !url) {
    return undefined;
  }

  return widths.map((width) => `${imageWithWidth(url, width)} ${width}w`).join(", ");
}
