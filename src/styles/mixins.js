import styled from 'emotion/react';

export const Navigation = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.primary};
  height: 2.4em;

  & > .left-side {
    font-size: 1.1em;
    margin-top: -4px;
  }

  & > .fill {
    flex: 1 1 auto;
  }
`

export const NavigationWrapper = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.primary};
  height: 2.4em;

  & > .left-side {
    font-size: 1.1em;
    margin-top: -4px;
  }

  & > .fill {
    flex: 1 1 auto;
  }

    & > .actions > * {
      margin-left: .5em
    }
  }

`

export const InputWrapper = styled('span')`
  input, select {
    background: ${props => props.theme.background};
    border: none;
    font-family: ${props => props.theme.mainFont};
    font-size: 1rem;
    border-bottom: 1px solid ${props => props.theme.primary};
    padding: 0;
    width: 100%;
    border-radius: 0;
  }
`

export const DataField = styled('div')`
  padding: .5em;
  font-size: 1.1em;
`

export const Field = styled('p')`
  font-size: 1.2em;
  margin: 0 .5em;
`

export const FieldLabel = styled('p')`
  margin-bottom: .5em;

  &:after {
    content: '';
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, ${props => props.theme.secondary} , rgba(0,0,0,0));
    display: block;
  }
`