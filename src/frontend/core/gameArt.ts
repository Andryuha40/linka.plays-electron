import { resolvePublicAssetUrl } from "./publicAsset";

// Game-specific pictures live under images/<game>/<item>.png. They sit next to
// the shared word pictures instead of replacing them: images/words/<id>.png is
// shown by every game that uses the word, so redrawing it for one game would
// change all the others too.
export function gameArtSrc(artId: string, base?: string, locationHref?: string) {
  const path = artId.split("/").map(encodeURIComponent).join("/");
  return resolvePublicAssetUrl(`images/${path}.png`, base, locationHref);
}
