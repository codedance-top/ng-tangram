
export function transformAxis(name: string, axis: 'x' | 'y', letter: string) {
  return axis === 'x'
    ? `${name}(${letter}, 0, 0)`
    : `${name}(0, ${letter}, 0)`;
}

export function translate3d(axis: 'x' | 'y', letter: string) {
  return transformAxis('translate3d', axis, letter);
}

export const DEFAULT_TIMING = .5;
