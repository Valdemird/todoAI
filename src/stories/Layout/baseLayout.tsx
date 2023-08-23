import { InfoContainer, Main, PageContainer } from "./components";
import { Header } from "../../stories/Header";

export interface BaseLayoutProps {
  /** Determines whether the layout is in a loading state. */
  isLoading?: boolean;
  /** An optional error object to display in the layout. */
  error?: Error;
}

/**
 * Renders child components within the base layout, considering loading and error states.
 *
 * @param children - The React elements to render within the layout.
 * @param isLoading - Indicates if the layout is in a loading state.
 * @param error - An optional error object to display.
 * @returns The rendered React element based on the loading and error states.
 */
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

/**
 * Base layout component that wraps content with a common structure.
 *
 * @component
 */
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
