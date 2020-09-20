import axios from 'axios';
import useSWR from 'swr';

export function useFetchSWR<Data = any, Error = any>(url: string): any {
  const { data, error, mutate } = useSWR<Data, Error>(url, async axiosUrl => {
    const response = await axios.get(axiosUrl);

    return response.data;
  });

  return { data, error, mutate };
}
