import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FaXmark } from 'react-icons/fa6';

import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import { TitleText2 } from 'styles/Typography';

const EditProfile = () => {
  return (
    <div css={container}>
      <div css={contentContainer}>
        <AvatarUploader />
        <div css={inputsWrapper}>
          <div css={inputContainer}>
            <TitleText2>닉네임</TitleText2>
            <Input />
          </div>
          <div css={inputContainer}>
            <TitleText2>이메일</TitleText2>
            <Input disabled value="HTMLDeveloper@devcourse.com" />
          </div>
          <div css={inputContainer}>
            <TitleText2>한 줄 소개</TitleText2>
            <TextArea rows={3} />
          </div>
          <div css={inputContainer}>
            <TitleText2>관심 아티스트</TitleText2>
            <div css={tagsContainer}>
              <ArtistTag>
                <span>DAY6</span>
                <button css={deleteButton} type="button">
                  <FaXmark size={16} />
                </button>
              </ArtistTag>
              <ArtistTag>
                <span>카더가든</span>
                <button css={deleteButton} type="button">
                  <FaXmark size={16} />
                </button>
              </ArtistTag>
              <button css={addButton} type="button">
                + 아티스트 추가
              </button>
            </div>
          </div>
        </div>
      </div>
      <BaseButton color="primary" isFullWidth size="medium" variant="fill">
        수정
      </BaseButton>
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 2.4rem;
  flex: 1;
`;

const contentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const inputsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
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

export default EditProfile;
