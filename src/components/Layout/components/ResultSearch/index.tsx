import Loading from 'components/Loading';
import VideoCard from 'components/VideoCard';

import { VideoProps } from 'interfaces';

import { Container, ListVideos, NotFound } from './styles';

type ResultSearchProps = {
  result: boolean;
  loading: boolean;
  videos: Array<VideoProps>;
};

const ResultSearch: React.FC<ResultSearchProps> = ({
  result,
  loading,
  videos,
}) => (
  <Container showContainer={result}>
    {result && (
      <>
        {loading && <Loading />}
        <ListVideos>
          {videos.length === 0 ? (
            <NotFound>
              <p>Nenhum vídeo encontrado</p>
            </NotFound>
          ) : (
            <>
              {videos.map((video: VideoProps) => (
                <VideoCard
                  key={video.id}
                  videoTitle={video.title}
                  videoURL={video.url}
                  preview
                />
              ))}
            </>
          )}
        </ListVideos>
      </>
    )}
  </Container>
);

export default ResultSearch;
