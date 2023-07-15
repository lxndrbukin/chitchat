import { useParams } from 'react-router-dom';

export const withParams = (Component: any): any => {
  return (props: any) => <Component {...props} params={useParams()} />;
};
