import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination: React.FC<{ totalPages: number }> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const updatePage = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
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
