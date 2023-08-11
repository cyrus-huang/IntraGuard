import { css, styled } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "hori" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vert" &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}
`;

Row.defaultProps = {
  type: "vert",
};

export default Row;
