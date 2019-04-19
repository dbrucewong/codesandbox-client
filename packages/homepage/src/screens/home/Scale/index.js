/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import MaxWidth from '@codesandbox/common/lib/components/flex/MaxWidth';
import { Button } from '@codesandbox/common/lib/components/Button';
import media from '../../../utils/media';
import types from './projects';

export const Title = styled.h3`
  font-family: Poppins;
  font-weight: bold;
  font-size: 50px;
  color: white;
  margin-top: 160px;

  ${media.phone`
    font-size: 34px;
  `};

  span {
    color: ${props => props.theme.secondary};
  }
`;

export const TagLine = styled.h4`
  margin: 24px 0;
  font-family: Open Sans;
  font-weight: normal;
  font-size: 28px;
  max-width: 600px;
  line-height: 1.5;
  margin-bottom: 64px;

  color: ${props => props.theme.lightText};

  span {
    font-weight: bold;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  color: white;
  font-family: Poppins;

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

const Type = styled.section`
  background: ${props => props.theme.background};
  padding: 24px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0px 0px;
`;

const TypeTitle = styled.h5`
  font-weight: normal;
  font-size: 32px;

  color: ${props => props.theme.lightText};
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

export default () => (
  <MaxWidth width={1440}>
    <Title>
      For projects of any <span>scale</span>.
    </Title>
    <TagLine>
      Learn more about how people use CodeSandbox for their projects.
    </TagLine>
    <Grid>
      {types.map(type => (
        <Type>
          <div>
            <TypeTitle>{type.type}</TypeTitle>
            <Description>{type.description}</Description>
          </div>
          <Button
            style={{
              lineHeight: 1,
              marginRight: 50,
            }}
            href={type.link}
            small
            block
          >
            Learn more
          </Button>
        </Type>
      ))}
    </Grid>
  </MaxWidth>
);
