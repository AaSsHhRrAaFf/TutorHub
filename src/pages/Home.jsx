import React from 'react'
import Banner from '../components/home/Banner'
import LanguageCategories from '../components/home/LanguageCategories'
import Stats from '../components/home/Stats'
import { useTheme } from '../contexts/ThemeProvider';

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
    <Banner></Banner>
    <Stats theme={theme} />
    <LanguageCategories></LanguageCategories>
    </>
  )
}
