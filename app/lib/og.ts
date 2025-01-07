import config from "~/config.json";

export const ogImageUrl = (val: number) =>
  `${config.dynamicOgService.baseUrl}?mainText=${config.dynamicOgService.params.mainText}&description=${val}${config.dynamicOgService.params.description}&footerText=${config.dynamicOgService.params.footerText}&style=${config.dynamicOgService.params.style}`;
