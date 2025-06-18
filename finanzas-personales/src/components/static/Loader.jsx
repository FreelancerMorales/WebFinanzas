import { useUI } from '../../context/UIContext';
import HexagonLoader from '../animation/HexagonLoader';

const Loader = () => {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/6 backdrop-blur-sm flex items-center justify-center duration-300 opacity-0/100 transition-opacity">
      <HexagonLoader loadingProgress={3} />
    </div>
  );
};

export default Loader;
// This component uses the UIContext to display a loading spinner when an async operation is in progress.

/*
* This is a loading indicator that is displayed when an async operation is in progress.
useEffect(() => {
  startLoading();
  fetchData().then(() => {
    stopLoading();
  });
}, []);

*/