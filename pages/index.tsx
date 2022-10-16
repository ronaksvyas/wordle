import React from 'react';
import FullCellGrid from '../components/FullCellGrid';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';

export default function HomePage() {
  const handleKeyPress = (event) => {
    event.preventDefault();
  };

  return (
    <Layout
      height="100vh"
      alignItems="center"
      justifyContent="center"
      onKeyPress={handleKeyPress}
    >
      <>
        <FullCellGrid />
        <Keyboard />
      </>
    </Layout>
  );
}
