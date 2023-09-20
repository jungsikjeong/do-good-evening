export interface DummyProps {
  id: string;
  imgUrl: string;
  description: string;
  nickname: string;
  uploadTime: string;
  city: string;
  country: string;
}

const dummy: DummyProps[] = [
  {
    id: '0',
    imgUrl: 'example',
    description: '오늘 하루도 평안히 마무리',
    nickname: '정두굿',
    uploadTime: '7:31:48 PM',
    city: 'Bucheon',
    country: 'Korean',
  },
  {
    id: '1',
    imgUrl: 'example',
    description: '저녁 노을 보세요~',
    nickname: '정두쏘굿',
    uploadTime: '6:31:48 PM',
    city: 'Bucheon',
    country: 'Korean',
  },
  {
    id: '2',
    imgUrl: 'example',
    description: '오.전(오늘 전나이쁘다는 뜻)',
    nickname: '정말요',
    uploadTime: '8:30:48 PM',
    city: 'Bucheon',
    country: 'Korean',
  },
];

export default dummy;
