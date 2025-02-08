    // It's a smaller website, it's okay to use a translations json, for bigger websites either would split into parts or simply use i18 library.
    export const translations = {
        navbar: {
             data:  [
                {
                  title: {en: "Last draws", sr: "Poslednja izvlačenja"},
                  meta: {en: "Check the last drawn numbers", sr: "Pogledaj poslednja izvlačenja brojeva"},
                  href: "/",
                },
                {
                  title: {en: "My numbers", sr: "Moji brojevi"},
                  meta: {en: "Check when your numbers were drawn", sr: "Pogledajte kada su izašli vaši brojevi."},
                  href: "mynumbers",
                },
                {
                  title: {en: "About Keno", sr: "O kino igri"},
                  meta: {en: "Learn more about the Kino game", sr: "Saznajte više o Kino igri."},
                  href: "kino",
                }
              ]
        },
        aboutUs: {
             questions: [
                {
                    question: {
                        en: "What is Kino?",
                        sr: "Šta je Kino?"
                    },
                    answer: {
                        en: "Greek Kino is based on drawing 20 numbers out of 80 possible numbers. Players can choose between 1 and 10 numbers to play. Draws take place every 5 minutes.",
                        sr: "Grčki kino se temelji na izvlačenju 20 brojeva od ukupno 80 mogućih brojeva. Igrači mogu odabrati između 1 i 10 brojeva za igranje. Izvlačenja se održavaju svakih 5 minuta."
                    }
                },
                {
                    question: {
                        en: "How can I check the previous Kino draw results?",
                        sr: "Kako mogu da proverim rezultate prethodnih izvlačenja Kine?"
                    },
                    answer: {
                        en: "To check the results of previous draws, visit the 'Last Draws' section on our website. Here you can see the last 10 drawn numbers and a timer showing the time until the next draw.",
                        sr: "Da biste proverili rezultate prethodnih izvlačenja, posetite sekciju 'Poslednja izvlačenja' na našem sajtu. Ovdje možete videti poslednjih 10 izvučenih brojeva, kao i tajmer koji pokazuje vreme do sledećeg izvlačenja."
                    }
                },
                {
                    question: {
                        en: "How can I view number statistics?",
                        sr: "Kako mogu videti statistiku brojeva?"
                    },
                    answer: {
                        en: "The number statistics, including how many times they were drawn and their average, can be found in the 'My Numbers' section.",
                        sr: "Statistika brojeva, koliko puta su izvuceni u koliko izvlacenja i prosek se moze videti na sekciji 'Moji brojevi'."
                    }
                }
            ]
        },
        statistics: {
            title: {en: "My combination", sr: "Moja kombinacija"},
            lastDrawn: {
                en: ({times, last}) => (<span>was drawn <strong style={{color:'crimson'}}>{times}</strong> in the last 50 draws. (LAST {last || 0} draws ago.)</span>),
                sr: ({times, last}) => (<span>je izašla <strong style={{color:'crimson'}}>{times}</strong> puta u zadnjih 50 izvlačenja. (POSLEDNJI PRE {last || 0} KOLA)</span>),
            },
            average: {
                en: ({avg}) => (<span>On average, it is drawn every <span style={{color:'crimson'}}>{avg}</span> draws.</span>),
                sr: ({avg}) => (<span>U proseku izlazi svakih <span style={{color:'crimson'}}>{avg}</span> izvlačenja.</span>)
            }
        },
    }
    export default translations;