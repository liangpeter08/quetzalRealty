import { Helmet } from 'react-helmet';

interface PageContainerProps {
  title: string
  children: React.ReactNode
  description: string
};

const PageContainer = ({ title, description, children }: PageContainerProps) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);


export default PageContainer;
