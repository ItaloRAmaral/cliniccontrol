'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  const router = useRouter();
  const { push } = router;
  const handleClick = () => {
    push('/login');
    // console.log(router);
  };
  return (
    <StyledPage>
      <span>future landing page</span>
      <button onClick={() => handleClick()}>login</button>
    </StyledPage>
  );
}
