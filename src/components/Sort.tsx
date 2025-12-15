import { useState, useRef, useCallback } from "react";

import useClickOutside from "../hooks/useClickOutside";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSort, setReverseSorting } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortItem[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

// В ФАЙЛЕ СТОР ПОДГОТОВЛЕННЫЕ ТИПИЗИРОВАННЫЕ USESELECTOR USEDISPATCH, ИХ НАДО ЗАМЕНИТЬ В КАЖДОМ ФАЙЛЕ

export default function Sort() {
  const dispatch = useAppDispatch();
  const { sort, reverseSorting } = useAppSelector((state) => state.filter);
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const popupClose = useCallback(() => {
    setOpen(false);
  });

  useClickOutside(sortRef, popupClose);

  const onClickActiveFilter = (obj: SortItem) => {
    dispatch(setSort({ ...obj }));
    setOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={reverseSorting ? "" : "sort__label--icon-reverse"}
          onClick={() => dispatch(setReverseSorting(!reverseSorting))}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => {
              return (
                <li
                  onClick={() => onClickActiveFilter(obj)}
                  className={sort.name === obj.name ? "active" : ""}
                  key={obj.name}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
