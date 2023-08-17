import logo from "./logo.svg";
import "./App.css";
import { GlobalContext } from "./GloblaCotext";
import { useEffect, useState } from "react";

import NavbarComp from "./components/Navabar";

import "bootstrap/dist/css/bootstrap.min.css";
import ListCard from "./components/List/ListCards";
import { PaginationBasic } from "./components/Pagination";
import CreateList from "./components/List/Modal";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [totalItems, setTotaItems] = useState(0);
  const [key, setKey] = useState(null);
  //creating a list
  //when we create a list we will update the alldata and currentdata

  const createList = (title, body) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setAllData((prev) => {
          return [json, ...prev];
        });

        setKey(Math.random());
      });
  };
  //getting the data from json api
  const getAllData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        const data = json.slice(
          (currentPage - 1) * 10,
          (currentPage - 1) * 10 + 10
        );

        setCurrentData(data);
        setTotaItems(json.length);
        setAllData(json);
      });
  };

  //updating the list

  const updateList = async (id, title, body) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await res.json();

    const newData = allData.map((list, index) => {
      if (data.id === list.id) {
        list.title = data.title;
        list.body = data.body;
      }
      return list;
    });

    setAllData(newData);
  };

  //deleting a list

  const deleteList = async (id) => {
    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });

    const newData = allData.filter((list, index) => {
      return list.id !== id;
    });

    setAllData(newData);
  };

  useEffect(() => {
    if (allData.length < 1) {
      getAllData();
    }
  }, []);

  useEffect(() => {
    const data = allData.slice(
      (currentPage - 1) * 10,
      (currentPage - 1) * 10 + 10
    );

    setCurrentData(data);
    setTotaItems(allData.length);
  }, [allData, key]);
  return (
    <GlobalContext.Provider
      value={{
        setKey,
        totalItems,
        currentPage,
        setCurrentPage,
        createList,
        updateList,
        deleteList,
      }}
    >
      <div className="App">
        <NavbarComp />
        <CreateList />
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {currentData &&
            currentData.map((list, index) => {
              return (
                <ListCard
                  key={list.id}
                  title={list.title}
                  body={list.body}
                  id={list.id}
                />
              );
            })}
        </div>
        <PaginationBasic />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
