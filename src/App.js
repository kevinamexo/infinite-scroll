import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import './style.css';

let store = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function App() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [element, setElement] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(null);
  const start = useRef(0);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log(first);
        if (first.isIntersecting) {
          console.log('INTERSECTING, LOAD MORE DATA NOW');
          addItems();
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    console.log(store);
    console.log(items);
  }, [store]);
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {};
  }, [element]);

  const addItems = React.useCallback(() => {
    console.log(store);
    console.log(
      'adding from index ' + start.current + 'to' + parseInt(start.current) + 4
    );
    if (parseInt(start.current) < store.length - 1) {
      const newItems = _.difference(store, items);
      console.log(newItems.slice(start, 4));
      setItems((prev) => [...prev, ...newItems]);
    }
  }, [items, start]);
  useEffect(() => {
    if (items.length > 0) {
      start.current = items.length - 1;
      console.log('next iteration will start at index' + start.current);
    }
  }, [items]);

  useEffect(() => {
    if (!items || !store) return;
    if (items.length < store.length) {
      console.log('SHOW LOAD MORE BUTTON');
      setShowLoadMore(true);
    } else if (items.length === store.length) {
      console.log('ALL ITEMS SHOWN');
      setShowLoadMore(false);
    }
  }, [store.length, items]);

  return (
    <div>
      <h1>Items</h1>
      <section>
        {items &&
          items.map((i, key) => (
            <div
              key={key}
              style={{
                height: '50px',
                width: '250px',
                textAlign: 'center',
                backgroundColor: 'red',
                marginTop: '10px',
                borderRadius: '10px',
              }}
            >
              {i}
            </div>
          ))}
      </section>
      {showLoadMore && (
        <button
          ref={setElement}
          style={{
            width: '250px',
            textAlign: 'center',
            backgroundColor: 'blue',
            marginTop: '10px',
            borderRadius: '10px',
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
}
