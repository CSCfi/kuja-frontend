import React, { useContext } from "react";
import styled from "styled-components";
import Moment from "react-moment";

import LupaSection from "./LupaSection";

import { LUPA_SECTIONS, LUPA_TEKSTIT } from "../modules/constants";
import {
  InnerContentContainer,
  InnerContentWrapper
} from "../../../../modules/elements";
import { COLORS } from "../../../../modules/styles";
import { LUPA_LISAKOULUTTAJAT } from "../../constants";
import { LuvatContext } from "context/luvatContext";

const TopSectionWrapper = styled.div`
  padding: 5px 20px;
  margin: 0 -30px;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`;

const H2 = styled.h2`
  margin: 0 30px 24px 30px;
`;

const LupaDetailsWrapper = styled.div`
  margin: 45px auto;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 8px 0;

  a {
    display: flex;
    align-items: flex-end;
  }
`;

const Jarjestamislupa = () => {
  const { state: lupa } = useContext(LuvatContext);

  const { jarjestajaYtunnus } = lupa.data;
  const { kohteet } = lupa;

  // Luvan poikkeuskäsittely erikoisluville (17kpl)
  const lupaException = LUPA_LISAKOULUTTAJAT[jarjestajaYtunnus];

  return (
    <InnerContentContainer>
      <InnerContentWrapper>
        {lupaException ? (
          <TopSectionWrapper>
            <H2>{LUPA_TEKSTIT.LUPA.OTSIKKO.FI}</H2>
          </TopSectionWrapper>
        ) : (
          <TopSectionWrapper>
            <H2>
              {LUPA_TEKSTIT.LUPA.OTSIKKO.FI} <Moment format="DD.MM.YYYY" />
            </H2>
          </TopSectionWrapper>
        )}

        {lupaException ? (
          ""
        ) : (
          <LupaDetailsWrapper>
            {Object.keys(LUPA_SECTIONS).map((k, i) => (
              <LupaSection
                kohde={kohteet[k]}
                ytunnus={jarjestajaYtunnus}
                key={i}
              />
            ))}
          </LupaDetailsWrapper>
        )}
      </InnerContentWrapper>
    </InnerContentContainer>
  );
};

export default Jarjestamislupa;