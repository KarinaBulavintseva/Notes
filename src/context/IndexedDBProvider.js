import React, { useEffect, useState } from 'react';
import IndexedDBContext from './IndexedDBContext';

const IndexedDBProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const openIndexedDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('myDataBase', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('notes')) {
          const objectStore = db.createObjectStore('notes', {
            keyPath: 'id'
          });
          objectStore.createIndex('textIndex', 'text', {
            unique: false
          });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  useEffect(() => {
    openIndexedDB();

    const fetchData = () => {
      openIndexedDB()
        .then((db) => {
          const transaction = db.transaction('notes', 'readonly');
          const objectStore = transaction.objectStore('notes');
          const getDataRequest = objectStore.getAll();

          getDataRequest.onsuccess = (event) => {
            setData(event.target.result);
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных:', error);
        });
    };

    fetchData();
  }, []);

  const addToIndexedDB = () => {
    const newId = Date.now();
    const newItem = { id: newId, text: '' };

    openIndexedDB()
      .then((db) => {
        const transaction = db.transaction('notes', 'readwrite');
        const objectStore = transaction.objectStore('notes');
        const addItemRequest = objectStore.add(newItem);

        addItemRequest.onsuccess = () => {
          setData((prevData) => [...prevData, newItem]);
          setCurrentId(newId);
          setIsEditing(true);
        };
      })
      .catch((error) => {
        console.error('Ошибка при добавлении записи:', error);
      });
  };

  const updateInIndexedDB = (id, newText) => {
    openIndexedDB()
      .then((db) => {
        const transaction = db.transaction('notes', 'readwrite');
        const objectStore = transaction.objectStore('notes');

        const updateItemRequest = objectStore.get(id);

        updateItemRequest.onsuccess = (event) => {
          const item = event.target.result;
          item.text = newText;
          const updateRequest = objectStore.put(item);

          updateRequest.onsuccess = () => {
            setData((prevData) =>
              prevData.map((item) => (item.id === id ? { ...item, text: newText } : item))
            );
          };
        };
      })
      .catch((error) => {
        console.error('Ошибка при обновлении записи:', error);
      });
  };

  const deleteFromIndexedDB = (id) => {
    openIndexedDB()
      .then((db) => {
        const transaction = db.transaction('notes', 'readwrite');
        const objectStore = transaction.objectStore('notes');
        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = () => {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        };
      })
      .catch((error) => {
        console.error('Ошибка при удалении записи:', error);
      });
  };

  const searchData = (searchText) => {
    openIndexedDB()
      .then((db) => {
        const transaction = db.transaction('notes', 'readonly');
        const objectStore = transaction.objectStore('notes');
        const searchRequest = objectStore.openCursor();
        const filteredData = [];
        searchRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            const text = cursor.value.text.toLowerCase();
            if (text.includes(searchText.toLowerCase())) {
              filteredData.push(cursor.value);
            }
            cursor.continue();
          } else {
            setData(filteredData);
          }
        };
      })
      .catch((error) => {
        console.error('Ошибка при поиске данных:', error);
      });
  };

  return (
    <IndexedDBContext.Provider
      value={{
        addToIndexedDB,
        updateInIndexedDB,
        deleteFromIndexedDB,
        setCurrentId,
        setIsEditing,
        searchData,
        data,
        currentId,
        isEditing
      }}>
      {children}
    </IndexedDBContext.Provider>
  );
};

export default IndexedDBProvider;
