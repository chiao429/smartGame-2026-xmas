const TEAM_TOKEN_IMAGES: Record<string, string> = {
  "/teams/snow-wolf.jpg": "/teams/snow-wolf-cutout.png",
  "/teams/cheetah.jpg": "/teams/cheetah-cutout.png",
};

const TEAM_IDLE_SPRITES: Record<string, string> = {
  "/teams/snow-wolf.jpg": "/teams/snow-wolf-idle-sheet.png",
  "/teams/cheetah.jpg": "/teams/cheetah-idle-sheet.png",
};

export const getTeamTokenImage = (image?: string) => image ? TEAM_TOKEN_IMAGES[image] ?? image : null;
export const getTeamIdleSpriteImage = (image?: string) => image ? TEAM_IDLE_SPRITES[image] ?? null : null;
