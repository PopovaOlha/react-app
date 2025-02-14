import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // Make sure RootState is correctly imported
import { unselectAll } from '../../store/selectedItemsSlice';
import { useRef } from 'react';
import styles from './Flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  // Extract selectedCharacters from Redux state
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  // If no items are selected, do not render Flyout
  if (selectedCharacters.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const headers = [
      'ID',
      'Name',
      'Description',
      'Age',
      'Gender',
      'Height',
      'Mass',
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(',')]
        .concat(
          selectedCharacters.map((character) =>
            [
              character.id,
              character.name,
              character.description ?? 'N/A',
              character.gender ?? 'Unknown',
              character.height ?? 'Unknown',
              character.mass ?? 'Unknown',
            ].join(',')
          )
        )
        .join('\n');

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
    <div className={styles.flyout}>
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
