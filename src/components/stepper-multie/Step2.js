import { Outlet } from 'react-router-dom';

const Step2 = () => {
  return (
    <div>
      <Outlet /> {/* This will render either the "create" or "list" page */}
    </div>
  );
};

export default Step2;