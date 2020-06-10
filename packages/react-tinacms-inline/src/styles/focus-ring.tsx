/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import styled, { css } from 'styled-components'

export interface FocusRingStyleProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}

interface FocusRingProps extends FocusRingStyleProps {
  active: boolean
  disableHover?: boolean
}

export const FocusRing = styled.div<FocusRingProps>(p => {
  const offset = getOffset(p.offset)

  return css`
    position: relative;
    width: 100%;

    ${!p.disableHover &&
      css`
        &:hover {
          &:after {
            opacity: 0.3;
          }
        }
      `}

    &:after {
      content: '';
      box-sizing: border-box;
      display: block;
      position: absolute;
      left: calc(-1 * ${typeof offset === 'object' ? offset.x : offset}px);
      top: calc(-1 * ${typeof offset === 'object' ? offset.y : offset}px);
      width: calc(
        100% +
          ${typeof offset === 'object'
            ? offset.x * 2
            : typeof offset === 'number' && offset * 2}px
      );
      height: calc(
        100% +
          ${typeof offset === 'object'
            ? offset.y * 2
            : typeof offset === 'number' && offset * 2}px
      );
      border: 1px solid var(--tina-color-primary);
      border-radius: ${p.borderRadius !== undefined ? p.borderRadius : `10`}px;
      opacity: 0;
      pointer-events: none;
      transition: all var(--tina-timing-medium) ease-out;
      box-shadow: var(--tina-shadow-big);
    }

    ${p.active &&
      css`
        &:hover:after,
        &:after {
          opacity: 1;
        }
      `};
  `
})

export function getOffset(
  offset: number | undefined | { x: number; y: number }
): number | { x: number; y: number } {
  const fallback: number = 16
  let result: number | { x: number; y: number } = fallback
  const axis = { x: fallback, y: fallback }

  if (typeof offset === 'number') {
    result = offset
  } else if (typeof offset === 'object') {
    axis.x = offset.x
    axis.y = offset.y
    result = axis
  }

  return result
}
