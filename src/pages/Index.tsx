
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Simply redirect to the root route where the HomePage is now rendered
  return <Navigate to="/" replace />;
};

export default Index;
