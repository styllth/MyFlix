import { getYouTubeId } from '../../helpers';
import { VideoCardContainer } from './styles';

type VideoCardProps = {
  videoTitle: string;
  videoURL: string;
  highlight?: boolean;
  preview?: boolean;
};

const VideoCard: React.FC<VideoCardProps> = ({
  videoTitle,
  videoURL,
  highlight,
  preview,
}) => {
  const image = `https://img.youtube.com/vi/${getYouTubeId(
    videoURL,
  )}/hqdefault.jpg`;
  return (
    <VideoCardContainer
      url={image}
      href={videoURL}
      target="_blank"
      preview={preview}
      title={videoTitle}
      className={highlight ? 'highlight' : ''}
    />
  );
};

export default VideoCard;
