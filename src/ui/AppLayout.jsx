import { Outlet } from "react-router-dom";
import Header from "./Header";
import { styled } from "styled-components";

const AppLayoutStyle = styled.div`
  display: grid;
  /* grid-template-columns: auto 1fr; */
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function AppLayout() {
  return (
    <AppLayoutStyle>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </AppLayoutStyle>
  );
}

export default AppLayout;
