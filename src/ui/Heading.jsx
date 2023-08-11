import { css, styled } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3rem;
      font-weight: 550;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 450;
    `}
  line-height:1.4;
  text-align: left;
`;

export default Heading;
