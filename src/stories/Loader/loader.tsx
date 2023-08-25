import React from "react";
import styled from "styled-components";

import { StyleProps } from "../../global-types";

import "./spinner.css";

const Spinner: React.FC = () => (
  <div className="lds-ripple">
    <div></div>
    <div></div>
  </div>
);

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: ${({ theme }: StyleProps) => theme.spacing.padding.medium}px 0px;
`;

export const Loader: React.FC = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

Loader.defaultProps = {};
