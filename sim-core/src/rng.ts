export interface RandomStream {
  next(): number;
}

function xorshift32(seed: number): RandomStream {
  let x = seed | 0;
  if (x === 0) x = 0x9e3779b9;
  return {
    next(): number {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return ((x >>> 0) % 1_000_000) / 1_000_000;
    },
  };
}

function hashSeed(base: number, namespace: string): number {
  let h = base | 0;
  for (let i = 0; i < namespace.length; i += 1) {
    h = (h * 31 + namespace.charCodeAt(i)) | 0;
  }
  return h;
}

export interface RngPartition {
  material: RandomStream;
  hazard: RandomStream;
  institution: RandomStream;
  reports: RandomStream;
  frontier: RandomStream;
}

export function createRngPartition(seed: number): RngPartition {
  return {
    material: xorshift32(hashSeed(seed, "material")),
    hazard: xorshift32(hashSeed(seed, "hazard")),
    institution: xorshift32(hashSeed(seed, "institution")),
    reports: xorshift32(hashSeed(seed, "reports")),
    frontier: xorshift32(hashSeed(seed, "frontier")),
  };
}

