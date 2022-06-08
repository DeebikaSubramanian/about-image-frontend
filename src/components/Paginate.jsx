import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/Actions_posts';
import useStyles from './Styles';

const Paginate = ({ page }) => {
  const { NumberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
      
    }
  }, [dispatch, page]);

  return (
    <div className={classes.paginateDiv}>
    <Pagination
      classes={{ ul: classes.ul }}
      count={NumberOfPages}
      page={Number(page) || 1}
      color="secondary"
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/post?page=${item.page}`} />
        
      )}
    />
    </div>
  );
};

export default Paginate;