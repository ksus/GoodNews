/* GoodNews – treści aplikacji.
   Wszystkie teksty znajdują się tutaj – możesz je edytować bez dotykania reszty kodu. */

/* ---------- 1. Cztery Prawa Duchowego Życia ---------- */

const LAWS_SVG = {
  gap: `
<svg viewBox="0 0 420 250" role="img" aria-label="Przepaść między świętym Bogiem a grzesznym człowiekiem">
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 22 L52 52 H368 L400 22"/>
    <path d="M20 228 L52 198 H368 L400 228"/>
  </g>
  <text x="210" y="36" text-anchor="middle" font-size="20" fill="currentColor">Święty Bóg</text>
  <text x="210" y="226" text-anchor="middle" font-size="20" fill="currentColor">Grzeszny człowiek</text>
  <g stroke="currentColor" stroke-width="3" fill="currentColor">
    <g><line x1="120" y1="192" x2="120" y2="150"/><path d="M112 156 L120 138 L128 156 Z"/></g>
    <g><line x1="165" y1="192" x2="165" y2="120"/><path d="M157 126 L165 108 L173 126 Z"/></g>
    <g><line x1="210" y1="192" x2="210" y2="140"/><path d="M202 146 L210 128 L218 146 Z"/></g>
    <g><line x1="255" y1="192" x2="255" y2="90"/><path d="M247 96 L255 78 L263 96 Z"/></g>
  </g>
</svg>`,
  bridge: `
<svg viewBox="0 0 420 270" role="img" aria-label="Krzyż Jezusa jako most nad przepaścią">
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 30 L46 60 H150"/><path d="M270 60 H374 L406 30"/>
    <path d="M14 244 L46 214 H150"/><path d="M270 214 H374 L406 244"/>
    <path d="M190 36 H230 V90 H270 V140 H230 V238 H190 V140 H150 V90 H190 Z" fill="var(--paper)"/>
  </g>
  <text x="80" y="50" text-anchor="middle" font-size="20" fill="currentColor">Bóg</text>
  <text x="80" y="240" text-anchor="middle" font-size="20" fill="currentColor">Człowiek</text>
  <g font-size="24" fill="currentColor" text-anchor="middle" font-weight="600">
    <text x="210" y="72">J</text><text x="210" y="112">E</text><text x="210" y="152">Z</text><text x="210" y="192">U</text><text x="210" y="232">S</text>
  </g>
  <g stroke="currentColor" stroke-width="3" fill="currentColor">
    <line x1="112" y1="62" x2="112" y2="196"/><path d="M104 188 L112 210 L120 188 Z"/>
  </g>
</svg>`,
  circles: `
<svg viewBox="0 0 400 190" role="img" aria-label="Dwa koła: życie z człowiekiem na tronie i życie z Chrystusem na tronie">
  <g fill="none" stroke="currentColor" stroke-width="2.5">
    <circle cx="100" cy="90" r="78"/><circle cx="300" cy="90" r="78"/>
  </g>
  <!-- krzyż poza lewym kołem -->
  <g stroke="currentColor" stroke-width="4" stroke-linecap="round">
    <line x1="196" y1="140" x2="196" y2="168"/><line x1="185" y1="150" x2="207" y2="150"/>
  </g>
  <!-- tron lewy -->
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M78 50 V122"/><path d="M78 80 H128 V122"/>
  </g>
  <text x="104" y="74" text-anchor="middle" font-size="17" font-weight="600" fill="currentColor">Ja</text>
  <!-- tron prawy -->
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M278 50 V122"/><path d="M278 80 H328 V122"/>
  </g>
  <g stroke="currentColor" stroke-width="4" stroke-linecap="round">
    <line x1="302" y1="56" x2="302" y2="76"/><line x1="293" y1="63" x2="311" y2="63"/>
  </g>
  <text x="338" y="136" text-anchor="middle" font-size="17" font-weight="600" fill="currentColor">Ja</text>
</svg>`,
  train: `
<svg viewBox="0 0 560 150" role="img" aria-label="Pociąg: fakt, wiara, uczucia">
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M14 112 H34 L44 100 V54 H64 V34 H80 V54 H94 V34 H122 V104 H186"/>
    <path d="M122 34 H168 V76 H122"/>
    <path d="M186 104 V66 H252 V104 H186"/>
    <path d="M252 86 H290"/>
    <rect x="290" y="30" width="250" height="74" rx="3"/>
    <circle cx="60" cy="122" r="12"/><circle cx="110" cy="122" r="12"/>
    <circle cx="212" cy="116" r="12"/><circle cx="252" cy="116" r="12"/>
    <circle cx="332" cy="116" r="12"/><circle cx="500" cy="116" r="12"/>
  </g>
  <path d="M192 66 q10 -14 28 -10 q12 -8 28 10 Z" fill="currentColor"/>
  <text x="62" y="82" font-size="19" fill="currentColor">FAKT</text>
  <text x="219" y="95" font-size="17" text-anchor="middle" fill="currentColor">WIARA</text>
  <text x="415" y="76" font-size="21" text-anchor="middle" fill="currentColor">UCZUCIA</text>
</svg>`
};

/* page = numer strony w oryginalnej książeczce (używany w odnośnikach „str. 11”) */
const LAWS_SLIDES = [
  {
    kind: "cover",
    html: `
      <p class="eyebrow">Książeczka</p>
      <h2 class="display">Czy słyszałeś o Czterech Prawach Duchowego Życia?</h2>
      <p>To najszerzej używana na świecie prezentacja ewangelii Chrystusa. Na niej wyrósł w Polsce Ruch Oazowy „Światło-Życie”. Miliony Polaków poznały ewangelię w tej formie. Jej treść zmieniła życie wielu. Teraz Ty masz okazję ją poznać!</p>`
  },
  {
    page: 4, big: "1",
    html: `
      <p>Obok praw fizycznych, które rządzą światem materialnym, istnieją także prawa duchowe, które regulują nasz stosunek do Boga.</p>
      <h3 class="law">Prawo pierwsze:</h3>
      <p class="claim">Bóg kocha ciebie i ma dla twojego życia wspaniały plan.</p>
      <p class="note">Podane teksty Pisma Św. pochodzą z Biblii Tysiąclecia, Wydawnictwo Pallottinum.</p>`
  },
  {
    page: 5,
    html: `
      <h3 class="sub">Miłość Boga</h3>
      <blockquote class="verse">„Tak bowiem Bóg umiłował świat, że Syna swego jednorodzonego dał, aby każdy, kto w Niego wierzy, nie zginął, ale miał życie wieczne” <cite>(Jan 3,16)</cite></blockquote>
      <h3 class="sub">Plan Boga</h3>
      <blockquote class="verse">Chrystus mówi: „Ja przyszedłem po to, aby owce miały życie i miały je w obfitości.” <span class="aside">(Chodzi tu o życie mające pełną wartość i cel)</span> <cite>(Jan 10,10)</cite></blockquote>
      <p class="question">Dlaczego jednak większość ludzi nie posiada życia w pełni?</p>`
  },
  {
    page: 6, big: "2",
    html: `
      <p>Ponieważ:</p>
      <h3 class="law">Prawo drugie:</h3>
      <p class="claim">Człowiek jest grzeszny i w konsekwencji oddzielony od Boga, dlatego też nie może znać ani przeżywać Bożej miłości i planu dla swojego życia.</p>
      <h3 class="sub">Człowiek jest grzeszny</h3>
      <blockquote class="verse">„Wszyscy bowiem zgrzeszyli i pozbawieni są chwały Bożej” <cite>(Rzymian 3,23)</cite></blockquote>
      <p>Człowiek został stworzony do wspólnoty z Bogiem, ale samowolnie wybrał niezależną drogę życia. W rezultacie tego – wspólnota z Bogiem została zerwana. Ta samowola wyrażająca się w buncie lub obojętności wobec Boga, jest przejawem tego, co Biblia nazywa grzechem.</p>`
  },
  {
    page: 7,
    html: `
      <h3 class="sub">Człowiek jest oddzielony od Boga</h3>
      <blockquote class="verse">„Zapłatą za grzech jest śmierć” <span class="aside">(to znaczy duchowe odłączenie od Boga)</span> <cite>(Rzymian 6,23)</cite></blockquote>
      <div class="diagram-row">
        <figure class="diagram">{{gap}}</figure>
        <p>Bóg jest święty, a człowiek jest grzeszny. Dzieli ich wielka przepaść. Te strzałki ilustrują, że człowiek usiłuje dosięgnąć Boga i zdobyć obfite życie przez swoje wysiłki, takie jak: dobre, uczciwe życie, etyka, filozofia lub religia.</p>
      </div>
      <p class="question">Trzecie prawo daje nam jedyny sposób pokonania tej przepaści.</p>`
  },
  {
    page: 8, big: "3",
    html: `
      <h3 class="law">Prawo trzecie:</h3>
      <p class="claim">Jezus Chrystus jest jedynym rozwiązaniem problemu grzechu i winy człowieka. Przez Niego możesz poznać miłość Boga i plan dla twojego życia.</p>
      <h3 class="sub">Chrystus umarł za nas…</h3>
      <blockquote class="verse">„Bóg zaś okazuje nam swoją miłość właśnie przez to, że Chrystus umarł za nas, gdyśmy byli jeszcze grzesznikami” <cite>(Rzymian 5,8)</cite></blockquote>
      <h3 class="sub">I zmartwychwstał…</h3>
      <blockquote class="verse">„Chrystus umarł za grzechy nasze … został pogrzebany … zmartwychwstał trzeciego dnia, zgodnie z Pismem … ukazał się Kefasowi, potem Dwunastu. Potem ukazał się więcej, niż pięciuset braciom naraz” <cite>(1 Koryntian 15,3-6)</cite></blockquote>`
  },
  {
    page: 9,
    html: `
      <h3 class="sub">I dlatego On jest jedyną drogą</h3>
      <blockquote class="verse">„Odpowiedział mu Jezus: Ja jestem drogą i prawdą i życiem. Nikt nie przychodzi do Ojca inaczej jak tylko przeze Mnie” <cite>(Jan 14,6)</cite></blockquote>
      <div class="diagram-row">
        <figure class="diagram">{{bridge}}</figure>
        <p>Bóg przerzucił pomost nad tą przepaścią, która dzieli nas od Niego, przez posłanie swego Syna, Jezusa Chrystusa, aby umarł zamiast nas płacąc w ten sposób karę za nasze grzechy.</p>
      </div>
      <p class="question">Jednak nie wystarczy tylko intelektualna znajomość tych trzech praw…</p>`
  },
  {
    page: 10, big: "4",
    html: `
      <h3 class="law">Prawo czwarte:</h3>
      <p class="claim">Potrzebujemy osobiście przyjąć Jezusa Chrystusa jako Zbawiciela i Pana. Wtedy dopiero możemy poznać i przeżywać miłość Boga i Jego plan dla naszego życia.</p>
      <h3 class="sub">Potrzebujemy przyjąć Chrystusa</h3>
      <blockquote class="verse">„A wszystkim, którzy Go przyjęli, tym którzy wierzą w imię Jego, dał moc, aby stali się dziećmi Bożymi” <cite>(Jan 1,12)</cite></blockquote>
      <h3 class="sub">Przyjmujemy Chrystusa przez wiarę</h3>
      <blockquote class="verse">„Łaską bowiem jesteście zbawieni przez wiarę. A to pochodzi nie od was, lecz jest darem Boga: nie z uczynków, aby się nikt nie chlubił” <cite>(Efezjan 2,8-9)</cite></blockquote>`
  },
  {
    page: 11,
    html: `
      <h3 class="sub">Przyjmujemy Chrystusa przez osobiste zaproszenie Go do naszego serca i życia</h3>
      <blockquote class="verse">Chrystus mówi: „Oto stoję u drzwi i kołaczę: jeśli kto posłyszy mój głos i drzwi otworzy, wejdę do niego i będę z nim wieczerzał, a on ze mną” <cite>(Apokalipsa Jana 3,20)</cite></blockquote>
      <p>Przyjęcie Chrystusa zawiera w sobie: odwrócenie się od swojego „ja” i nawrócenie się do Boga, pozwolenie Jezusowi na wejście do naszego życia, przebaczenie naszych grzechów i przekształcenie nas według Jego woli.</p>
      <p>Nie wystarczy tylko rozumieć, że Jezus Chrystus jest Synem Bożym i umarł za nasze grzechy. Nie chodzi też o religijne wzruszenia. Potrzebujemy przyjąć Jezusa Chrystusa przez wiarę, aktem naszej woli.</p>`
  },
  {
    page: 12,
    html: `
      <p>Koła na tej ilustracji przedstawiają dwie postawy człowieka wobec Boga. Koło przedstawia symbolicznie życie człowieka. Wewnątrz jest tron, który symbolizuje miejsce podejmowania decyzji, czyli wolę człowieka.</p>
      <figure class="diagram wide">{{circles}}</figure>
      <div class="two-col">
        <div>
          <p><strong>Koło lewe:</strong> człowiek (Ja) jest na tronie swojego życia. Chrystus (✝) nie jest zaproszony do życia.</p>
          <p>Różne dziedziny życia są poddane własnemu „ja”, co często prowadzi do niezadowolenia i niezaspokojenia.</p>
        </div>
        <div>
          <p><strong>Koło prawe:</strong> Chrystus (✝) jest na tronie życia. Człowiek (Ja) przekazuje tron swojego życia Chrystusowi.</p>
          <p>Dziedziny życia są pod kierownictwem Chrystusa, co prowadzi do harmonii z Bożym planem.</p>
        </div>
      </div>
      <p class="question">Które z tych kół przedstawia twoje życie? Czy drugie koło przedstawia życie, jakiego pragniesz?</p>
      <p>Dalsze uwagi wyjaśniają, w jaki sposób można przyjąć Jezusa Chrystusa jako osobistego Zbawiciela.</p>`
  },
  {
    page: 13,
    html: `
      <h3 class="sub">Możesz przyjąć Chrystusa teraz przez modlitwę</h3>
      <p class="aside">Modlitwa jest rozmową z Bogiem.</p>
      <p>Bóg zna twoje serce i nie zależy Mu na pięknych i starannie dobranych słowach, lecz na szczerości twojego serca.</p>
      <p>Oto przykład modlitwy:</p>
      <blockquote class="prayer">„Chrystusie, potrzebuję Cię. Uznaję swoją grzeszność. Otwieram Ci drzwi mojego życia i przyjmuję Cię, jako swego Zbawiciela i Pana. Dziękuję Ci, że przebaczyłeś moje grzechy umierając za mnie na krzyżu. Proszę o Twoje kierownictwo w moim życiu. Uczyń mnie takim, jakiego mnie pragniesz.”</blockquote>
      <p>Czy taka modlitwa wyraża pragnienie twojego serca? Jeśli tak, to módl się w tej chwili w taki sposób, a Chrystus – według swojej obietnicy – zamieszka w twoim życiu.</p>`
  },
  {
    page: 14,
    html: `
      <h3 class="sub">Jak możesz upewnić się, że Jezus Chrystus zamieszkał w twoim życiu?</h3>
      <p>Czy prosiłeś Jezusa Chrystusa, aby wszedł do twojego życia? Czy uczyniłeś to szczerze? Jeśli tak, to pamiętając o Jego obietnicy w Apokalipsie Jana 3,20 (<a href="#/four-laws/page-11">str. 11</a>) – gdzie On teraz jest w stosunku do Ciebie?</p>
      <p>Chrystus powiedział, że wejdzie do twojego życia. Czy mógłby cię zawieść? Na czym jednak opierasz swoje przekonanie, że Bóg wysłuchał twoich modlitw?</p>
      <p class="aside">(Podpowiadamy ci: na podstawie wierności i wiarygodności samego Boga i Jego Słowa.)</p>
      <h3 class="sub">Słowo Boże obiecuje życie wieczne tym, którzy przyjęli Jezusa Chrystusa jako osobistego Zbawiciela</h3>
      <blockquote class="verse">„A świadectwo jest takie: że Bóg dał nam życie wieczne, a to życie jest w Jego Synu. Ten, kto ma Syna, ma życie, a kto nie ma Syna, nie ma też i życia. O tym napisałem do was, którzy wierzycie w imię Syna Bożego, abyście wiedzieli, że macie życie wieczne” <cite>(1 Jana 5,11-13)</cite></blockquote>
      <blockquote class="verse">„Nie opuszczę cię ani pozostawię” <cite>(Hebrajczyków 13,5)</cite></blockquote>
      <p>Dziękuj często Bogu za to, że Chrystus wszedł do twojego życia i nigdy cię nie opuści.</p>
      <p class="question">A co z naszymi uczuciami?</p>`
  },
  {
    page: 15,
    html: `
      <h3 class="sub">Nie polegaj na uczuciach</h3>
      <p>Nie nasze uczucia, lecz obietnice Boga zawarte w Piśmie Świętym, są naszym autorytetem i podstawą. Chrześcijanin żyje wiarą (ufnością) w niezmienność Boga i Jego Słowa. Poniższy rysunek pociągu ilustruje stosunek między faktem (tzn. Bogiem i Jego Słowem), wiarą (naszą ufnością do Boga i Jego Słowa), a uczuciami (tzn. różnymi reakcjami emocjonalnymi).</p>
      <figure class="diagram wide">{{train}}</figure>
      <p>Parowóz może jechać bez wagonu. Jednak bezcelowe byłoby usiłowanie ciągnięcia pociągu przez wagon. W podobny sposób my, jako chrześcijanie, nie polegamy na uczuciach czy doznaniach, lecz pokładamy naszą ufność w wierności Boga i obietnicach Jego Słowa – Pisma Świętego.</p>`
  },
  {
    page: 16,
    html: `
      <h3 class="sub">Teraz, gdy przyjąłeś Chrystusa</h3>
      <p>Z chwilą, gdy przyjąłeś Chrystusa przez akt wiary, w twoim życiu zaszło wiele zmian, a przede wszystkim:</p>
      <ol class="changes">
        <li>Jezus Chrystus zamieszkał w twoim życiu (Apokalipsa Jana 3,20 – <a href="#/four-laws/page-11">str. 11</a>).</li>
        <li>Twoje grzechy zostały przebaczone (Kolosan 1,14).</li>
        <li>Stałeś się dzieckiem Boga (Jan 1,12 – <a href="#/four-laws/page-10">str. 10</a>).</li>
        <li>Zaczęła się w twoim życiu przygoda, dla której Bóg Cię stworzył i przeznaczył (Jan 10,10 – <a href="#/four-laws/page-5">str. 5</a>).</li>
      </ol>
      <p class="question">Czy mogłoby zdarzyć się coś wspanialszego w twoim życiu, niż przyjęcie Jezusa Chrystusa jako osobistego Zbawiciela?</p>`
  }
];

/* ---------- 2. The Four ---------- */

const THEFOUR_URL = "https://thefour.com/pl-pl/";

const THEFOUR = [
  {
    title: "Bóg mnie kocha",
    text: "Po pierwsze – musisz wiedzieć, że Bóg szaleje za tobą! Jego miłość jest nieograniczona i bezwarunkowa. Cokolwiek zrobisz, Bóg będzie cię kochał tak samo – ani mniej, ani więcej. Jego największym pragnieniem jest to, byś tę miłość odwzajemnił.",
    verses: [
      { ref: "Psalm 100,5", text: "Albowiem dobry jest Pan, łaskawość Jego trwa na wieki, a wierność Jego przez pokolenia" },
      { ref: "Rzymian 5,8", text: "Bóg zaś okazuje nam swoją miłość [właśnie] przez to, że Chrystus umarł za nas, gdyśmy byli jeszcze grzesznikami." }
    ]
  },
  {
    title: "Jestem oddzielony od Boga",
    text: "Po drugie – jesteśmy oddzieleni od Bożej miłości z powodu tego, co Pismo Święte nazywa grzechem. Grzech to wybór, by żyć dla siebie, a nie dla Boga. Grzeszymy, gdy Go ignorujemy, łamiemy Jego prawa i postępujemy tak, jak sami chcemy. Grzech nie tylko niszczy relację z Bogiem, ale też przyjaźnie i relacje z rodziną. Pismo Święte mówi, że grzech w końcu przynosi śmierć.",
    verses: [
      { ref: "Izajasz 59,2", text: "Lecz wasze winy wykopały przepaść między wami a waszym Bogiem; wasze grzechy zasłoniły Mu oblicze przed wami tak, iż was nie słucha." },
      { ref: "Rzymian 6,23", text: "Albowiem zapłatą za grzech jest śmierć, a łaska przez Boga dana to życie wieczne w Chrystusie Jezusie, Panu naszym." }
    ]
  },
  {
    title: "Jezus umarł za mnie",
    text: "Śmierć Jezusa jest powszechnie znanym faktem, ale ludzie często nie rozumieją jej znaczenia. Biblia mówi, że karą za grzech jest śmierć. Ponieważ każdy człowiek zgrzeszył, każdy zasługuje na śmierć. Jednak Bóg, pełen miłosierdzia, kocha nas tak bardzo, że posłał swojego Syna, aby umarł zamiast nas. Jezus umarł więc po to, abyśmy my mogli żyć wiecznie.",
    verses: [
      { ref: "Jan 3,16", text: "Tak bowiem Bóg umiłował świat, że Syna swego Jednorodzonego dał, aby każdy, kto w Niego wierzy, nie zginął, ale miał życie wieczne." },
      { ref: "1 Jana 4,9-10", text: "W tym objawiła się miłość Boga ku nam, że zesłał Syna swego Jednorodzonego na świat, abyśmy życie mieli dzięki Niemu. W tym przejawia się miłość, że nie my umiłowaliśmy Boga, ale że On sam nas umiłował i posłał Syna swojego jako ofiarę przebłagalną za nasze grzechy." }
    ]
  },
  {
    title: "Czy pójdę za Jezusem?",
    text: "Bóg zrobił, co mógł, aby pokazać ci, jak ważny jesteś dla Niego. Dzięki Jezusowi oferuje ci życie w całej pełni, przez całą wieczność. Punkt czwarty dotyczy jednak twojej decyzji – to ty musisz zdecydować, czy chcesz przyjąć to, co zrobił dla ciebie Jezus. Aby to zrobić, musisz uznać, że jesteś grzesznikiem, poprosić Boga o przebaczenie i postanowić odtąd żyć dla Niego. Wybór należy do ciebie!",
    verses: [
      { ref: "Jan 1,12", text: "Wszystkim tym jednak, którzy Je przyjęli, dało moc, aby się stali dziećmi Bożymi, tym, którzy wierzą w imię Jego" },
      { ref: "Rzymian 10,9", text: "Jeżeli więc ustami swoimi wyznasz, że Jezus jest Panem, i w sercu swoim uwierzysz, że Bóg Go wskrzesił z martwych – osiągniesz zbawienie." }
    ]
  }
];

/* ---------- 3. Teotest ---------- */

const TEOTEST_INTRO = {
  title: "Teotest",
  lead: "Jesteś Teo czy Ateo?",
  sub: "10 minut i 10 pytań, a wieczność, by żyć z odpowiedzią."
};

/* Każde pytanie ma dwie wersje: teo (wierzący) i ateo (niewierzący).
   s1 + s2 + s3 tworzą zdanie; s2 jest wyróżnione kolorem.
   help – krótka podpowiedź dla osoby prowadzącej rozmowę (do edycji). */
const TEOTEST = [
  {
    teo: { s1: "Czy wierzysz w jakiegokolwiek", s2: " Boga", s3: "?",
      help: "Zacznij od ciekawości, nie od argumentów. Odpowiedź wyznacza ścieżkę: „tak” – Teo, „nie” – Ateo. Słuchaj uważnie i nie przerywaj." },
    ateo: { s1: "Czy wierzysz w jakiegokolwiek", s2: " Boga", s3: "?",
      help: "Zacznij od ciekawości, nie od argumentów. Odpowiedź wyznacza ścieżkę: „tak” – Teo, „nie” – Ateo. Słuchaj uważnie i nie przerywaj." }
  },
  {
    teo: { s1: "Jak byś", s2: " Go ", s3: "opisał?",
      help: "Pozwól opisać Boga własnymi słowami. Zwróć uwagę na cechy, które padają: miłość, sprawiedliwość, dystans. Nie poprawiaj od razu." },
    ateo: { s1: "Jakie są główne powody twojej", s2: " niewiary", s3: "?",
      help: "Pytaj z ciekawością. Powody bywają intelektualne, ale równie często to rany lub złe doświadczenia z ludźmi wierzącymi. Wysłuchaj, zanim zaczniesz odpowiadać." }
  },
  {
    teo: { s1: "Czego", s2: " Bóg ", s3: "oczekuje od nas?",
      help: "Odpowiedzi bywają różne: przestrzeganie zasad, dobre uczynki, wiara. To dobry moment na pytanie: „skąd to wiesz?”." },
    ateo: { s1: "Czy istnienie wszechświata ma jakiś", s2: " cel ", s3: "czy znaczenie?",
      help: "Pytanie o sens i cel. Daj czas na zastanowienie – często ujawnia, czego rozmówca naprawdę szuka." }
  },
  {
    teo: { s1: "Jak spełniasz", s2: " te ", s3: "oczekiwania?",
      help: "Pytanie często odsłania, że oczekiwania nie są w pełni spełniane. Bądź łagodny – to początek rozmowy o łasce, nie o osądzie (Rz 3,23)." },
    ateo: { s1: "Jak uzasadniasz istnienie", s2: " praw ", s3: "natury?",
      help: "Zapytaj, skąd jego zdaniem biorą się uporządkowanie i regularność przyrody. Słuchaj; nie musisz wygrać dyskusji." }
  },
  {
    teo: { s1: "Czy wierzysz w istnienie", s2: " nieba", s3: "?",
      help: "Zapytaj, jak wyobraża sobie niebo i od czego jego zdaniem zależy dostęp do niego." },
    ateo: { s1: "Czy istnieje", s2: " zło", s3: "?",
      help: "Rozmowa o złu zwykle prowadzi do pytania o dobro i zło w człowieku – to naturalny most do tematu grzechu." }
  },
  {
    teo: { s1: "Czy wszyscy tam", s2: " idą", s3: "?",
      help: "Przygotuj się na różne poglądy. Spokojnie, bez nacisku, możesz odwołać się do Jana 14,6." },
    ateo: { s1: "Na czym opierasz swoją", s2: " moralność", s3: "?",
      help: "Pozwól na własne odpowiedzi. Możesz zapytać, czy on sam zawsze żyje zgodnie z tym, co uważa za dobre." }
  },
  {
    teo: { s1: "Czy wierzysz, że", s2: " ty ", s3: "pójdziesz do nieba?",
      help: "Wielu ludzi wyraża nadzieję, a nie pewność. Możesz wskazać 1 Jana 5,13 – po to zostało napisane, byśmy wiedzieli." },
    ateo: { s1: "Czy w porównaniu do zwierząt lub roślin życie ludzkie jest", s2: " wyjątkowe", s3: "?",
      help: "Zapytaj, skąd jego zdaniem bierze się godność człowieka (por. Rdz 1,27)." }
  },
  {
    teo: { s1: "Dlaczego", s2: "?", s3: "",
      help: "Dopytaj o uzasadnienie odpowiedzi z poprzedniego pytania. Nie dyskutuj – wysłuchaj." },
    ateo: { s1: "W skali 1–10, jak mocno jesteś przekonany, że Bóg", s2: " nie ", s3: "istnieje?",
      help: "Skala pokazuje, że przekonanie rzadko jest absolutne. Zapytaj, co mogłoby je zmienić." }
  },
  {
    teo: { s1: "Czy jesteś zainteresowany odpowiedziami, jakich", s2: " Biblia ", s3: "udziela na ten temat?",
      help: "Zaproś do wspólnego sprawdzenia, co mówi Biblia. Zaproponuj konkretny fragment, np. Ewangelię Jana." },
    ateo: { s1: "Czy kiedykolwiek sprawdzałeś, jak", s2: " Biblia ", s3: "odpowiada na te pytania?",
      help: "Zaproś do wspólnego sprawdzenia. Możesz podarować lub wskazać Ewangelię Jana jako dobry początek." }
  },
  {
    teo: { s1: "Czy jesteś gotowy(-a) zacząć podążać za", s2: " Jezusem ", s3: "i powierzyć Mu swoje życie?",
      help: "Moment decyzji – nie naciskaj. Jeśli rozmówca jest gotowy, możesz przejść do modlitwy z książeczki „Cztery Prawa” (str. 13)." },
    ateo: { s1: "Czy mogę się o ciebie", s2: " pomodlić", s3: "?",
      help: "Nawet jeśli nie jest gotowy – zapytaj o zgodę na modlitwę. Zostaw kontakt i podziękuj za rozmowę." }
  }
];
