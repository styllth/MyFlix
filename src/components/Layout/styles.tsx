import styled from 'styled-components';

type MainProps = {
  suppressPadding?: boolean;
};

export const LayoutWrapper = styled.div`
  clip: rect(auto, auto, auto, auto);
`;

export const Main = styled.main`
  background-color: var(--background);
  color: var(--black);
  flex: 1;
  padding: ${({ suppressPadding }: MainProps) =>
    suppressPadding ? '0' : '2rem 5% 0'};

  h1 {
    font-size: 3rem;
    font-weight: 400;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  section:nth-child(2n) {
    background-color: var(--backgroundInput);
  }

  section:nth-child(2n + 1) {
    background-color: var(--background);
  }
`;
