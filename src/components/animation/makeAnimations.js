import {keyframes, css} from 'styled-components';

export default ({toggle, timing = '', speed = 200, transformOrigin}) => {
  const makeAnimations = keyframe => css`
    ${transformOrigin && `transform-origin: ${transformOrigin};`}
    animation: ${keyframe} ${speed}ms ${timing};
  `;
  return {
    entering: makeAnimations(keyframes`from { ${toggle}  }`),
    exiting: makeAnimations(keyframes`to { ${toggle}  }`)
  };
};
