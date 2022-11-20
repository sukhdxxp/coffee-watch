import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import ProgramCard from "../components/ProgramCard/ProgramCard";

import styles from "../styles/Home.module.css";
import { Input } from "@nextui-org/react";
import debounce from "lodash.debounce";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [programList, setProgramList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = "https://api.coffeecode.nl";
      const API_URL = `${BASE_URL}/title?searchTerm=${searchText}`;
      const rawResponse = await fetch(API_URL);
      const response = await rawResponse.json();
      setProgramList(response);
    };
    if (searchText.length > 3) {
      fetchData();
    } else {
      setProgramList([]);
    }
  }, [searchText]);

  const changeHandler = (event: { target: { value: string } }) => {
    setSearchText(event.target.value);
  };

  const handleOnChange = useMemo(() => debounce(changeHandler, 300), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Watch</title>
        <meta
          name="description"
          content="See where to find your favorite shows"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Input
          clearable
          bordered
          labelPlaceholder="Search for TV Series or Movie"
          onChange={handleOnChange}
          value={searchText}
        />
        <div className={styles.list}>
          {programList.map((program, index) => {
            return <ProgramCard key={index} program={program} />;
          })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
