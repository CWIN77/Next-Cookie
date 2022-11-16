import styled from 'styled-components'
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export default function Test({ data }: any) {
  return (
    <Container>
      <h1>{data.text}</h1>
      <button onClick={() => {
        fetch("http://localhost:8080/api/hello").then((response) =>
          response.json().then((data) => console.log(data))
        );
      }}>서버 쿠키 받아오기</button>
      <button onClick={() => {
        const result = fetch("http://localhost:8080/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: "Hello server"
          }),
        }).then((response) => response.json());

        result.then((data) => console.log(data));
      }}>서버 쿠키 만들기</button>
      <button onClick={() => {
        console.log(getCookie("text"));
      }}>클라 쿠키 받아오기</button>
      <button onClick={() => {
        setCookie('text', 'Hello??', { sameSite: true });
      }}>클라 쿠키 만들기</button>
      <button onClick={() => {
        deleteCookie('text', { sameSite: true });
      }}>쿠키 제거하기</button>
    </Container>
  )
}

export const getServerSideProps = async ({ req, res, query }: any) => {
  if (query.text) {
    setCookie("text", query.text, { req, res, sameSite: true });
  }

  return {
    props: {
      data: { text: query.text || getCookie("text", { req, res }) || "없음" }
    }
  }
}

const Container = styled.div`
  width:100vw;
  min-height:100vh;
`
