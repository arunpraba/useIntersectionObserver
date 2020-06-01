import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import useIntersectionObserver from "./useInterSectionObserver";
import styled from "styled-components";

const UL = styled.ul`
  /* list-style: none; */
  margin: 0;
  max-height: 400px;
  width: 600px;
  border: 1px solid palevioletred;
  background: palevioletred;
  overflow-y: scroll;
`;

const Li = styled.li`
  text-align: "center";
  padding: 10px;
  margin: 10px;
  list-style: none;
  background: ${({ dNone }) => (dNone ? "transparent" : "white")};
`;

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

export default function App() {
  const [list, setList] = useState(() => range(0, 15));
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const interSecting = useIntersectionObserver(ref);

  const generateNewList = list => {
    const lastIndex = list.length - 1;
    return range(list[lastIndex], list[lastIndex] + 10);
  };

  useEffect(() => {
    if (interSecting) {
      setLoading(true);
      setTimeout(() => {
        setList(list => [...list, ...generateNewList(list)]);
        setLoading(false);
      }, 2000);
    }
  }, [interSecting]);

  return (
    <UL>
      {list.map((no, i) => (
        <Li key={i}>{no} </Li>
      ))}
      <Li>{loading && "loading...."}</Li>
      <Li ref={ref} dNone />
    </UL>
  );
}
