import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { WordleContext } from '../pages/_app';
import { useContext } from 'react';
import { GameStatus } from '../store/state';


export function GameStatusModal() {
  let { isOpen, onClose } = useDisclosure();
  const {state} = useContext(WordleContext);
  
  isOpen = [GameStatus.FINISHED_FAIL, GameStatus.FINISHED_SUCCESS].includes(state.gameStatus);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {state.gameStatus === GameStatus.FINISHED_SUCCESS && (
              <>
                WINNER!
              </>
            )}
            {state.gameStatus === GameStatus.FINISHED_FAIL && (
              <>GAME OVER!</>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {state.gameStatus === GameStatus.FINISHED_SUCCESS && (
              <>
                Congratulations! You have guessed the correct word:{' '}
                <h3>{state.winnerWord}</h3>
              </>
            )}
            {state.gameStatus === GameStatus.FINISHED_FAIL && (
              <>Uh Oh! Game Over! You have run out of chances. Try again.</>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {window.location.reload()}} >
              Start Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}