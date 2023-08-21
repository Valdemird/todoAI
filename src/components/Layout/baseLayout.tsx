import { InfoContainer, Main, PageContainer } from "./components";
import { Header } from "../../stories/Header";

export interface BaseLayoutProps {
  isLoading?: boolean;
  error?: Error;
}

const renderChildren = (
  children: React.ReactNode,
  isLoading?: boolean,
  error?: Error
): React.ReactElement => {
  if (isLoading) {
    return (
      <InfoContainer>
        <p>Loading...</p>
      </InfoContainer>
    );
  }

  if (error) {
    return <InfoContainer>Error: {error.message}</InfoContainer>;
  }
  return children;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  error,
  isLoading,
  children,
}) => {
  return (
    <PageContainer>
      <Header />
      <Main>{renderChildren(children, isLoading, error)}</Main>
      <footer>
        <p>© {new Date().getFullYear()} My Task App</p>
      </footer>
    </PageContainer>
  );
};
