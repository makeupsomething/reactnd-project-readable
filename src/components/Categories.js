import React from 'react';
import { Link } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

/**
* @description Component for listing the shelves
*/
export default function Categories({ categories, updatePage }) {
  let allCats = categories.categories;

  if (!allCats) {
    allCats = [];
  }

  const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  return (
    <div className="list-categories" style={styles.wrapper}>
      <div>
        <Chip
          style={styles.chip}
          backgroundColor={blue300}
          onClick={() => { updatePage('home'); }}
          containerElement={<Link
            to={'/'}
            className="home"
            value="home"
          />}
        >
        Top
        </Chip>
      </div>
      {allCats.map(item => (
        <div key={item}>
        <Chip
          style={styles.chip}
          backgroundColor={blue300}
          onClick={() => { updatePage(item); }}
          containerElement={<Link
            to={`/${item}`}
            className={item}
            value={item}
          />}
        >
        {item}
        </Chip>
        </div>))}
    </div>
  );
}
