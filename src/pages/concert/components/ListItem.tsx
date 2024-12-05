import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

const region = [
  '서울',
  '경기',
  '인천',
  '강원',
  '세종',
  '천안',
  '청주',
  '대전',
  '대구',
  '경북',
  '부산',
  '울산',
  '마산',
  '창원',
  '경남',
  '광주',
  '전북',
  '전주',
  '전남',
];

interface ListItemProps {
  onRegionSelect: (region: string) => void;
}

const ListItem = ({ onRegionSelect }: ListItemProps) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleRegionSelect = (selectedRegion: string) => {
    onRegionSelect(selectedRegion);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <Title>지역</Title>
      </BottomSheet.Header>

      <BottomSheet.Content>
        <OptionList>
          {region.map((regionName) => (
            <Item key={regionName} onClick={() => handleRegionSelect(regionName)}>
              <BodyRegularText>{regionName}</BodyRegularText>
            </Item>
          ))}
        </OptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const OptionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Item = styled.li`
  padding: 1.2rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

export default ListItem;
