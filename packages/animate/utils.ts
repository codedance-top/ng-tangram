// export function transformAxis(axis: 'x' | 'y', name: string) {
//   return function (letter: string): string {
//     return axis === 'x'
//       ? `${name}({{ ${letter} }}, 0, 0)`
//       : `${name}(0, {{ ${letter} }}, 0)`;
//   };
// }

export function translate3d(axis: 'x' | 'y', letter: string) {
  return axis === 'x'
    ? `translate3d(${letter}, 0, 0)`
    : `translate3d(0,${letter}, 0)`;
}

export const DEFAULT_TIMING = .5;
