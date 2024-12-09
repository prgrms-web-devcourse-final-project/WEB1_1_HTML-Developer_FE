import styled from '@emotion/styled';

import { TitleText1 } from 'styles/Typography';

const Container = styled.div`
  background-color: #000;
  color: #fff;

  min-height: 100vh;
`;

const TitleWrapper = styled.h1`
  background-color: ${({ theme }) => theme.colors.dark[200]};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 6rem;
  min-height: 20rem;
`;

const ContentWrapper = styled.div`
  padding: 2.4rem;

  padding-top: 0;
`;

const DateList = styled.div`
  margin: 2rem 0;
`;

const DateItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  font-size: 1.4rem;
  color: #fff;
`;

const StatusBox = styled.div`
  font-size: 1.6rem;
  background-color: #333;
  padding: 1.6rem;
  border-radius: 8px;
`;

const DateSelection = styled.div`
  margin: 3.6rem 0;
  font-size: 1.6rem;
`;

const DateCheckbox = styled.div`
  margin: 1.6rem 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const RadioSelection = styled.div`
  margin: 3.6rem 0;
  font-size: 1.6rem;
`;

const RadioGroup = styled.div`
  font-size: 1.6rem;
  margin: 20px 0;
  display: flex;
  gap: 20px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantitySelector = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: 1px solid #666;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  background: transparent;
  border: none;
  color: #fff;
  margin: 3.6rem 0;
`;

const NotificationToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3.6rem 0;
  font-size: 1.6rem;
`;

const SubmitButton = styled.button`
  font-size: 1.6rem;
  width: 100%;
  padding: 15px;
  background-color: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #4b5563;
    cursor: not-allowed;
  }
`;

const SurveyDetail = () => {
  return (
    <Container>
      <TitleWrapper>
        <TitleText1>
          INFINITE 15TH ANNIVERSARY CONCERT : LIMITED EDITION 서울 수요조사 페이지
        </TitleText1>
      </TitleWrapper>

      <ContentWrapper>
        <DateList>
          <DateItem>
            <span>2024.09.20</span>
            <span>12 / 25</span>
          </DateItem>
          <DateItem>
            <span>2024.09.21</span>
            <span>20 / 25</span>
          </DateItem>
          <DateItem>
            <span>2024.09.22</span>
            <span>24 / 25</span>
          </DateItem>
        </DateList>

        <StatusBox>
          수요조사 등록 후 인원이 좋족하여 서울 예약받고 계시 시작과 동시 안내드립니다!
        </StatusBox>

        <DateSelection>
          <h3>이용 날짜</h3>
          <DateCheckbox>
            <input id="date1" type="checkbox" />
            <label htmlFor="date1">2024.09.20(금)</label>
          </DateCheckbox>
          <DateCheckbox>
            <input id="date2" type="checkbox" />
            <label htmlFor="date2">2024.09.21(토)</label>
          </DateCheckbox>
          <DateCheckbox>
            <input id="date3" type="checkbox" />
            <label htmlFor="date3">2024.09.22(일)</label>
          </DateCheckbox>
        </DateSelection>

        <RadioSelection>
          <h3>이용 범도</h3>
          <RadioGroup>
            <RadioOption>
              <input id="type1" name="type" type="radio" />
              <label htmlFor="type1">왕복</label>
            </RadioOption>
            <RadioOption>
              <input id="type2" name="type" type="radio" />
              <label htmlFor="type2">상행</label>
            </RadioOption>
            <RadioOption>
              <input id="type3" name="type" type="radio" />
              <label htmlFor="type3">하행</label>
            </RadioOption>
          </RadioGroup>
        </RadioSelection>

        <QuantitySelector>
          <span>팀당 인원(변인 포함)</span>
          <div>
            <QuantityButton>-</QuantityButton>
            <QuantityInput readOnly type="text" value="1" />
            <QuantityButton>+</QuantityButton>
          </div>
        </QuantitySelector>

        <NotificationToggle>
          <span>알림받기</span>
          <input type="checkbox" />
        </NotificationToggle>

        <SubmitButton>신청하기</SubmitButton>
      </ContentWrapper>
    </Container>
  );
};

export default SurveyDetail;
