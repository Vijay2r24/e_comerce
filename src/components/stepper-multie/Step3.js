import { Outlet } from 'react-router-dom';

const Step3 = () => {
  return (
    <div>
      <Outlet /> {/* This will render either the "create" or "list" page */}
    </div>
  );
};

export default Step3;