import Link from 'next/link';
import router from 'next/router';
import styled from 'styled-components'

export default function Home() {
  return (
    <Container>
      <h1>My Next WebApp</h1>
      <button onClick={() => {
        router.push({
          pathname: '/cookie',
          query: { text: "router.push" }
        }, '/cookie');
      }}>router.push 이동</button>
      <Link as='/cookie' href={{
        pathname: '/cookie',
        query: { text: "Link" }
      }}>Link 이동</Link>
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:100vh;
`
