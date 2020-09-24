import { VideoContainer, ResponsiveIframe } from './styles';

interface YouTubeIframeResponsiveProps {
  titleIframe: string;
  youtubeID: string;
}

const YouTubeIframeResponsive: React.FC<YouTubeIframeResponsiveProps> = ({
  titleIframe,
  youtubeID,
}) => {
  return (
    <VideoContainer>
      <ResponsiveIframe
        title={`${titleIframe}`}
        src={`https://www.youtube.com/embed/${youtubeID}?autoplay=0&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoContainer>
  );
};

export default YouTubeIframeResponsive;
