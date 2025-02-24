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
                        en: "Are there any numbers that come up more frequently than others?",
                        sr: "Da li postoje brojevi koji izlaze češće nego ostali?",
                    },
                    answer: {
                        en: "The institute’s (CTI) random number generator system ensures that all 80 numbers have the same chances to occur in every draw, regardless of their previous occurrence or delay history.", 
                        sr: "Institutov (CTI) sistem generatora slučajnih brojeva osigurava da svih 80 brojeva ima iste šanse da se pojave u svakom izvlačenju, bez obzira na njihovu prethodnu pojavu ili istoriju kašnjenja.",
                    }
                },
                {
                    question: {
                        en: "Why are draws held 10-15 seconds after the expiration of the participation closing?",
                        sr: "Zašto se izvlačenja održavaju 10-15 sekundi nakon isteka zatvaranja učešća?",
                    },
                    answer: {
                        en: "Results are generated just after the expiration of the 5’ minute betting period, but are transmitted a few seconds later at the screens, due to specifications of the transmission system.You can check if your entry ticket wins, even before the start of the broadcast, as the system has already been updated with the winning combination.",
                        sr: "Rezultati se generišu odmah nakon isteka perioda klađenja od 5 minuta, ali se prenose nekoliko sekundi kasnije na ekranima, zbog specifikacija sistema prenosa.Možete proveriti da li je vaš ulazni tiket dobitan, čak i pre početka emitovanja, pošto je sistem već ažuriran sa dobitnom kombinacijom.",
                    }
                },
                {
                    question: {
                        en: "How can I check the previous Kino draw results?",
                        sr: "Kako mogu da proverim rezultate prethodnih izvlačenja Kino-a?"
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
                },
                {
                    question: {
                        en: "How is this website made?",
                        sr: "Kako je ovaj web-sajt napravljen?",
                    },
                    answer: {
                        en: "This website is made by Bogdan (https://github.com/bogyz123) with React.JS & Tailwind using OPAP REST API (https://www.opap.gr/en/web-services)",
                        sr: "Ovaj web-sajt je napravljen by Bogdan (https://github.com/bogyz123) sa React-om i Tailwind korsteci OPAP-ov REST API (https://www.opap.gr/en/web-services)",
                    }
                }
            ]
        },
        statistics: {
            title: {en: "My combination", sr: "Moja kombinacija"},
            clearButton: {en: "Clear All", sr: "Očistiti sve"},
            hotCold: {en: "Show Hot/Cold numbers", sr: "Pokazati tople/hladne brojeve"},
            lastDrawn: {
                en: ({times, last}) => (<span>was drawn <strong style={{color:'crimson'}}>{times}</strong> in the last 50 draws. (LAST {last || 0} draws ago.)</span>),
                sr: ({times, last}) => (<span>je izašla <strong style={{color:'crimson'}}>{times}</strong> puta u zadnjih 50 izvlačenja. (POSLEDNJI PRE {last || 0} KOLA)</span>),
            },
            average: {
                en: ({avg}) => (<span>On average, it is drawn every <span style={{color:'crimson'}}>{avg}</span> draws.</span>),
                sr: ({avg}) => (<span>U proseku izlazi svakih <span style={{color:'crimson'}}>{avg}</span> izvlačenja.</span>)
            },
            modal: {
                title: {en: "Combination Generator", sr: "Generator kombinacija"},
                amount: {en: "Amount", sr: "Količina brojeva za generisanje"},
                byFrequent: {en: "Generate by most frequent", sr: "Generisati najčešće izvučene brojeve"},
            }
        },
    }
    export default translations;