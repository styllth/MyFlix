import { getYouTubeId } from '../../helpers';
import VideoIframeResponsive from './components/VideoIframeResponsive';
import {
  BannerMainContainer,
  ContentAreaContainer,
  WatchButton,
} from './styles';

interface BannerMainProps {
  videoTitle: string;
  videoDescription: string;
  url: string;
}

const BannerMain: React.FC<BannerMainProps> = ({
  videoTitle,
  videoDescription,
  url,
}) => {
  const youTubeID = getYouTubeId(url);
  const bgUrl = `https://img.youtube.com/vi/${youTubeID}/maxresdefault.jpg`;

  return (
    <BannerMainContainer backgroundImage={bgUrl}>
      <ContentAreaContainer>
        <ContentAreaContainer.Item>
          <ContentAreaContainer.Title>{videoTitle}</ContentAreaContainer.Title>

          <ContentAreaContainer.Description>
            {videoDescription}
          </ContentAreaContainer.Description>
        </ContentAreaContainer.Item>

        <ContentAreaContainer.Item>
          <VideoIframeResponsive
            titleIframe={videoTitle}
            youtubeID={youTubeID}
          />
          <WatchButton>Assistir</WatchButton>
        </ContentAreaContainer.Item>
      </ContentAreaContainer>
    </BannerMainContainer>
  );
};

export default BannerMain;
