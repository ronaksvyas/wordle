import React from 'react';
import FullCellGrid from '../components/FullCellGrid';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import { GameStatusModal } from '../components/Modal';

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
        <GameStatusModal />
      </>
    </Layout>
  );
}
