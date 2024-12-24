import React from 'react'
import Banner from '../components/home/Banner'
import LanguageCategories from '../components/home/LanguageCategories'
import Stats from '../components/home/Stats'
import { useTheme } from '../contexts/ThemeProvider';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
    <Banner></Banner>
    <Stats theme={theme} />
    <LanguageCategories></LanguageCategories>
    <WhyChooseUs theme={theme}/>
    <Testimonials theme={theme}/>
    </>
  )
}
