import React from 'react';
import { Link } from 'react-router-dom';

/**
* @description Component for listing the shelves
*/
export default function Categories({ categories, updatePage }) {

  let allCats = categories.categories;

  if (!allCats) {
    allCats = [];
  }

  return (
    <div className="list-categories">
      <div>
        <Link
          to={`/`}
          className="home"
          value="home"
          onClick={() => {updatePage("home")}}>
          Top
        </Link>
      </div>
      {allCats.map(item => (
        <div key={item}>
          <Link
            to={`/${item}`}
            className={item}
            value={item}
            onClick={() => {updatePage(item)}}>
            {item}
          </Link>
      </div>))}
    </div>
  );
}
