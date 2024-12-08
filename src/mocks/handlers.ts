import { http, HttpResponse } from 'msw';

import { API_URL } from 'constants/url';

export const handlers = [
  // http.get(`${API_URL}/api/v1/rents/12`, () => {
  //   return HttpResponse.json({
  //     timeStamp: '2024-12-03T00:13:56.217Z',
  //     code: '200',
  //     message: 'Success',
  //     result: {
  //       concertName: 'DAY6 3RD WORLD TOUR, FOREVER YOUNG [인천]',
  //       imageUrl: 'https://img1.newsis.com/2024/03/18/NISI20240318_0001504432_web.jpg',
  //       title: '데이식스(DAY6) FOREVER YOUNG 콘서트 청주 차대절 🎸',
  //       artistName: 'DAY6',
  //       region: '청주',
  //       boardingArea: '스타벅스 청주터미널점',
  //       dropOffArea: '인스파이어리조트 (아레나)',
  //       upTime: '09:00',
  //       downTime: '23:00',
  //       rentBoardingDates: ['2024-09-20', '2024-09-21', '2024-09-22'],
  //       busSize: 'LARGE',
  //       busType: 'DELUXE',
  //       maxPassenger: 28,
  //       roundPrice: 45000,
  //       upTimePrice: 45000,
  //       downTimePrice: 45000,
  //       recruitmentCount: 25,
  //       participants: [25, 12, 18],
  //       endDate: '2024-12-26',
  //       chatUrl: 'https://open.kakao.com/o/abcDeF',
  //       refundType: 'ADDITIONAL_DEPOSIT',
  //       information: `❗입금 후 폼 작성 부탁드립니다.❗\n\n 왕복, 편도 가격 동일합니다.
  //                     양도나 분할 탑승 신청자분들은 직접 짝 구해주시고 신청해주시길 바랍니다. (입금은 한분께서 일괄 입금 부탁드리며 오픈카톡을 통해 확인 내용 알려주시길 바랍니다.)\n
  //                     📌 개인이 진행하는 차대절이기 때문에 인원 미달, 13번 이후 입금자를 제외한 환불은 절대 불가하오며 이 부분을 숙지하지 못한 사항에 대해서 생기는 불이익은 책임지지 않습니다.이점 유의하시고 신청 바랍니다.`,
  //     },
  //   });
  // }),
  // http.get(`${API_URL}/api/v1/rents/12/deposit-account`, () => {
  //   return HttpResponse.json({
  //     timeStamp: '2024-12-03T02:38:22.994Z',
  //     code: '200',
  //     message: 'success',
  //     result: {
  //       depositAccount: '우리은행 1242264211943 김데식',
  //     },
  //   });
  // }),
];
