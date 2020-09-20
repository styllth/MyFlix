import styled from 'styled-components';

type ContainerProps = {
  showContainer: boolean;
};

export const Container = styled.div`
  background: var(--background);
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: var(--bodyPaddingTop);
  left: 0;
  width: 100%;
  box-shadow: 0 5px 4px var(--shadowColor);
  z-index: 100;
  transition: height 1s;
  height: ${({ showContainer }: ContainerProps) =>
    showContainer ? 'calc(100vh - var(--bodyPaddingTop))' : '0'};

  @media (max-width: 800px) {
    height: ${({ showContainer }: ContainerProps) =>
      showContainer ? 'calc(100vh - var(--bodyPaddingTop))' : '0'};
  }
`;

export const ListVideos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const NotFound = styled.div`
  background: var(--blackLighter) url('static/404.png') no-repeat fixed center;
  width: 45rem;
  height: 50rem;
  border-radius: 5rem;

  p {
    color: var(--textNotFound);
    font-size: 3rem;
    margin-top: 3rem;
    text-align: center;
  }
`;
