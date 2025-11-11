export type Slide = {
  id: string;
  title: string;
  description: string;
  image: any;
};

export const slides: Slide[] = [
  {
    id: '1',
    title: 'NO GUESSWORK. JUST COMFORT.',
    description: 'Get products delivered to your door, try them on, and decide without any rush.',
    image: require('../assets/images/IntroSlider.png'),
  },
  {
    id: '2',
    title: 'YOUR STYLE, YOUR CHOICE.',
    description: 'Explore collections curated just for you with personalized recommendations.',
    image: require('../assets/images/IntroSlider.png'),
  },
  {
    id: '3',
    title: 'EASY RETURNS, FAST DELIVERY.',
    description: 'Shop confidently knowing you can return anything easily, anytime.',
    image: require('../assets/images/IntroSlider.png'),
  },
];

