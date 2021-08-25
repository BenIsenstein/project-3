import styled from "styled-components";
import { Page, PageContainer, FlexSection } from "../common";
import solution from '../assets/solution.JPG'
import team from '../assets/team.JPG'
import tech from '../assets/tech.JPG'


const Text = styled.h3`
  width: 90%;
  margin: 2em 0 2em 0;
  text-align: center;
  color: ${(props) => props.theme.prm};
`;


const About = () => {
  window.scrollTo(0, 0);
  return (
    <Page fadeIn fullWidth marginTop1em>
      <PageContainer>

      <FlexSection fullWidth justifyCenter>
        <Text>Our Story</Text>
        <img src={solution} alt="Solution"/>
        </FlexSection>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <FlexSection fullWidth justifyCenter>
          <Text>Our Team</Text>
          <img src={team} alt="Team"/>
        </FlexSection>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <FlexSection fullWidth justifyCenter>
        <Text>The Technology</Text>
        <img src={tech} alt="tech"/>
        </FlexSection>
        
        <FlexSection fullWidth justifyCenter>
         
        </FlexSection>
      </PageContainer>
    </Page>
  );
};

export default About;