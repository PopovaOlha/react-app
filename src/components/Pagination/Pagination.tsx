import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination: React.FC<{ totalPages: number }> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('query') || '';
  const selectedId = searchParams.get('details') || '';

  const updatePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    if (searchTerm) newParams.set('query', searchTerm);
    if (selectedId) newParams.set('details', selectedId);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        &#8592;
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.arrow}
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
