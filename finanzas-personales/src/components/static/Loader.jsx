import { useUI } from '../../context/UIContext';

const Loader = () => {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-base-300 bg-opacity-50 z-50 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default Loader;
// This component uses the UIContext to display a loading spinner when an async operation is in progress.