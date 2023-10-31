import React from 'react'
import SocialKakao from './SocialKakao'
import styled from "@emotion/styled";
import useHover from 'toolbox/useHover';


// 시각적인 효과를 위해 BOX컴포넌트 사용
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;




 const Test5 = () => {
  const [ref, hover] = useHover();

  return (
    <>
      <SocialKakao />
      <Box ref={ref} />
      {hover ? <div>ToolTip!</div> : null}
        <div class='jb-nav'>text</div>
        <div class='jb-enlargement'></div>

        <div class="jb-title">Lorem ipsum dolor</div>
      <div class="jb-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br/> eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
    </>
  );
};
export default Test5
