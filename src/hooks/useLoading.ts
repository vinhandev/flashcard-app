import useZutand from '../store';

export default function useLoading() {
  const loading = useZutand((state) => state.loading);
  const setLoading = useZutand((state) => state.setLoading);
  return { setLoading, loading };
}
