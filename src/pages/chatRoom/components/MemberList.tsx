import styled from '@emotion/styled';
import { FaCrown, FaUserGroup } from 'react-icons/fa6';
import { TbMessageCircle } from 'react-icons/tb';

import { CaptionText, ChipText, SmallText } from 'styles/Typography';
import type { MemberInfo } from 'types';

export interface MemberListProps {
  isGroupChat: boolean;
  me: MemberInfo;
  manager?: MemberInfo;
  participants?: MemberInfo[];
  otherMember?: MemberInfo;
}

const MemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 1.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const MemberListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const MemberListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.white};
`;

const MemberListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  overflow: hidden;
  border-radius: 50%;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Manager = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ManagerMark = styled(FaCrown)`
  color: ${({ theme }) => theme.colors.primary};
`;

const PrivateChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const MemberList = ({ isGroupChat, me, manager, participants, otherMember }: MemberListProps) => {
  return (
    <MemberListContainer>
      <MemberListTop>
        <MemberListTitle>
          <FaUserGroup size={16} />
          <ChipText>참여 멤버</ChipText>
        </MemberListTitle>
        <SmallText>{isGroupChat ? participants?.length : '2'}명 참여중</SmallText>
      </MemberListTop>
      <MemberListWrapper>
        {manager && (
          <MemberItem key={manager.memberId}>
            <MemberProfile>
              <ProfileImgContainer>
                <ProfileImg alt={manager.nickname} src={manager.profileImage.url} />
              </ProfileImgContainer>
              <Manager>
                {isGroupChat && <ManagerMark size={16} />}
                <CaptionText>
                  {manager.nickname}
                  {manager.memberId === me.memberId && `(나)`}
                </CaptionText>
              </Manager>
            </MemberProfile>
            {manager.memberId !== me.memberId && (
              <PrivateChatButton>
                <TbMessageCircle size={14} />
                <SmallText>1:1</SmallText>
              </PrivateChatButton>
            )}
          </MemberItem>
        )}
        {me.memberId !== manager?.memberId && (
          <MemberItem key={me.memberId}>
            <MemberProfile>
              <ProfileImgContainer>
                <ProfileImg alt={me.nickname} src={me.profileImage.url} />
              </ProfileImgContainer>
              <CaptionText>{me.nickname}(나)</CaptionText>
            </MemberProfile>
          </MemberItem>
        )}
        {participants &&
          participants
            .filter(
              (participant) =>
                participant.memberId !== manager?.memberId && participant.memberId !== me.memberId
            )
            .map((member) => {
              return (
                <MemberItem key={member.memberId}>
                  <MemberProfile>
                    <ProfileImgContainer>
                      <ProfileImg alt={member.nickname} src={member.profileImage.url} />
                    </ProfileImgContainer>
                    <CaptionText>
                      {member.nickname}
                      {member.memberId === me.memberId && `(나)`}
                    </CaptionText>
                  </MemberProfile>
                  {manager?.memberId === me.memberId && isGroupChat && (
                    <PrivateChatButton>
                      <TbMessageCircle size={14} />
                      <SmallText>1:1</SmallText>
                    </PrivateChatButton>
                  )}
                </MemberItem>
              );
            })}
        {otherMember && (
          <MemberItem key={otherMember.memberId}>
            <MemberProfile>
              <ProfileImgContainer>
                <ProfileImg alt={otherMember.nickname} src={otherMember.profileImage.url} />
              </ProfileImgContainer>
              <CaptionText>{otherMember.nickname}</CaptionText>
            </MemberProfile>
          </MemberItem>
        )}
      </MemberListWrapper>
    </MemberListContainer>
  );
};

export default MemberList;
