import Head from 'next/head'
import { Anchor, Button, Container, Text, AppShell, Footer, Header  } from '@mantine/core';
import Link from 'next/link'
import FooterContent from '../components/FooterContent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Toteat App</title>
      </Head>
      <AppShell
        footer={<Footer height={60} p="xs"><FooterContent/></Footer>}
      >
        <Container size="sm" px="xs" style={{marginTop: '50px'}}>
          <h1>Welcome</h1>
          <Text>
            Here you can see data from your restaurant. We know how the metrics are different
            each day and how important it is to make decisions. There are different metrics
            like average, maximum, minimum and total of the sales and also number of sales and
            time spent in the restaurant. Also you can group the data by day, month or weekday
            and filter by waiter, cashier, zone or table.
          </Text>

          <h2>Statistics</h2>

          <Link href="/statistics" passHref>
            <Button component="button" style={{width: '48%', margin: '5px'}}>Charts</Button>
          </Link>
          <Link href="/statistics/summary" passHref>
            <Button component="button" style={{width: '48%', margin: '5px'}}>Summary</Button>
          </Link>
        </Container>
      </AppShell>
      
    </div>
  )
}
