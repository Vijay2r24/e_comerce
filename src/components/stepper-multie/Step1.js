import { Outlet } from 'react-router-dom';

const Step1 = () => {
  return (
    <div>
      <Outlet /> {/* This will render either the "create" or "list" page */}
    </div>
  );
};

export default Step1;