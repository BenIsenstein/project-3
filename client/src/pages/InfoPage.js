import styled from "styled-components";
import InfoTable from "../components/DataTable/InfoTable";
import { FormSeparator, Page, PageContainer, FlexSection } from "../common";
import leaking from "../assets/leaking.jpg";

const PhotoBlock = styled.div`
  width: 50vw;
  height: 40vh;
  background: url(${leaking}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  @media (min-width: ${(props) => props.theme.smScreen}) {
    width: 70%;
  }
`;

const IntroText = styled.h3`
  width: 90%;
  margin: 2em 0 2em 0;
  text-align: center;
  color: ${(props) => props.theme.prm};
`;

const InfoPage = () => {
  window.scrollTo(0, 0);
  return (
    <Page fadeIn fullWidth marginTop1em>
      <PageContainer>
        <FlexSection fullWidth justifyCenter>
          <IntroText>Explore the Standards suggested by Experts</IntroText>
        </FlexSection>

        <FlexSection fullWidth justifyCenter>
          <InfoTable />
        </FlexSection>
        
        <FlexSection fullWidth justifyCenter>
          <PhotoBlock />
        </FlexSection>
      </PageContainer>
    </Page>
  );
};

export default InfoPage;
