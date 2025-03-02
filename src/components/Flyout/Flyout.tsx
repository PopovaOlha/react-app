import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectAll } from '../../store/selectedItemsSlice';
import { useRef } from 'react';
import styles from './Flyout.module.css';
import useTheme from '../../hooks/useTheme';
import { DARK_THEME } from '../../config/constants';

const Flyout: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  if (selectedCharacters.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    if (!selectedCharacters.length) {
      console.warn('No characters selected for download.');
      return;
    }

    const headers = [
      'ID',
      'Name',
      'Birth Year',
      'Gender',
      'Height',
      'Eye Color',
    ];
    const csvRows = selectedCharacters.map(
      ({ id, name, birthYear, gender, height, eyeColor }) =>
        [
          id,
          name,
          birthYear ?? 'N/A',
          gender ?? 'Unknown',
          height ?? 'Unknown',
          eyeColor ?? 'Unknown',
        ].join(',')
    );

    const csvContent = [
      'data:text/csv;charset=utf-8,',
      headers.join(','),
      ...csvRows,
    ].join('\n');
    const encodedUri = encodeURI(csvContent);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.setAttribute('href', encodedUri);
      downloadLinkRef.current.setAttribute(
        'download',
        `${selectedCharacters.length}_selected_characters.csv`
      );
      downloadLinkRef.current.click();
    }
  };

  return (
    <div
      className={`${styles.flyout} ${theme === DARK_THEME ? styles.dark : styles.light}`}
    >
      <p>{selectedCharacters.length} items selected</p>
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={styles.button} onClick={handleDownload}>
        Download
      </button>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Flyout;
