import React, { useEffect } from 'react';
import { CardProps, Character } from '../../interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCharacter,
  unselectCharacter,
  selectMultipleCharacters,
} from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import { useSearchCharactersQuery } from '../../api/starWarsApi';
import { setLoading } from '../../store/uiSlice';
import styles from './Card.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../Loader/Loader';
import useTheme from '../../hooks/useTheme';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const Card: React.FC<CardProps> = ({ character }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );

  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  const searchTerm = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const { error, isFetching } = useSearchCharactersQuery({
    searchTerm,
    page: parseInt(page),
  });

  useEffect(() => {
    const selected: Character[] = JSON.parse(
      localStorage.getItem('selectedItems') || '[]'
    );
    if (selected.length > 0) {
      dispatch(selectMultipleCharacters(selected));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  const handleClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('input[type="checkbox"]')) {
      navigate(`/?query=${searchTerm}&page=${page}&details=${character.id}`);
    }
  };

  const isSelected = selectedCharacters.some(
    (char) => char.id === character.id
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.checked) {
      dispatch(selectCharacter(character));
    } else {
      dispatch(unselectCharacter(character.id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        Error:
        {(error as FetchBaseQueryError).status ??
          (error as SerializedError).message}
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
      data-testid="character-card"
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <img
        className={styles.image}
        src={character.image}
        alt={character.name}
      />
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.description}>{character.birthYear}</p>
    </div>
  );
};

export default Card;
