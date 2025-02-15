export const TILETYPES = { TRANSPORT: 'TRANSPORT', NPC: 'NPC', ITEM: 'ITEM', COLLISION: 'COLLISION' };
export const INPUT = { W: 'KeyW', S: 'KeyS', A: 'KeyA', D: 'KeyD', Space: 'Space' };

export const LOCATIONS = {
  TOWN: 'PALLET_TOWN',
  PLAYER_1F: 'PLAYER_HOUSE_1F',
  PLAYER_2F: 'PLAYER_HOUSE_2F',
  RIVAL: 'RIVAL_HOUSE',
  LAB: 'LAB',
};

export function collision(src, target) {
  return (
    src.position.x + src.width >= target.position.x &&
    src.position.x <= target.position.x + target.width &&
    src.position.y <= target.position.y + target.height &&
    src.position.y + src.height >= target.position.y
  );
}

export const fade = (canvasCtx, direction) => {
  let alpha = 0.0;
  let delta = 0.0;

  if (direction == 'IN') {
    alpha = 0.0;
    delta = 0.1;
  }
  if (direction == 'OUT') {
    alpha = 1.0;
    delta = -0.1;
  }

  if (canvasCtx) {
    let intervalRef = setInterval(() => {
      alpha += delta;
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      canvasCtx.globalAlpha = alpha;
      canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      if (alpha >= 1 || alpha <= 0) clearInterval(intervalRef);
    }, 30);
  }
};

export const log = (prefix, message) => {
  console.log(`${prefix} - ${message}`);
};
