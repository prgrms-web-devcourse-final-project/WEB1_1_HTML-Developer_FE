import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FaXmark } from 'react-icons/fa6';

export const ArtistInput = () => {
  return <div>ArtistInput</div>;
};

const inputContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const tagsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const ArtistTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  border-radius: 4px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
`;

const deleteButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const addButton = (theme: Theme) => css`
  padding: 0.6rem 0.8rem;
  background: none;
  border: 1px solid ${theme.colors.dark[300]};
  border-radius: 4px;
  color: ${theme.colors.dark[300]};
  font-size: 1.4rem;
  cursor: pointer;

  &:active {
    border-color: ${theme.colors.dark[200]};
    color: ${theme.colors.dark[200]};
  }
`;
