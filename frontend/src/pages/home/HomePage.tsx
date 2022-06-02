import { Box } from '@mui/material'
import { Paper } from '../../components'
import { Heading, Paragraph } from '../../components/typography'

export const HomePage = () => {
  return (
    <Paper
      sx={{
        px: 8,
        py: 4,
      }}
    >
      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <Heading>
          Agilná výuka nových vlastností jazyka C++ v C++14, C++17, C++20
        </Heading>
      </Box>
      <Paragraph>
        Cieľom bakalárskej práce je navrhnúť a vytvoriť interaktívne webové
        prostredie pre výuku nových vlastností jazyka C++11, C++14, C++17 a
        C++20 využitím agilných metód programovania. Prostredie umožní študentom
        riešenie úloh využívajúcich vlastnosti niektorej z verzií jazyka a
        refaktorizáciu do inej verzie. Úlohy budú definované pomocou testmi
        riadeného programovania (TDD). Web aplikácia bude obsahovať editor kódu
        v C++ a na serveri databázu úloh a študentských riešení, kompilátor a
        virtuálny server pre zbiehanie TDD riešení úloh. Súčasťou práce bude
        niekoľko ukážkových úloh, demonštrujúcich možnosti systému.
      </Paragraph>
    </Paper>
  )
}
