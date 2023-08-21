import { Main, PageContainer } from "./components";
import { Header } from "../../stories/Header";

export const BaseLayout: React.FC = (props) => {
  return (
    <PageContainer>
      <Header />
      <Main>{props.children}</Main>
      <footer>
        <p>© {new Date().getFullYear()} My Task App</p>
      </footer>
    </PageContainer>
  );
};
