import BottomSheet from 'components/bottomSheet/BottomSheet';
import BaseButton from 'components/buttons/BaseButton';
import { useModalStore } from 'stores';
import { TitleText2, BodyRegularText } from 'styles/Typography';

const BasicBottomSheet = () => {
  return (
    <BottomSheet name="basic">
      <BottomSheet.Header>
        <TitleText2>기본 바텀시트</TitleText2>
      </BottomSheet.Header>

      <BottomSheet.Content>
        <BodyRegularText>기본적인 헤더와 내용이 포함된 바텀시트입니다.</BodyRegularText>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const Home = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <div>Home</div>
      <BaseButton
        color="primary"
        onClick={() => openModal('bottomSheet', 'basic', <BasicBottomSheet />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
      <div style={{ color: 'white', padding: '4rem', margin: ' 2rem 0' }} />
    </>
  );
};

export default Home;
